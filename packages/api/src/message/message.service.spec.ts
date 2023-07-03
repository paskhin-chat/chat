import { createModule, resetDatabase } from '../common/test';
import { RedisService } from '../redis/redis.service';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  let redisService: RedisService;

  beforeEach(async () => {
    const module = await createModule();

    service = module.get<MessageService>(MessageService);
    redisService = module.get(RedisService);
  });

  afterEach(async () => {
    await resetDatabase();
    await redisService.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
