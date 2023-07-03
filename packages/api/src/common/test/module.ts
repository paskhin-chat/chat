import { Test, TestingModule } from '@nestjs/testing';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UserModule } from '../../user/user.module';
import { ConfigModule } from '../../config/config.module';
import { RedisModule } from '../../redis/redis.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthService } from '../../auth/auth.service';
import { contextFactory } from '../context';
import { AuthModule } from '../../auth/auth.module';
import { RoomModule } from '../../room/room.module';
import { MemberModule } from '../../member/member.module';
import { MessageModule } from '../../message/message.module';

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
            'graphql-ws': {
              onConnect: (ctx) => !!ctx.connectionParams?.authorization,
            },
            'subscriptions-transport-ws': false,
          },
          context: contextFactory(auth),
          useGlobalPrefix: true,
        }),
        inject: [AuthService],
      }),
      AuthModule,
      RoomModule,
      MemberModule,
      MessageModule,
    ],
  }).compile();
}
