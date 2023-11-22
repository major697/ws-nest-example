import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { AuthGuard } from '../auth/auth.guard'
import { CreateNotificationInterface } from './interfaces/notifications.interface'

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationsDto: CreateNotificationInterface) {
    return this.notificationsService.create(createNotificationsDto)
  }
}
