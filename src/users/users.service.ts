import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { users } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(UsersService.name)

  async findOne(email: string) {
    try {
      return await this.prisma.users.findUnique({
        where: { email },
      })
    } catch (e) {
      this.logger.error(`Can't find user with email: ${email}`)
      throw new BadRequestException(e)
    }
  }

  async findAll(emails: string[]) {
    try {
      return await this.prisma.users.findMany({
        where: {
          email: { in: emails },
        },
      })
    } catch (e) {
      this.logger.error(`Can't find users with email: ${emails}`)
      throw new BadRequestException(e)
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { email, client_id } = createUserDto
    try {
      const user: users = await this.findOne(email)

      if (user) {
        await this.update(createUserDto)
      } else {
        await this.prisma.users.create({
          data: {
            email,
            client_id,
          },
        })
      }
      return 'User created successfully'
    } catch (e) {
      this.logger.error(`Can't add new user: ${e.message}`)
      throw new BadRequestException(e)
    }
  }

  async update(createUserDto: CreateUserDto) {
    const { client_id, email } = createUserDto
    try {
      await this.prisma.users.update({
        where: { email },
        data: {
          client_id,
        },
      })
    } catch (e) {
      this.logger.error(`Can't update users with email: ${email}`)
      throw new BadRequestException(e)
    }
  }

  remove(id: number) {
    //TODO usuwaj uzytkownika jesli zrobi disconnect z WS
    return `This action removes a #${id} user`
  }
}
