import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard-strategy/jwt-auth.guard';

@Crud({
  model: {
    type: User,
  },
})
@Controller('users')
@UseGuards(JwtAuthGuard)

export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}
