import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Request, Response } from 'express';
import { INestApplication } from '@nestjs/common';
import { isJWT } from 'class-validator';
import cookieParser from 'cookie-parser';
import setCookieParser from 'set-cookie-parser';

import { UsersModule } from '../users/users.module';
import { RedisModule } from '../redis/redis.module';
import { ConfigModule } from '../config/config.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigService } from '../config/config.service';
import { GqlContext } from '../common/gql-context';
import { RedisService } from '../redis/redis.service';
import { gql, requestCreator } from '../common/test/utils';
import { PrismaService } from '../prisma/prisma.service';

import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';

describe('Auth integration', () => {
  const port = 4_000;
  const request = requestCreator(`http://localhost:${port}`);

  let module: TestingModule;
  let app: INestApplication;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule,
        RedisModule,
        PrismaModule,
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          useFactory: (authService: AuthService) => ({
            driver: ApolloDriver,
            autoSchemaFile: true,
            subscriptions: {
              'graphql-ws': true,
              'subscriptions-transport-ws': true,
            },
            context: (context: {
              /**
               * Internal request.
               */
              req: Request;
              /**
               * Internal response.
               */
              res: Response;
            }): GqlContext =>
              new GqlContext(context.req, context.res, authService),
            useGlobalPrefix: true,
          }),
          inject: [AuthService],
        }),
        AuthModule,
      ],
    }).compile();

    app = module.createNestApplication();

    await module.get<PrismaService>(PrismaService).user.deleteMany();

    app.use(
      cookieParser(module.get<ConfigService>(ConfigService).cookiesSecretToken),
    );
    await app.listen(port);
  });

  afterEach(async () => {
    await app.close();
    await module.get<RedisService>(RedisService).close();
  });

  it('should register', async () => {
    const response = await request<{ register: string }>(
      gql`
        mutation Register($input: RegisterInput!) {
          register(input: $input)
        }
      `,
      {
        input: {
          login: 'login',
          password: 'password',
          firstName: 'First name',
          lastName: 'Last name',
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
    const authService = module.get<AuthService>(AuthService);

    await authService.register({
      login: 'login',
      password: 'password',
      firstName: 'First name',
      lastName: 'Last name',
    });

    const response = await request<{ login: string }>(
      gql`
        mutation Login($input: LoginInput!) {
          login(input: $input)
        }
      `,
      {
        input: {
          login: 'login',
          password: 'password',
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
});
