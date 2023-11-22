import { Module } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { NotificationsController } from './notifications.controller'
import { WebsocketModule } from '../websocket/websocket.module'
import { AuthModule } from '../auth/auth.module'
import { NotificationsWebsocket } from './notifications.websocket'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [WebsocketModule, AuthModule, UsersModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsWebsocket],
})
export class NotificationsModule {}
