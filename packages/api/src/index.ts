import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import * as path from 'node:path';
import * as process from 'node:process';
import { loadEnv } from 'exdenv';
import { ports } from 'constant';

import { envSchema } from './common/env';
import { PrismaService } from './prisma/prisma.service';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

loadEnv(envSchema, {
  corePath: path.resolve(process.cwd(), '../../.env'),
  defaultsPathsMap: {
    development: path.resolve(process.cwd(), '../../.env.dev.defaults'),
    test: path.resolve(process.cwd(), '../../.env.test.defaults'),
  },
});

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  const configService = app.get(ConfigService);

  prismaService.enableShutdownHooks(app);

  app.use(cookieParser(configService.cookiesSecretToken));

  /**
   * Here used a dev variable because the API port in production mode is set by
   * nginx and in test mode is set in test files.
   */
  await app.listen(ports.dev.api);
})();
