import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { Prisma, users } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(UsersService.name)

  async findOne(email: string, findBy: keyof Prisma.usersCreateInput) {
    try {
      return await this.prisma.users.findFirst({
        where: { [findBy]: email },
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

  async createOrUpdate(createUserDto: CreateUserDto) {
    try {
      const user: users = await this.findOne(createUserDto.email, 'email')

      if (user) {
        await this.update(createUserDto)
        return 'User update successfully'
      } else {
        await this.create(createUserDto)
        return 'User created successfully'
      }
    } catch (e) {
      this.logger.error(`Can't add new user: ${e.message}`)
      throw new BadRequestException(e)
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      await this.prisma.users.create({
        data: createUserDto,
      })
    } catch (e) {
      this.logger.error(`Can't create new user: ${e.message}`)
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

  async remove(clientId: string) {
    try {
      const user: users = await this.findOne(clientId, 'client_id')

      if (user) {
        await this.prisma.users.delete({
          where: {
            email: user.email,
          },
        })
      }
    } catch (e) {
      this.logger.error(`Can't remove users with clientId: ${clientId}`)
      throw new BadRequestException(e)
    }
  }
}
