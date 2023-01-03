import { Injectable, UnauthorizedException ,BadRequestException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CrudRequest } from '@nestjsx/crud';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }
  

  async validateUser(user: CreateAuthDto): Promise<any> {
    const findedUser = await this.usersService.findOne({ where: { username: user.username } });
    if (!findedUser) {
      throw new UnauthorizedException('Something bad happened', { cause: new Error(), description: 'username or password is wrong' });
    }

    const isMatch = await bcrypt.compare(user.password, findedUser.password);
    if(!isMatch){
      throw new UnauthorizedException('Something bad happened', { cause: new Error(), description: 'username or password is wrong' })
    }
    const { password, ...result } = findedUser;
    return result;
  }

  async login(user: CreateAuthDto) {
    const validatedUser = await this.validateUser(user);
  
    return {
      access_token: this.jwtService.sign(validatedUser),
    };
  }


  async register(req:CrudRequest,user: CreateAuthDto) {
    const findedUser = await this.usersService.findOne({ where: { username: user.username } });
    if(findedUser){
      throw new UnauthorizedException('Something bad happened', { cause: new Error(), description: 'username is existed' });
    }

    const hashedPassword = await bcrypt.hash(user.password, parseInt(process.env.BSCRYPT_SALT_OR_ROUNDS));
    const payload = {
      username: user.username,
      password: hashedPassword
    };
    const createdUser = await this.usersService.createOne(req,payload)
    if(!createdUser){
      throw new UnauthorizedException('Something bad happened', { cause: new Error(), description: 'register failed' });
    }
    return {
      createdUser
    };
  }

}