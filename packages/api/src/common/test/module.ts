import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Request, Response } from 'express';

import { UserModule } from '../../user/user.module';
import { ConfigModule } from '../../config/config.module';
import { RedisModule } from '../../redis/redis.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthService } from '../../auth/auth.service';
import { GqlContext } from '../gql-context';
import { AuthModule } from '../../auth/auth.module';
import { RoomModule } from '../../room/room.module';
import { MemberModule } from '../../member/member.module';

/**
 * Creates testing module that corresponds a real one.
 */
export function createModule(): Promise<TestingModule> {
  return Test.createTestingModule({
    imports: [
      UserModule,
      ConfigModule,
      RedisModule,
      PrismaModule,
      GraphQLModule.forRootAsync<ApolloDriverConfig>({
        driver: ApolloDriver,
        useFactory: (auth: AuthService) => ({
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
          }): GqlContext => new GqlContext(context.req, context.res, auth),
          useGlobalPrefix: true,
        }),
        inject: [AuthService],
      }),
      AuthModule,
      RoomModule,
      MemberModule,
    ],
  }).compile();
}
