import { Controller, Post, Body } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { CreateNotificationsDto } from './dto/create-notifications.dto'

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationsDto: CreateNotificationsDto) {
    return this.notificationsService.create(createNotificationsDto)
  }
}
