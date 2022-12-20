import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Test } from './entities/test.entity';

@Injectable()
export class TestsService extends TypeOrmCrudService<Test> {
  constructor(@InjectRepository(Test) repo) {
    super(repo);
  }
}
