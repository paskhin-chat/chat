import { INestApplication } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { faker } from '@faker-js/faker';
import { isUUID } from 'class-validator';
import { ports } from 'constant';

import { ConfigService } from '../config/config.service';
import { RedisService } from '../redis/redis.service';
import { createModule, gql, requestCreator, resetDatabase } from '../common/test';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomInput, RoomDto } from '../schema';
import { AuthService } from '../auth/auth.service';

describe('Room integration', () => {
  const request = requestCreator();

  let app: INestApplication;

  let redisService: RedisService;
  let prismaService: PrismaService;
  let authService: AuthService;

  beforeEach(async () => {
    const module = await createModule();

    app = module.createNestApplication();

    app.use(cookieParser(module.get<ConfigService>(ConfigService).cookiesSecretToken));

    redisService = module.get(RedisService);
    prismaService = module.get(PrismaService);
    authService = module.get(AuthService);

    await app.listen(ports.test.api);
  });

  afterEach(async () => {
    await resetDatabase();
    await redisService.close();
    await app.close();
  });

  it('should find all rooms', async () => {
    const mainUserLogin = faker.internet.userName();

    const [at, rt] = await authService.register({
      login: mainUserLogin,
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    await Promise.all([
      prismaService.room.create({
        data: {
          members: {
            create: {
              user: {
                connect: { login: mainUserLogin },
              },
            },
          },
        },
      }),
      prismaService.room.create({
        data: {
          members: {
            create: {
              user: {
                connect: { login: mainUserLogin },
              },
            },
          },
        },
      }),
    ]);

    const response = await request<{ rooms: RoomDto[] }>(
      gql`
        query Rooms {
          rooms {
            id
            members {
              user {
                login
              }
            }
          }
        }
      `,
      undefined,
      { at, rt },
    );

    expect(response.data.data.rooms.length).toEqual(2);
    expect(isUUID(response.data.data.rooms[0]?.id)).toEqual(true);
    expect(response.data.data.rooms[0]?.members[0]?.user.login).toEqual(mainUserLogin);
  });

  it('should create a room', async () => {
    const mainUserLogin = faker.internet.userName();

    const [at, rt] = await authService.register({
      login: mainUserLogin,
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    const user = await prismaService.user.findUnique({
      where: {
        login: mainUserLogin,
      },
    });

    const response = await request<{ createRoom: RoomDto }, { input: CreateRoomInput }>(
      gql`
        mutation CreateRoom($input: CreateRoomInput!) {
          createRoom(input: $input) {
            id
            members {
              user {
                login
              }
            }
          }
        }
      `,
      {
        input: {
          userIds: [user?.id || ''],
        },
      },
      { at, rt },
    );

    expect(isUUID(response.data.data.createRoom.id)).toEqual(true);
  });
});
