import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { JwtTokenInterface } from './interfaces/auth.interface'

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
      return !!jwtToken
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
