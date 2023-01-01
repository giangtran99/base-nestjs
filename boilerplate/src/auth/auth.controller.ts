import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {
  Crud,
  CrudController,
  Override,
  CrudRequest,
  ParsedRequest,
  ParsedBody,
  CreateManyDto,
  GetManyDefaultResponse,
  CrudRequestInterceptor,
  CrudService,
} from '@nestjsx/crud';
import { UseInterceptors } from '@nestjs/common';


@Crud({
  model: {
    type: User,
  }
})
@Controller('auth')
export class AuthController implements CrudController<User>{
  constructor(public authService: AuthService) { }
  service: CrudService<User>;


  @Post("/register")
  @UseInterceptors(CrudRequestInterceptor)
  register( @ParsedRequest() req: CrudRequest, @Body() createAuthDto: CreateAuthDto) {
    console.log({createAuthDto,req})
    const payload = {
      username: createAuthDto.username,
      password: createAuthDto.password
    }
    return this.authService.register(req,payload)
  }

  @Post("/login")
  login(@Body() createAuthDto: CreateAuthDto) {
    const payload = {
      username: createAuthDto.username,
      password: createAuthDto.password
    }
    return this.authService.login(payload);
  }


}
