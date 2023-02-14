import { Body, CacheInterceptor, CacheKey, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateManyDto, Crud, CrudController, CrudRequest, CrudRequestInterceptor, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';

import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guard-strategy/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard-strategy/roles.guard';
import { Roles } from 'decorators/roles.decorator';
import { Request } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { isMainThread, parentPort, Worker, workerData } from 'worker_threads';
import { rejects } from 'assert';
// import { Cache } from 'cache-manager';

//https://github.com/nestjsx/crud/wiki/Requests#search
@Crud({
  model: {
    type: User,
  },
})
@Controller('users')
// @Roles("admin")
// @UseGuards(JwtAuthGuard, RolesGuard,ThrottlerGuard)

// @UseGuards(RolesGuard)
export class UsersController implements CrudController<User> {
  constructor(
    public service: UsersService,
    @InjectQueue('user') private userQueue: Queue
    // @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }
  get base(): CrudController<User> {
    return this;
  }

  @Override()
  @Roles("admin")
  // @CacheTTL(60 * 5)
  // @UseInterceptors(CacheInterceptor)
  async getMany(
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

  @Get("/no-queue/expensive-handle-user")
  @UseInterceptors(CrudRequestInterceptor)
  async expensiveHandleUser(
    @ParsedRequest() req: CrudRequest,
  ) {

    const users = await this.service.getMany(req) as any
    const hanledUser = users.map((user: User) => {
      let stringify
      for (let i = 0; i < 1000000; i++) {
        stringify += JSON.stringify(user.username)
      }
      return {
        stringify: stringify,
        username: user.username
      }
    })
    return {
      hanledUser
    }

    // const users = await this.service.getMany(req) as any
    // // var hanledUser = []
    // const usersBuffer = users
    // const promises = []
    // for (let i = 0; i < users.length; i++) {
    //   promises.push(new Promise((resolve,reject)=>{
    //     const worker = new Worker("./src/users/users.worker.ts");
    //     worker.postMessage({ workerData: { usersBuffer, index: i }})
    //     worker.once('message', (message) => {
    //       // console.log(message);  // Prints 'Hello, world!'.
    //       resolve(message)
    //     });
    //     worker.once("error",(err)=>{
    //       console.log(err);  // Prints 'Hello, world!'.
    //       reject(err)
    //     })
    //   }))
    // }
    // // console.log({promises})
    // const hanledUser = await Promise.all(promises)
    // return {
    //   hanledUser
    // }

  }

  @Get("/queue/expensive-handle-user")
  @UseInterceptors(CrudRequestInterceptor)
  async handleExpensiveHandleUserwithQueue(
    @ParsedRequest() req: CrudRequest,
  ) {
    const users = await this.service.getMany(req) as any
    const job = await this.userQueue.add({
      users: users,
    }, {
      // delay:3000,
      jobId: "user-key"
    });
    return {
      job: job
    }
  }

  @Get("/queue/expensive-handle-user/get-result")
  @UseInterceptors(CrudRequestInterceptor)
  async expensiveHandleUserwithQueueResult(
    @ParsedRequest() req: CrudRequest,
  ) {
    const result = await this.userQueue.getJob("user-key")
    return {
      result: result
    }
  }

  @Post("/transfer")
  @UseInterceptors(CrudRequestInterceptor)
  async tranfer(
    @ParsedRequest() req: CrudRequest,
    @Body() tranferInfo: {senderId:number,receiverId:number,amount:number}
  ) {
    console.log({tranferInfo:tranferInfo})
    return this.service.tranfer(tranferInfo.receiverId,tranferInfo.senderId,tranferInfo.amount)
  }


  @Post("/topup")
  async topup() {

  }





}
