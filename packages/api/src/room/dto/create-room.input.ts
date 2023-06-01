import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  /**
   * Users' ids without authorized user.
   */
  @Field(() => [ID])
  public userIds!: string[];

  /**
   * Room's login.
   */
  @Field(() => String, { nullable: true })
  public name?: string;
}
