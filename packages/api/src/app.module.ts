import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import Keyv from 'keyv';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';

import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    RedisModule,
    PrismaModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => ({
        driver: ApolloDriver,
        autoSchemaFile: './src/gen/schema.gql',
        definitions: {
          path: './src/gen/schema.ts',
        },
        subscriptions: {
          'graphql-ws': true,
          'subscriptions-transport-ws': true,
        },
        useGlobalPrefix: true,
        cache: new KeyvAdapter(new Keyv(configService.redisUrl)),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
