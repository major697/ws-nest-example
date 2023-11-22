import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets'
import { WebsocketService } from './websocket.service'
import { Socket, Server } from 'socket.io'
import { Logger, UnauthorizedException } from '@nestjs/common'

@WebSocketGateway(80, {
  namespace: 'ws',
  cors: { origin: '*' },
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly websocketService: WebsocketService) {}
  protected readonly logger = new Logger(WebsocketGateway.name)

  @WebSocketServer()
  server: Server

  async handleConnection(socket: Socket) {
    try {
      await this.websocketService.handleConnection(socket)
    } catch (e) {
      this.logger.error(`Error in handle connection to WS: ${e}}`)
      this.handleDisconnect(socket)
      return new WsException(new UnauthorizedException())
    }
  }
  handleDisconnect(socket: Socket) {
    this.websocketService.handleDisconnect(socket)
  }
  afterInit() {
    this.websocketService.afterInit(this.server)
  }

  // @UseGuards(AuthGuard)
  // @SubscribeMessage('send-notification')
  // sendNotification(createNotificationDto: SendNotificationWebsocketInterface) {
  //   const { socketIds, message } = createNotificationDto
  //   console.log(socketIds.length)
  //
  //   if (socketIds === SOCKET_ID_TYPE.ALL) {
  //     this.server.emit('receive-message', message)
  //     this.logger.log('Sent message to all users')
  //   } else {
  //     this.server.to(socketIds).emit('receive-message', message)
  //     this.logger.log(`Sent message to users with socket ID: ${socketIds}`)
  //   }
  // }
}
