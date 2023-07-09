import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import Keyv from 'keyv';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';

import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { contextFactory } from './common/context';
import { AuthService } from './auth/auth.service';
import { RoomModule } from './room/room.module';
import { MemberModule } from './member/member.module';
import { MessageModule } from './message/message.module';
import { DateScalar } from './common/graphql';

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
        autoSchemaFile: './src/schema/schema.gql',
        definitions: {
          path: './src/schema/schema.ts',
          customScalarTypeMapping: {
            DateTime: 'string',
          },
        },
        subscriptions: {
          'graphql-ws': {
            /**
             * If user tries to connect WS server without authorization, then
             * it'll be rejected.
             */
            onConnect: (ctx) => !!ctx.connectionParams?.authorization,
          },
          'subscriptions-transport-ws': false,
        },
        context: contextFactory(authService),
        useGlobalPrefix: true,
        cors: configService.dev
          ? { origin: configService.clientUrl, credentials: true }
          : false,
        cache: new KeyvAdapter(new Keyv(configService.redisUrl)),
      }),
      inject: [ConfigService, AuthService],
    }),
    AuthModule,
    RoomModule,
    MemberModule,
    MessageModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
