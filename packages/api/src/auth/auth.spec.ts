import { INestApplication } from '@nestjs/common';
import { isJWT } from 'class-validator';
import cookieParser from 'cookie-parser';
import setCookieParser from 'set-cookie-parser';
import { faker } from '@faker-js/faker';

import { ConfigService } from '../config/config.service';
import { RedisService } from '../redis/redis.service';
import {
  createModule,
  gql,
  requestCreator,
  resetDatabase,
} from '../common/test';
import { LoginInput, RegisterInput, UserDto } from '../schema/schema';

import { AuthService } from './auth.service';

describe('Auth integration', () => {
  const port = 4_000;
  const request = requestCreator(`http://localhost:${port}`);

  let app: INestApplication;

  let authService: AuthService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module = await createModule();

    app = module.createNestApplication();

    app.use(
      cookieParser(module.get<ConfigService>(ConfigService).cookiesSecretToken),
    );

    redisService = module.get(RedisService);
    authService = module.get(AuthService);

    await app.listen(port);
  });

  afterEach(async () => {
    await resetDatabase();
    await redisService.close();
    await app.close();
  });

  it('should register', async () => {
    const response = await request<
      { register: string },
      { input: RegisterInput }
    >(
      gql`
        mutation Register($input: RegisterInput!) {
          register(input: $input)
        }
      `,
      {
        input: {
          login: faker.internet.userName(),
          password: faker.internet.password(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
        },
      },
    );

    const [cookie] = setCookieParser.parse(
      response.headers['set-cookie'] || [],
    );

    expect(isJWT(cookie?.value)).toEqual(true);
    expect(cookie?.httpOnly).toEqual(true);
    expect(cookie?.secure).toEqual(true);

    expect(isJWT(response.data.data.register)).toEqual(true);
  });

  it('should login', async () => {
    const login = faker.internet.userName();
    const password = faker.internet.password();

    await authService.register({
      login,
      password,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    const response = await request<{ login: string }, { input: LoginInput }>(
      gql`
        mutation Login($input: LoginInput!) {
          login(input: $input)
        }
      `,
      {
        input: {
          login,
          password,
        },
      },
    );

    const [cookie] = setCookieParser.parse(
      response.headers['set-cookie'] || [],
    );

    expect(isJWT(cookie?.value)).toEqual(true);
    expect(cookie?.httpOnly).toEqual(true);
    expect(cookie?.secure).toEqual(true);

    expect(isJWT(response.data.data.login)).toEqual(true);
  });

  it('should get the viewer', async () => {
    const login = faker.internet.userName();

    const [accessToken] = await authService.register({
      login,
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    const response = await request<{ viewer: UserDto }>(
      gql`
        query Viewer {
          viewer {
            id
            login
          }
        }
      `,
      undefined,
      accessToken,
    );

    expect(response.data.data.viewer.login).toEqual(login);
  });
});
