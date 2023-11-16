import { Prisma } from '@prisma/client'

export class CreateUserDto implements Prisma.usersCreateInput {
  context_id: string
  email: string
  socket_id: string
}
