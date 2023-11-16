import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [JwtModule],
  providers: [AuthService, ConfigService], //TODO sprawdz ConfigService
  exports: [AuthService],
})
export class AuthModule {}
