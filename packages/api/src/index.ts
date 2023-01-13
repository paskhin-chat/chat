import { NestFactory } from '@nestjs/core';
import { config } from 'config';

import { PrismaService } from './prisma/prisma.service';
import { AppModule } from './app.module';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);

  app.setGlobalPrefix(config.API_PREFIX);

  prismaService.enableShutdownHooks(app);

  await app.listen(config.API_PORT);
})();
