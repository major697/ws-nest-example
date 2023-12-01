import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { SubscribeMessage } from '@nestjs/websockets'
import { SendNotificationWebsocketInterface } from './interfaces/notifications.interface'
import { SOCKET_ID_TYPE } from './services/enums/notifications.enum'
import { WebsocketGateway } from '../websocket/websocket.gateway'
import { EMIT_ENUM } from '../services/enums/emit.enum'
import { SUBSCRIPTION_ENUM } from '../services/enums/subscription.enum'

export class NotificationsWebsocket extends WebsocketGateway {
  @UseGuards(AuthGuard)
  @SubscribeMessage(SUBSCRIPTION_ENUM.SEND_NOTIFICATION)
  sendNotification(createNotificationDto: SendNotificationWebsocketInterface) {
    const { users, message } = createNotificationDto

    if (users === SOCKET_ID_TYPE.ALL) {
      // TODO sprawdz odpowiedz od clienta w czasie: await this.server.timeout(2000).emitWithAck(...)
      this.server.emit(EMIT_ENUM.GET_NOTIFICATION, message)
      this.logger.log('Sent message to all users')
    } else {
      for (const user of users) {
        this.server.to(user.client_id).emit(EMIT_ENUM.GET_NOTIFICATION, {
          message,
          context_id: user.context_id,
        })
      }

      this.logger.log(
        `Sent message: ${message} to users: ${JSON.stringify(users)}`,
      )
    }
  }
}
