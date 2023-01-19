import { Injectable } from '@nestjs/common'
import { CreateNotificationDto } from '../notification/dto/create-notification.dto'

@Injectable()
export class WebsocketService {
  sendNotification(createNotificationDto: CreateNotificationDto) {
    return createNotificationDto
  }
}
