import { forwardRef, Module } from '@nestjs/common';

// eslint-disable-next-line import/no-cycle
import { AuthModule } from '../auth/auth.module';

import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule)],
})
export class UsersModule {}
