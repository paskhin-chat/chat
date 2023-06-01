import { forwardRef, Module } from '@nestjs/common';

// eslint-disable-next-line import/no-cycle
import { AuthModule } from '../auth/auth.module';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [UserResolver, UserService],
  exports: [UserService],
  imports: [forwardRef(() => AuthModule)],
})
export class UserModule {}
