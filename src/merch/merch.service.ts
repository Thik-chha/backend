import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class MerchService {
  constructor(private readonly prismaService: PrismaService) { }

  findByUser(username: string) {
    return this.prismaService.merch.findMany({
      where: { creator: { username } },
    });
  }

  findOne(id: string) {
    return this.prismaService.merch.findUnique({ where: { id } });
  }
}
