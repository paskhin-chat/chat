import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  /**
   * User's id.
   */
  @Field(() => ID, { description: "User's id." })
  public id!: string;

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
}
