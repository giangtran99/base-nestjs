import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import type { ClientOpts } from 'redis';
import { CACHE_STORE } from 'src/enums/enum';



const Config = {
    cache:{
        currentStore:CACHE_STORE.REDIS,
        store:{
            [CACHE_STORE.REDIS]:CacheModule.register<ClientOpts>({
                store: redisStore,
          
                // Store-specific configuration:
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_CACHE,
              }),
            [CACHE_STORE.LOCAL_MEMORY]:CacheModule.register()
        },
    },
    jwt:{
        jwtSecrect: process.env.JWT_SECRET,
        refreshTokenExpire: "7d",
        accessTokenExpire : "1d"
    }
}

export default Config