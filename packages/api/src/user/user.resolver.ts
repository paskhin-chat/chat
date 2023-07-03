import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';

import { RedisService } from '../redis/redis.service';
import { AuthGuard } from '../auth/auth.guard';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserDto)
export class UserResolver {
  public constructor(
    private readonly usersService: UserService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * Finds one.
   */
  @UseGuards(AuthGuard)
  @Query(() => UserDto, { name: 'user', nullable: true })
  public findOne(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<User | null> {
    return this.usersService.findById(id);
  }

  /**
   * Finds all.
   */
  @UseGuards(AuthGuard)
  @Query(() => [UserDto], { name: 'users' })
  public findAll(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  /**
   * Updates user.
   */
  @Mutation(() => UserDto)
  public updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    return this.usersService.update(input.id, input);
  }

  /**
   * Removes user.
   */
  @Mutation(() => UserDto)
  public removeUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  /**
   * Creates user.
   */
  @Mutation(() => UserDto)
  public async createUser(
    @Args('input') input: CreateUserInput,
  ): Promise<User> {
    const user = await this.usersService.create(input);

    await this.redisService.publish('userCreated', { userCreated: user });

    return user;
  }

  /**
   * Creating user subscription.
   */
  @Subscription(() => UserDto)
  public userCreated(): AsyncIterator<User> {
    return this.redisService.asyncIterator('userCreated');
  }
}
