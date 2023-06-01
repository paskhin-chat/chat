import { Test, TestingModule } from '@nestjs/testing';

import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { RedisModule } from '../redis/redis.module';
import { ConfigModule } from '../config/config.module';

import { RoomService } from './room.service';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, UserModule, RedisModule, ConfigModule],
      providers: [RoomService],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
