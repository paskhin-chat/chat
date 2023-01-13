import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

const pubSub = new RedisPubSub();

@Resolver(() => User)
export class UsersResolver {
  public constructor(private readonly usersService: UsersService) {}

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

    await pubSub.publish('userCreated', { userCreated: user });

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
    return pubSub.asyncIterator('userCreated');
  }
}
