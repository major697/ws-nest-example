import { Prisma } from '@prisma/client'

export class CreateUserDto implements Prisma.usersCreateInput {
  email: string
  client_id: string
}
