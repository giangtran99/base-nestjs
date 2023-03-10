import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
