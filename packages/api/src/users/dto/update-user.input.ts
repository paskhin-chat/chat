import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  /**
   * User's id.
   */
  @Field(() => ID)
  public id!: string;
}
