import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  /**
   * User's id.
   */
  @Field(() => ID)
  public id!: string;

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
   * User's second name.
   */
  @Field(() => String, { nullable: true })
  public secondName!: string | null;

  /**
   * User's date of birth.
   */
  @Field(() => String, { nullable: true })
  public dob!: Date | null;
}
