import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * Module init.
   */
  public async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  /**
   * @param app
   */
  public enableShutdownHooks(app: INestApplication): void {
    this.$on('beforeExit', (): void => {
      void app.close();
    });
  }
}
