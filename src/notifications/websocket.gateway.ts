import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets'
import { WebsocketService } from './websocket.service'
import { MessageDto } from './dto/message.dto'
import { Socket, Server } from 'socket.io'
import { CreateNotificationsDto } from './dto/create-notifications.dto'
import { NotificationsClientWebsocketInterface } from './interfaces/notifications.interface'
import { Logger } from '@nestjs/common'

@WebSocketGateway(80, { namespace: 'ws', cors: { origin: '*' } })
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly websocketService: WebsocketService) {}
  private readonly logger = new Logger(WebsocketGateway.name)

  @WebSocketServer()
  server: Server

  handleConnection(client: NotificationsClientWebsocketInterface) {
    const socketId = client.id
    this.logger.log(`Client connected, his socket ID: ${socketId}`)
    this.server
      .to(socketId)
      .emit(
        'connection-init',
        `Connection to WS is correct. Your socket ID is: ${socketId}`,
      )
  }
  handleDisconnect(client: NotificationsClientWebsocketInterface) {
    const socketId = client.id
    this.logger.log(`Client disconnect, his socket ID: ${socketId}`)
    // this.logger.log('handleDisconnect', this.server.sockets)
  }
  afterInit() {
    this.logger.log(`after init: ${this.server}`)
  }

  @SubscribeMessage('send-message')
  sendMessage(
    @MessageBody() message: MessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    this.server.to(socket.id).emit('receive-message', message)
  }

  @SubscribeMessage('send-notification')
  sendNotification(createNotificationDto: CreateNotificationsDto) {
    const notification = this.websocketService.sendNotification(
      createNotificationDto,
    )

    const { socketIds, text } = createNotificationDto

    if (socketIds) {
      this.server.to(socketIds).emit('receive-message', text)
      this.logger.log(`Sent message to users with socket ID: ${socketIds}`)
    } else {
      this.server.emit('receive-message', text)
      this.logger.log('Sent message to all users')
    }
  }
}
