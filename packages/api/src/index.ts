import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { PrismaService } from './prisma/prisma.service';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  const configService = app.get(ConfigService);

  prismaService.enableShutdownHooks(app);

  app.use(cookieParser(configService.cookiesSecretToken));

  await app.listen(3_002);
})();
