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

@WebSocketGateway(80, { namespace: 'ws', cors: { origin: '*' } })
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly websocketService: WebsocketService) {}
  @WebSocketServer()
  server: Server

  handleConnection(client) {
    const socketId = client.id
    console.log('Client connected, his socket ID: ', socketId)
    this.server
      .to(socketId)
      .emit(
        'connection-init',
        `Connection to WS is correct. Your socket ID is: ${socketId}`,
      )
  }
  handleDisconnect(client) {
    const socketId = client.id
    console.log('Client disconnect, his socket ID: ', socketId)
    // console.log('handleDisconnect', this.server.sockets)
  }
  afterInit() {
    console.log('afterInit', this.server)
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
    } else {
      this.server.emit('receive-message', text)
    }
  }
}