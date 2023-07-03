import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  /**
   * Room's id.
   */
  @Field(() => ID)
  public roomId!: string;

  /**
   * Message's content.
   */
  @Field(() => String)
  public content!: string;
}
