import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class MessageDto {
  /**
   * Message's id.
   */
  @Field(() => ID)
  public id!: string;

  /**
   * Message's user id.
   */
  @Field(() => UserDto)
  public user!: string;

  /**
   * Room's id.
   */
  @Field(() => String)
  public roomId!: string;

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
