import { Injectable } from '@nestjs/common'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { WebsocketGateway } from '../websocket/websocket.gateway'

@Injectable()
export class NotificationService {
  constructor(private readonly websocketGateway: WebsocketGateway) {}

  create(createNotificationDto: CreateNotificationDto) {
    this.websocketGateway.sendNotification(createNotificationDto)
    return { message: 'Sent notification by WS' }
  }
}
