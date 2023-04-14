import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  /**
   * User's first name.
   */
  @Field({ description: "User's first name." })
  public firstName!: string;

  /**
   * User's last name.
   */
  @Field({ description: "User's last name." })
  public lastName!: string;

  /**
   * User's last name.
   */
  @Field({ description: "User's dob." })
  public dob!: string;
}
