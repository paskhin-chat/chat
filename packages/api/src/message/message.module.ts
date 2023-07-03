import { Module } from '@nestjs/common';

import { MemberModule } from '../member/member.module';
import { RoomModule } from '../room/room.module';

import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';

@Module({
  providers: [MessageResolver, MessageService],
  imports: [MemberModule, RoomModule],
})
export class MessageModule {}
