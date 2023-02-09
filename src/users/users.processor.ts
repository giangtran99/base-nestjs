import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { User } from './entities/user.entity';

@Processor('user')
export class UserProcessor {
    @Process({
        concurrency:100,
    })
    async handleExpensiveHandleUserwithQueue(job: Job<unknown>) {
        const {users}  = job.data as any
        console.log({"inqueue":users})
        const hanledUser = users.map((user: User) => {
            let stringify
            for (let i = 0; i < 100000; i++) {
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
    }
}