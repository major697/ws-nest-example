import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketModule } from './websocket/websocket.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [WebsocketModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
