import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';

@Module({
  providers: [MemberResolver, MemberService],
  exports: [MemberService],
  imports: [UserModule],
})
export class MemberModule {}
