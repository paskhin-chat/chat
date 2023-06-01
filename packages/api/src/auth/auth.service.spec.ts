import { Test, TestingModule } from '@nestjs/testing';
import { isJWT, isUUID } from 'class-validator';

import { UserModule } from '../user/user.module';
import { RedisModule } from '../redis/redis.module';
import { ConfigModule } from '../config/config.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisService } from '../redis/redis.service';
import { resetDatabase } from '../common/test';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UserModule, RedisModule, ConfigModule, PrismaModule],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    await resetDatabase();
    await module.get<RedisService>(RedisService).close();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should register new user, return access and refresh tokens', async () => {
    const [accessToken, refreshToken] = await authService.register({
      login: 'login',
      password: 'password',
      // eslint-disable-next-line sonarjs/no-duplicate-string
      firstName: 'First name',
      lastName: 'Last name',
    });

    expect(isJWT(accessToken)).toEqual(true);
    expect(isJWT(refreshToken)).toEqual(true);
  });

  it('should register user and log this user in, return access and refresh tokens', async () => {
    await authService.register({
      login: 'login',
      password: 'password',
      firstName: 'First name',
      lastName: 'Last name',
    });

    const [accessToken, refreshToken] = await authService.login({
      login: 'login',
      password: 'password',
    });

    expect(isJWT(accessToken)).toEqual(true);
    expect(isJWT(refreshToken)).toEqual(true);
  });

  it('should verify token', async () => {
    const [accessToken, refreshToken] = await authService.register({
      login: 'login',
      password: 'password',
      firstName: 'First name',
      lastName: 'Last name',
    });

    const atAuthorizedUserData = await authService.verifyToken(accessToken);
    const rtAuthorizedUserData = await authService.verifyToken(refreshToken);

    expect(isUUID(atAuthorizedUserData?.id)).toEqual(true);
    expect(atAuthorizedUserData?.login).toEqual('login');

    expect(isUUID(rtAuthorizedUserData?.id)).toEqual(true);
    expect(rtAuthorizedUserData?.login).toEqual('login');
  });
});
