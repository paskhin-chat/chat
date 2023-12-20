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
        },
        subscriptions: {
          'graphql-ws': {
            /**
             * If user tries to connect WS server without authorization, then it'll be rejected.
             */
            onConnect: ctx => !!ctx.connectionParams?.authorization,
          },
          'subscriptions-transport-ws': false,
        },
        context: contextFactory(authService),
        /**
         * CORS Configuration:
         *
         * - Development Mode: CORS is disabled (allows requests from all origins) to facilitate development and testing.
         *   This setting should be used cautiously as it opens up the server to accept requests from any origin.
         * - Production Mode: CORS is managed externally by Nginx. In this setup, specific origins and rules are
         *   configured at the Nginx level, offering a more controlled and secure environment. Ensure that the Nginx
         *   configuration aligns with the application's CORS requirements.
         *
         * Note: The 'credentials: true' option allows the server to accept cookies and authentication data from the
         * client, which is essential for sessions and authenticated requests. Adjust this setting based on your
         * application's authentication strategy.
         */
        cors: {
          origin: true, // In development, accept requests from all origins
          credentials: true, // Allow credentials (cookies, tokens) to be sent with requests
        },
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
