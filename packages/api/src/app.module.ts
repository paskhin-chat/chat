import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import Keyv from 'keyv';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import { Request, Response } from 'express';

import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { GqlContext } from './common/gql-context';
import { AuthService } from './auth/auth.service';
import { RoomModule } from './room/room.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    RedisModule,
    PrismaModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService, authService: AuthService) => ({
        driver: ApolloDriver,
        autoSchemaFile: './src/gen/schema.gql',
        definitions: {
          path: './src/gen/schema.ts',
          customScalarTypeMapping: {
            DateTime: 'string',
          },
        },
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
        }): GqlContext => new GqlContext(context.req, context.res, authService),
        useGlobalPrefix: true,
        cache: new KeyvAdapter(new Keyv(configService.redisUrl)),
      }),
      inject: [ConfigService, AuthService],
    }),
    AuthModule,
    RoomModule,
    MemberModule,
  ],
})
export class AppModule {}
