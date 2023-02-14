import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) usersRepository) {
    super(usersRepository);
  }

  tranfer(receiverId: number, senderId: number, amount: number) {
    console.log({tranferInfo:"ao ghe"})

    return this.repo.manager.transaction(
      "READ COMMITTED",
      async (transactionalEntityManager) => {
        console.log({tranferInfo:"ao ghe 11"})

        await transactionalEntityManager.queryRunner.startTransaction()
        try {
          console.log({tranferInfo:"ao ghe 1111",receiverId})

          const receiver = await transactionalEntityManager.findOneById(User,receiverId)
          const sender = await transactionalEntityManager.findOneById(User,senderId)
          console.log({receiver})
          if (amount > sender.balance) {
            throw Error("Sender not enough balance")
          }
          await transactionalEntityManager.save(User,{
            id: senderId,
            balance: sender.balance - amount
          })
          await transactionalEntityManager.save(User,{
            id: receiverId,
            balance: receiver.balance + amount
          })
          console.log({tranferInfo:"ao ghe commit"})

          await transactionalEntityManager.queryRunner.commitTransaction()
        }
        catch (err) {
          await transactionalEntityManager.queryRunner.rollbackTransaction()
          return err
        } finally {
          // you need to release query runner which is manually created:
          // await transactionalEntityManager.queryRunner.release()
        }


      })
  }

  topup(amount) {

  }
}
