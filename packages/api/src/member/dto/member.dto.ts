import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class MemberDto {
  /**
   * Member's id.
   */
  @Field(() => ID)
  public id!: string;

  /**
   * When member joined the room.
   */
  @Field(() => Date)
  public joinDate!: Date | null;

  /**
   * Member's user.
   */
  @Field(() => UserDto)
  public user!: UserDto;
}
