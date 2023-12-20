import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Member, Room } from '@prisma/client';

import { AuthGuard } from '../auth/auth.guard';
import { ViewerDataDecorator } from '../common/decorators';
import type { IViewerData } from '../auth/auth.service';
import { MemberDto } from '../member/dto/member.dto';
import { MemberService } from '../member/member.service';

import { CreateRoomInput } from './dto/create-room.input';
import { RoomService } from './room.service';
import { RoomDto } from './dto/room.dto';

@Resolver(() => RoomDto)
export class RoomResolver {
  public constructor(private readonly roomService: RoomService, private readonly memberService: MemberService) {}

  /**
   * Finds the viewer's rooms.
   */
  @UseGuards(AuthGuard)
  @Query(() => [RoomDto], { name: 'rooms' })
  public findAll(@ViewerDataDecorator() viewerData: IViewerData): Promise<Room[]> {
    return this.roomService.findRoomsByUserId(viewerData.id);
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
    @ViewerDataDecorator() viewerData: IViewerData,
  ): Promise<Room> {
    return this.roomService.create(input, viewerData.id);
  }
}
