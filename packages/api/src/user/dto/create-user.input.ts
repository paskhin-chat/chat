import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  /**
   * User's login.
   */
  @Field()
  public login!: string;

  /**
   * User's first name.
   */
  @Field()
  public firstName!: string;

  /**
   * User's last name.
   */
  @Field()
  public lastName!: string;

  /**
   * User's last name.
   */
  @Field(() => String, { nullable: true })
  public secondName?: string;

  /**
   * User's date of birth.
   */
  @Field(() => String, { nullable: true })
  public dob?: string;

  /**
   * User's password.
   */
  @Field()
  public password!: string;
}
