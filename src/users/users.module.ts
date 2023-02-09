import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from 'nest.config';
import { BullModule } from '@nestjs/bull';
import { UserProcessor } from './users.processor';

@Module({
  imports: [
  TypeOrmModule.forFeature([User]),
  // Config.cache.store[Config.cache.currentStore],
  BullModule.registerQueue({
    name: 'user',
  })
],
  controllers: [UsersController],
  providers: [UsersService,UserProcessor],
  exports: [UsersService],
})
export class UsersModule {}
