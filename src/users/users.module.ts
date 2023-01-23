import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Config from 'nest.config';

@Module({
  imports: [
  TypeOrmModule.forFeature([User]),
  Config.cache.store[Config.cache.currentStore],
],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
