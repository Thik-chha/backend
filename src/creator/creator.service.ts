import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/misc/prisma.service';

@Injectable()
export class CreatorService {
  constructor(private readonly prismaService: PrismaService) { }

  findAll() {
    return this.prismaService.creator.findMany();
  }

  findOne(username: string) {
    return this.prismaService.creator.findUnique({ where: { username } });
  }

  findCreatorSales(username: string) {
    return this.prismaService.sale.findMany({
      where: { merch: { creator: { username } } },
      include: { merch: true },
    });
  }
}
