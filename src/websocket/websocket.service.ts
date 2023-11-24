import { Injectable, Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import { HeadersWebsocketInterface } from './interfaces/websocket.interface'
import { WsException } from '@nestjs/websockets'
import { UsersService } from '../users/users.service'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class WebsocketService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  private readonly logger = new Logger(WebsocketService.name)
  private readonly connectedClients: Map<string, Socket> = new Map()

  async handleConnection(socket: Socket) {
    try {
      const clientId = socket.id
      const headers: HeadersWebsocketInterface = socket.handshake.headers

      //TODO sprawdz czy headers.context_id jest potzrebny przy auth: if (!headers.token || !headers.context_id)
      if (!headers.token) {
        return new WsException(
          'Empty credentials for websocket connection token or context_id',
        )
      }

      const verifiedUserEmail = await this.authService.verifyAccessToken(
        headers.token,
      )

      if (verifiedUserEmail) {
        this.connectedClients.set(clientId, socket)
        await this.usersService.createOrUpdate({
          email: verifiedUserEmail,
          client_id: clientId,
        })

        this.logger.log(`Client connected, his socket ID: ${clientId}`)
      } else {
        this.logger.error(`Error connection, user is not valid: ${clientId}`)
        await this.handleDisconnect(socket)
      }
    } catch (e) {
      this.logger.error(`Error in handle connection to WS: ${e}}`)
      await this.handleDisconnect(socket)
      throw new Error(e)
    }
  }

  async handleDisconnect(socket: Socket) {
    const clientId = socket.id
    try {
      this.connectedClients.delete(clientId)
      socket.disconnect()
      await this.usersService.remove(clientId)
      this.logger.log(`Client disconnect, his socket ID: ${clientId}`)
    } catch (e) {
      this.logger.error(`Can't disconnect user: ${clientId}}`)
      throw new Error(e)
    }
  }

  afterInit(server: Server) {
    this.logger.log(`After init: ${server}`)
  }
}
