import { CacheInterceptor, CacheKey, CacheTTL, CACHE_MANAGER, Controller, Inject, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateManyDto, Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';

import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard-strategy/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard-strategy/roles.guard';
import { Roles } from 'decorators/roles.decorator';
import { Request } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';
// import { Cache } from 'cache-manager';

//https://github.com/nestjsx/crud/wiki/Requests#search
@Crud({
  model: {
    type: User,
  },
})
@Controller('users')
// @Roles("admin")
@UseGuards(JwtAuthGuard, RolesGuard,ThrottlerGuard)

// @UseGuards(RolesGuard)
export class UsersController implements CrudController<User> {
  constructor(
    public service: UsersService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }
  get base(): CrudController<User> {
    return this;
  }

  @Override()
  @Roles("admin")
  // @CacheTTL(60 * 5)
  @UseInterceptors(CacheInterceptor)
  async getMany(
    @Req() expressReq : Request,
    @ParsedRequest() req: CrudRequest,
  ) {
    return this.base.getManyBase(req);
  }

  @Override('getOneBase')
  getOneAndDoStuff(
    @ParsedRequest() req: CrudRequest,
  ) {
    return this.base.getOneBase(req);
  }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: User,
  ) {
    return this.base.createOneBase(req, dto);
  }

  @Override()
  createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<User>
  ) {
    return this.base.createManyBase(req, dto);
  }

  @Override('updateOneBase')
  coolFunction(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: User,
  ) {
    return this.base.updateOneBase(req, dto);
  }

  @Override('replaceOneBase')
  awesomePUT(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: User,
  ) {
    return this.base.replaceOneBase(req, dto);
  }

  @Override()
  async deleteOne(
    @ParsedRequest() req: CrudRequest,
  ) {
    return this.base.deleteOneBase(req);
  }

}
