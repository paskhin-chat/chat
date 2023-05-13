import { NestFactory } from '@nestjs/core';

import { PrismaService } from './prisma/prisma.service';
import { AppModule } from './app.module';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);

  prismaService.enableShutdownHooks(app);

  await app.listen(3_002);
})();
