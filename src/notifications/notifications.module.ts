import { Module } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { NotificationsController } from './notifications.controller'
import { WebsocketModule } from '../websocket/websocket.module'

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [WebsocketModule],
})
export class NotificationsModule {}
