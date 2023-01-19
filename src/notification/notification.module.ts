import { Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { NotificationController } from './notification.controller'
import { WebsocketModule } from '../websocket/websocket.module'

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [WebsocketModule],
})
export class NotificationModule {}
