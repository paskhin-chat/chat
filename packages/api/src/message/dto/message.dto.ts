import { Field, ID, ObjectType } from '@nestjs/graphql';

import { MemberDto } from '../../member/dto/member.dto';
import { RoomDto } from '../../room/dto/room.dto';

@ObjectType()
export class MessageDto {
  /**
   * Message's id.
   */
  @Field(() => ID)
  public id!: string;

  /**
   * Message's room's id.
   */
  @Field(() => ID)
  public roomId!: string;

  /**
   * Message's room.
   */
  @Field(() => RoomDto)
  public room!: RoomDto;

  /**
   * Message's member's id.
   */
  @Field(() => ID)
  public memberId!: string;

  /**
   * Message's member.
   */
  @Field(() => MemberDto)
  public member!: MemberDto;

  /**
   * Message's content.
   */
  @Field(() => String)
  public content!: string;

  /**
   * Message's send date time.
   */
  @Field(() => Date)
  public sendTime!: Date;
}
