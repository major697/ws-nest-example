export interface JwtTokenInterface {
  exp: number
  iat: number
  auth_time: number
  jti: string
  iss: string
  sub: string
  typ: string
  azp: string
  nonce: string
  session_state: string
  'allowed-origins': string[]
  scope: string
  sid: string
  email_verified: boolean
  name: string
  preferred_username: string
  given_name: string
  family_name: string
  email: string
}
