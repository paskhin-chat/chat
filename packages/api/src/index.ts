import { NestFactory } from '@nestjs/core';

import { PrismaService } from './prisma/prisma.service';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.apiPrefix);

  prismaService.enableShutdownHooks(app);

  await app.listen(configService.apiPort);
})();
