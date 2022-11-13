import { Controller, Get, Param } from '@nestjs/common';
import { MerchService } from './merch.service';

@Controller('merch')
export class MerchController {
  constructor(private readonly merchService: MerchService) { }

  @Get(':username')
  findByUser(@Param('username') username: string) {
    return this.merchService.findByUser(username);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchService.findOne(id);
  }
}
