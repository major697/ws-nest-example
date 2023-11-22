import { Injectable, Logger } from '@nestjs/common'
import { CreateNotificationInterface } from './interfaces/notifications.interface'
import { NotificationsWebsocket } from './notifications.websocket'
import { UsersService } from '../users/users.service'

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsWebsocket: NotificationsWebsocket,
    private readonly usersService: UsersService,
  ) {}
  private readonly logger = new Logger(NotificationsService.name)

  async create(createNotificationDto: CreateNotificationInterface) {
    const { message, users } = createNotificationDto
    try {
      const emails = users.map(user => user.email)
      const usersSaved = await this.usersService.findAll(emails)

      if (usersSaved.length) {
        const usersList = usersSaved.map(user => {
          return {
            client_id: user.client_id,
            context_id: users.find(u => u.email === user.email).context_id,
          }
        })

        this.notificationsWebsocket.sendNotification({
          message,
          users: usersList,
        })
        return { message: 'Sent notification' }
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}
