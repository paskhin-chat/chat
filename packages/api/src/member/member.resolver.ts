import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { AuthGuard } from '../auth/auth.guard';
import { UserDto } from '../user/dto/user.dto';

import { MemberDto } from './dto/member.dto';
import { MemberService } from './member.service';

@Resolver(() => MemberDto)
export class MemberResolver {
  public constructor(private readonly memberService: MemberService) {}

  /**
   * Resolves member's user.
   */
  @UseGuards(AuthGuard)
  @ResolveField('user', () => UserDto)
  public async user(@Parent() member: MemberDto): Promise<User> {
    const user = await this.memberService.findByUserId(member.id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
