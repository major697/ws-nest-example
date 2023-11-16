import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { CreateNotificationsDto } from './dto/create-notifications.dto'
import { AuthGuard } from '../auth/auth.guard'

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationsDto: CreateNotificationsDto) {
    return this.notificationsService.create(createNotificationsDto)
  }
}
