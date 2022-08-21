import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/databases/entity/account.entity';
import { User } from 'src/databases/entity/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
