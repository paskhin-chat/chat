import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { RedisService } from '../redis/redis.service';
import { createModule, resetDatabase } from '../common/test';
import { ConfigService } from '../config/config.service';

import { MessageResolver } from './message.resolver';

describe('Message integration', () => {
  const port = 4_000;
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

    await app.listen(port);
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
