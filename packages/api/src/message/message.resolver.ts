import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Member, Message, Room } from '@prisma/client';

import { AuthGuard } from '../auth/auth.guard';
import { MemberDto } from '../member/dto/member.dto';
import { RoomDto } from '../room/dto/room.dto';
import { MemberService } from '../member/member.service';
import { RoomService } from '../room/room.service';
import { ViewerDataDecorator } from '../common/decorators';
import type { IViewerData } from '../auth/auth.service';
import { RedisService } from '../redis/redis.service';
import { GqlContext } from '../common/context';

import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';
import { CreateMessageInput } from './dto/create-message.input';

interface IMessageCreatedSubscriptionPayload {
  message: Message;
  userIds: string[];
}

@Resolver(() => MessageDto)
export class MessageResolver {
  public constructor(
    private readonly messageService: MessageService,
    private readonly memberService: MemberService,
    private readonly roomService: RoomService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * Finds the viewer's rooms.
   */
  @UseGuards(AuthGuard)
  @Query(() => [MessageDto], { name: 'messages' })
  public async findAll(
    @Args('roomId', { type: () => ID }) roomId: string,
    @ViewerDataDecorator() viewerData: IViewerData,
  ): Promise<Message[]> {
    return (
      (await this.messageService.findByRoomIdAndUserId(
        roomId,
        viewerData.id,
      )) || []
    );
  }

  /**
   * Resolves message's member.
   */
  @UseGuards(AuthGuard)
  @ResolveField('member', () => MemberDto)
  public member(@Parent() message: MessageDto): Promise<Member | null> {
    return this.memberService.findById(message.memberId);
  }

  /**
   * Resolves message's room.
   */
  @UseGuards(AuthGuard)
  @ResolveField('room', () => RoomDto)
  public room(@Parent() message: MessageDto): Promise<Room | null> {
    return this.roomService.findById(message.roomId);
  }

  /**
   * Creates message.
   */
  @UseGuards(AuthGuard)
  @Mutation(() => MessageDto)
  public async createMessage(
    @Args('input') input: CreateMessageInput,
    @ViewerDataDecorator() viewerData: IViewerData,
  ): Promise<Message> {
    const message = await this.messageService.createByRoomIdAndUserId(
      input,
      viewerData.id,
    );
    const roomMembers = await this.memberService.findByRoomId(input.roomId);

    await this.redisService.publish<IMessageCreatedSubscriptionPayload>(
      'messageCreated',
      {
        message,
        userIds: roomMembers?.map((member) => member.userId) || [],
      },
    );

    return message;
  }

  /**
   * Creating message subscription.
   */
  @Subscription(() => MessageDto, {
    resolve: (payload: IMessageCreatedSubscriptionPayload) => payload.message,
    filter: async (
      payload: IMessageCreatedSubscriptionPayload,
      variables,
      context: GqlContext,
    ): Promise<boolean> => {
      const viewerData = await context.getViewerData();

      return payload.userIds.includes(viewerData.id);
    },
  })
  public messageCreated(): AsyncIterator<Message> {
    return this.redisService.asyncIterator('messageCreated');
  }
}
