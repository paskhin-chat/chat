import { isJWT, isUUID } from 'class-validator';
import { faker } from '@faker-js/faker';
import { keys } from 'lodash';

import { RedisService } from '../redis/redis.service';
import { createModule, resetDatabase } from '../common/test';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let redisService: RedisService;

  beforeEach(async () => {
    const module = await createModule();

    authService = module.get(AuthService);
    redisService = module.get(RedisService);
  });

  afterEach(async () => {
    await resetDatabase();
    await redisService.close();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should register new user, return access and refresh tokens', async () => {
    const [accessToken, refreshToken] = await authService.register({
      login: faker.internet.userName(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    expect(isJWT(accessToken)).toEqual(true);
    expect(isJWT(refreshToken)).toEqual(true);
  });

  it('should register user and log this user in, return access and refresh tokens', async () => {
    const login = faker.internet.userName();
    const password = faker.internet.password();

    await authService.register({
      login,
      password,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    const [accessToken, refreshToken] = await authService.login({
      login,
      password,
    });

    expect(isJWT(accessToken)).toEqual(true);
    expect(isJWT(refreshToken)).toEqual(true);
  });

  it('should verify token', async () => {
    const login = faker.internet.userName();

    const [accessToken, refreshToken] = await authService.register({
      login,
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    const atViewerData = await authService.verifyToken(accessToken);
    const rtViewerData = await authService.verifyToken(refreshToken);

    expect(keys(atViewerData)).toEqual(['id', 'login']);
    expect(isUUID(atViewerData.id)).toBe(true);
    expect(atViewerData.login).toBe(login);

    expect(keys(rtViewerData)).toEqual(['id', 'login']);
    expect(isUUID(rtViewerData.id)).toBe(true);
    expect(rtViewerData.login).toBe(login);
  });

  it('should refresh access token', async () => {
    const [, refreshToken] = await authService.register({
      login: faker.internet.userName(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    });

    const accessToken = await authService.refreshAccessToken(refreshToken);

    const viewerData = await authService.verifyToken(accessToken);

    expect(keys(viewerData)).toEqual(['id', 'login']);
    expect(isUUID(viewerData.id)).toBe(true);
  });
});
