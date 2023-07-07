import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Member, Room } from '@prisma/client';

import { AuthGuard } from '../auth/auth.guard';
import { AuthorizedUserDataDecorator } from '../common/decorators';
import type { IAuthorizedUserData } from '../auth/auth.service';
import { MemberDto } from '../member/dto/member.dto';
import { MemberService } from '../member/member.service';

import { CreateRoomInput } from './dto/create-room.input';
import { RoomService } from './room.service';
import { RoomDto } from './dto/room.dto';

@Resolver(() => RoomDto)
export class RoomResolver {
  public constructor(
    private readonly roomService: RoomService,
    private readonly memberService: MemberService,
  ) {}

  /**
   * Finds the authorized user's rooms.
   */
  @UseGuards(AuthGuard)
  @Query(() => [RoomDto], { name: 'rooms' })
  public findAll(
    @AuthorizedUserDataDecorator() authorizedUserData: IAuthorizedUserData,
  ): Promise<Room[]> {
    return this.roomService.findRoomsByUserId(authorizedUserData.id);
  }

  /**
   * Resolves room's members.
   */
  @UseGuards(AuthGuard)
  @ResolveField('members', () => [MemberDto])
  public async members(@Parent() room: RoomDto): Promise<Member[]> {
    return (await this.memberService.findByRoomId(room.id)) || [];
  }

  /**
   * Creates room.
   */
  @UseGuards(AuthGuard)
  @Mutation(() => RoomDto)
  public async createRoom(
    @Args('input') input: CreateRoomInput,
    @AuthorizedUserDataDecorator() authorizedUserData: IAuthorizedUserData,
  ): Promise<Room> {
    return this.roomService.create(input, authorizedUserData.id);
  }
}