import { Injectable } from '@nestjs/common'
import { CreateNotificationsDto } from '../notifications/dto/create-notifications.dto'

@Injectable()
export class WebsocketService {
  sendNotification(createNotificationDto: CreateNotificationsDto) {
    return createNotificationDto
  }
}
