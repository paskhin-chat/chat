import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
} from '@nestjs/graphql';

import { RedisService } from '../redis/redis.service';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  public constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * Creates user.
   *
   * @param createUserInput
   */
  @Mutation(() => User)
  public async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    const user = await this.usersService.create(createUserInput);

    await this.redisService.publish('userCreated', { userCreated: user });

    return user;
  }

  /**
   * Finds all users.
   */
  @Query(() => [User], { name: 'users' })
  public findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   * Finds one.
   */
  @Query(() => User, { name: 'user' })
  public findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  /**
   * Updates user.
   */
  @Mutation(() => User)
  public updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  /**
   * Removes user.
   */
  @Mutation(() => User)
  public removeUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  /**
   * Creating user subscription.
   */
  @Subscription(() => User)
  public userCreated(): AsyncIterator<User> {
    return this.redisService.asyncIterator('userCreated');
  }
}
