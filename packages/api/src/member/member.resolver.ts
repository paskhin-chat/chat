import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApolloError } from 'apollo-server';
import { ApolloServerErrorCode } from '@apollo/server/errors';

import { AuthGuard } from '../auth/auth.guard';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';

import { MemberDto } from './dto/member.dto';

@Resolver(() => MemberDto)
export class MemberResolver {
  public constructor(private readonly userService: UserService) {}

  /**
   * Resolves member's user.
   */
  @UseGuards(AuthGuard)
  @ResolveField('user', () => UserDto)
  public async user(@Parent() member: MemberDto): Promise<User> {
    const user = await this.userService.findUserByMemberId(member.id);

    if (!user) {
      throw new ApolloError(
        'User not found',
        ApolloServerErrorCode.OPERATION_RESOLUTION_FAILURE,
      );
    }

    return user;
  }
}
