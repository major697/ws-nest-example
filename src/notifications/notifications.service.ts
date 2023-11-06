import { Injectable } from '@nestjs/common'
import { CreateNotificationsDto } from './dto/create-notifications.dto'
import { WebsocketGateway } from './websocket.gateway'

@Injectable()
export class NotificationsService {
  constructor(private readonly websocketGateway: WebsocketGateway) {}

  create(createNotificationDto: CreateNotificationsDto) {
    this.websocketGateway.sendNotification(createNotificationDto)
    return { message: 'Sent notification by WS' }
  }
}
