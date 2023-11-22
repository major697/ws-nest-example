import { Module } from '@nestjs/common'
import { WebsocketService } from './websocket.service'
import { UsersModule } from '../users/users.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [UsersModule, AuthModule],
  providers: [WebsocketService],
  exports: [WebsocketService],
})
export class WebsocketModule {}
