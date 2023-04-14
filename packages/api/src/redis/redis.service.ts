import { Injectable } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { ConfigService } from '../config/config.service';

@Injectable()
export class RedisService extends RedisPubSub {
  public constructor(private readonly configService: ConfigService) {
    super({
      connection: {
        host: configService.redisHost,
        port: configService.redisPort,
      },
    });
  }
}
