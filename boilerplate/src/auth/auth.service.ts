import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }
  

  async validateUser(user: CreateAuthDto): Promise<any> {
    const findedUser = await this.usersService.findOne({ where: { username: user.username } });
    const isMatch = await bcrypt.compare(user.password, findedUser.password);
    if (findedUser && isMatch) {
      const { password, ...result } = findedUser;
      return result;
    }
    return null;
  }

  async login(user: CreateAuthDto) {
    const validatedUser = await this.validateUser(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      access_token: this.jwtService.sign(validatedUser),
    };
  }

  async register(user: CreateAuthDto) {
    console.log({salt:process.env.BSCRYPT_SALT_OR_ROUNDS})

    const hashedPassword = await bcrypt.hash(user.password, parseInt(process.env.BSCRYPT_SALT_OR_ROUNDS));
    const payload = {
      username: user.username,
      password: hashedPassword
    };
    const createdUser = await this.usersService.createOne(null, payload)
    return {
      access_token: this.jwtService.sign(payload),
      user: createdUser
    };
  }

}