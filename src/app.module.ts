import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { WebsocketModule } from './notifications/websocket.module'
import { NotificationsModule } from './notifications/notifications.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [WebsocketModule, NotificationsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
