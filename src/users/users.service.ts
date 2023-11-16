import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(UsersService.name)

  async create(createUserDto: CreateUserDto) {
    try {
      await this.prisma.users.create({ data: createUserDto })
      return 'User created successfully'
    } catch (e) {
      this.logger.error(`Can't add new user: ${e.message}`)
      throw new BadRequestException(e)
    }
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
