import { Module } from '@nestjs/common';
import { MiscModule } from './misc/misc.module';
import { UserModule } from './user/user.module';
import { CreatorModule } from './creator/creator.module';
import { MerchModule } from './merch/merch.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MiscModule, UserModule, CreatorModule, MerchModule, AuthModule],
})
export class AppModule { }
