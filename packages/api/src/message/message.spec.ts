import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ports } from 'constant';

import { RedisService } from '../redis/redis.service';
import { createModule, resetDatabase } from '../common/test';
import { ConfigService } from '../config/config.service';

import { MessageResolver } from './message.resolver';

describe('Message integration', () => {
  let resolver: MessageResolver;

  let app: INestApplication;

  let redisService: RedisService;

  beforeEach(async () => {
    const module = await createModule();

    resolver = module.get<MessageResolver>(MessageResolver);

    app = module.createNestApplication();

    app.use(
      cookieParser(module.get<ConfigService>(ConfigService).cookiesSecretToken),
    );

    redisService = module.get(RedisService);

    await app.listen(ports.test.api);
  });

  afterEach(async () => {
    await resetDatabase();
    await redisService.close();
    await app.close();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
