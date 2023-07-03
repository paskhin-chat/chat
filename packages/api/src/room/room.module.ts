import { Module } from '@nestjs/common';

import { MemberModule } from '../member/member.module';
import { UserModule } from '../user/user.module';

import { RoomService } from './room.service';
import { RoomResolver } from './room.resolver';

@Module({
  providers: [RoomService, RoomResolver],
  imports: [MemberModule, UserModule],
  exports: [RoomService],
})
export class RoomModule {}
