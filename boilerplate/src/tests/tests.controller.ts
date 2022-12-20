import { Controller } from '@nestjs/common';
import { TestsService } from './tests.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Crud, CrudController } from '@nestjsx/crud';

import { Test } from './entities/test.entity';

@Crud({
  model: {
    type: Test,
  },
})
@Controller('tests')
export class TestsController implements CrudController<Test> {
  constructor(public service: TestsService) {}
}
