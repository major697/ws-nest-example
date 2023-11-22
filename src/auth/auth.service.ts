import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { JwtTokenInterface } from './interfaces/auth.interface'
import { HeadersWebsocketInterface } from '../websocket/interfaces/websocket.interface'
import { Socket } from 'socket.io'
import { WsException } from '@nestjs/websockets'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async verifyAccessToken(token: string) {
    try {
      const PUBLIC_KEY = this.configService.get<string>('PUBLIC_KEY')
      const jwtToken: JwtTokenInterface = await this.jwtService.verifyAsync(
        token,
        {
          algorithms: ['RS256'],
          publicKey: PUBLIC_KEY,
        },
      )
      if (!jwtToken) new UnauthorizedException()
      return jwtToken.email
    } catch (e) {
      throw new Error(e)
    }
  }

  async authMiddleware(socket: Socket, next: (err?: Error) => void) {
    // since you are sending the token with the query
    const headers: HeadersWebsocketInterface = socket.handshake.headers
    if (!headers?.token) {
      throw new WsException(new WsException('Missing token'))
    }

    try {
      const decoded = await this.verifyAccessToken(headers.token)
      if (decoded) {
        next()
      } else {
        return new WsException(
          new WsException('Authentication token not valid'),
        )
      }

      // socket.user = decoded
    } catch (err) {
      return next(new WsException('Authentication token not valid'))
    }
  }
}
