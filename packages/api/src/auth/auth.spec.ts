import { INestApplication } from '@nestjs/common';
import { isJWT, isUUID } from 'class-validator';
import cookieParser from 'cookie-parser';
import setCookieParser from 'set-cookie-parser';
import { faker } from '@faker-js/faker';
import { keys } from 'lodash';
import { ports } from 'constant';

import { ConfigService } from '../config/config.service';
import { RedisService } from '../redis/redis.service';
import {
  createModule,
  gql,
  requestCreator,
  resetDatabase,
} from '../common/test';
import { LoginInput, RegisterInput, UserDto } from '../schema';

import { AuthService } from './auth.service';

describe('Auth integration', () => {
  const request = requestCreator();

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

    await app.listen(ports.test.api);
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

    const [at, rt] = await authService.register({
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
      { at, rt },
    );

    expect(response.data.data.viewer.login).toEqual(login);
  });

  it('should refresh access token', async () => {
    const [, rt] = await authService.register({
      login: faker.internet.userName(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    const response = await request<{ refreshAccessToken: string }>(
      gql`
        mutation RefreshAccessToken {
          refreshAccessToken
        }
      `,
      undefined,
      { at: '', rt },
    );

    const accessToken = response.data.data.refreshAccessToken;

    const viewerData = await authService.verifyToken(accessToken);

    expect(isJWT(accessToken)).toBe(true);
    expect(keys(viewerData)).toEqual(['id', 'login']);
    expect(isUUID(viewerData.id)).toBe(true);
  });
});
