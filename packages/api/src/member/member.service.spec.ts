import { faker } from '@faker-js/faker';

import { PrismaService } from '../prisma/prisma.service';
import { createModule, resetDatabase } from '../common/test';
import { RedisService } from '../redis/redis.service';

import { MemberService } from './member.service';

describe('MemberService', () => {
  let service: MemberService;

  let prismaService: PrismaService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module = await createModule();

    service = module.get(MemberService);
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

  it('should find a members by its room id', async () => {
    const roomId = faker.string.uuid();
    const memberId = faker.string.uuid();

    await prismaService.room.create({
      data: {
        id: roomId,
        creationDate: faker.date.past(),
        members: {
          create: {
            id: memberId,
            joinDate: faker.date.past(),
            user: {
              create: {
                login: faker.internet.userName(),
                password: faker.internet.password(),
                email: faker.internet.email(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                dob: faker.date.birthdate(),
                registrationDate: faker.date.past(),
              },
            },
          },
        },
      },
    });

    const member = await service.findByRoomId(roomId);

    expect(member?.[0]?.id).toEqual(memberId);
  });
});
