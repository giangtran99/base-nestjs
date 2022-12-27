import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/register")
  register(@Body() createAuthDto: CreateAuthDto) {
    console.log({createAuthDto})
    const payload = {
      username: createAuthDto.username,
      password: createAuthDto.password
    }
    return this.authService.register(payload)
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
