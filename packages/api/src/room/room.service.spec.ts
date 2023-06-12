import { faker } from '@faker-js/faker';

import { createModule, resetDatabase } from '../common/test';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';

import { RoomService } from './room.service';

describe('RoomService', () => {
  let service: RoomService;

  let redisService: RedisService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await createModule();

    service = module.get(RoomService);
    prismaService = module.get(PrismaService);
    redisService = module.get(RedisService);
  });

  afterEach(async () => {
    await resetDatabase();
    await redisService.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a room', async () => {
    const users = await Promise.all(
      Array.from({ length: 3 }).map(() =>
        prismaService.user.create({
          data: {
            login: faker.internet.userName(),
            password: faker.internet.password(),
            email: faker.internet.email(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            dob: faker.date.birthdate(),
            registrationDate: faker.date.past(),
          },
        }),
      ),
    );

    const authorizedUserId = users.splice(0, 1)[0]?.id;

    await service.create(
      { userIds: users.map((user) => user.id) },
      authorizedUserId || '',
    );
  });
});
