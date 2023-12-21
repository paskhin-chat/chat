import { faker } from '@faker-js/faker';
import { isDate, isUUID } from 'class-validator';
import { UniqueEnforcer } from 'enforce-unique';

import { createModule, resetDatabase } from '../common/test';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';

import { RoomService } from './room.service';

const uniqueEnforcer = new UniqueEnforcer();

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
            login: uniqueEnforcer.enforce(faker.internet.userName),
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

    const viewerId = users.splice(0, 1)[0]?.id;

    const room = await service.create({ userIds: users.map(user => user.id) }, viewerId || '');

    expect(isUUID(room.id)).toEqual(true);
    expect(isDate(room.creationDate)).toEqual(true);
  });

  it('should create a room even if there is a room with fewer users than in creating a new room', async () => {
    const users = await Promise.all(
      Array.from({ length: 3 }).map(() =>
        prismaService.user.create({
          data: {
            login: uniqueEnforcer.enforce(faker.internet.userName),
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

    const viewerId = users.splice(0, 1)[0]!.id;

    const viewerPersonalRoom = await service.create({ userIds: [viewerId] }, viewerId);

    const createdRoom = await service.create({ userIds: users.map(user => user.id) }, viewerId);

    expect(isUUID(viewerPersonalRoom.id)).toEqual(true);
    expect(isUUID(createdRoom.id)).toEqual(true);

    /**
     * If the ids match, the code works wrong - not create a new room, and instead returns the room with narrowed user
     * ids.
     */
    expect(viewerPersonalRoom.id).not.toEqual(createdRoom.id);
  });
});
