import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

import { MemberDto } from '../../member/dto/member.dto';

@ObjectType()
export class RoomDto {
  /**
   * Room's id.
   */
  @Field(() => ID)
  public id!: string;

  /**
   * Room's name.
   */
  @Field(() => String, { nullable: true })
  public name?: string;

  /**
   * Room's creation date.
   */
  @Field(() => GraphQLISODateTime, { nullable: true })
  public creationDate!: Date | null;

  /**
   * Room's members.
   */
  @Field(() => [MemberDto])
  public members!: MemberDto[];
}
