import { IncomingHttpHeaders } from 'http'

export interface HeadersWebsocketInterface extends IncomingHttpHeaders {
  token?: string
  context_id?: string
}
