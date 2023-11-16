import { Module } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { NotificationsController } from './notifications.controller'
import { WebsocketModule } from './websocket.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [WebsocketModule, AuthModule],
})
export class NotificationsModule {}
