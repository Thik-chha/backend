import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findOne(username: string) {
    return this.prismaService.user.findUnique({ where: { username } });
  }
}
