import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { WebsocketModule } from './websocket/websocket.module'
import { NotificationsModule } from './notifications/notifications.module'

@Module({
  imports: [WebsocketModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
