import { SOCKET_ID_TYPE } from '../services/enums/notifications.enum'

export class CreateNotificationsDto {
  message: string
  socketIds: SOCKET_ID_TYPE | string[]
}
