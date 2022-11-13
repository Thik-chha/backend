import { Controller, Get, Param } from '@nestjs/common';
import { CreatorService } from './creator.service';

@Controller('creator')
export class CreatorController {
  constructor(private readonly creatorService: CreatorService) { }

  @Get()
  findAll() {
    return this.creatorService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.creatorService.findOne(username);
  }

  @Get(':username/sales')
  findCreatorSales(@Param('username') username: string) {
    return this.creatorService.findCreatorSales(username)
  }
}
