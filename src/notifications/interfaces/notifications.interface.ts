import { SOCKET_ID_TYPE } from '../services/enums/notifications.enum'

export interface UserNotificationInterface {
  client_id: string
  context_id: string
}

export interface CreateNotificationInterface {
  message: string
  users: {
    email: string
    context_id: string
  }[]
}

export interface SendNotificationWebsocketInterface {
  message: string
  users: UserNotificationInterface[] | SOCKET_ID_TYPE.ALL
}
