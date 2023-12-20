import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import type { Message, User } from "@prisma/client";

import { AuthGuard } from "../auth/auth.guard";
import { MemberService } from "../member/member.service";
import { ViewerDataDecorator } from "../common/decorators";
import type { IViewerData } from "../auth/auth.service";
import { RedisService } from "../redis/redis.service";
import { GqlContext } from "../common/context";

import { MessageDto } from "./dto/message.dto";
import { MessageService } from "./message.service";
import { CreateMessageInput } from "./dto/create-message.input";
import { UserDto } from "../user/dto/user.dto";

interface IMessageCreatedSubscriptionPayload {
  message: Message;
  userIds: string[];
}

@Resolver(() => MessageDto)
export class MessageResolver {
  public constructor(
    private readonly messageService: MessageService,
    private readonly memberService: MemberService,
    private readonly redisService: RedisService
  ) {}

  /**
   * Finds the messages by the room id.
   */
  @UseGuards(AuthGuard)
  @Query(() => [MessageDto], { name: "messages" })
  public async findAll(
    @ViewerDataDecorator() viewerData: IViewerData,
    @Args("roomId", { type: () => ID }) roomId: string,
    @Args("cursor", { type: () => String, nullable: true }) cursor?: string
  ): Promise<Message[]> {
    return (
      (await this.messageService.findByRoomIdAndUserId(
        roomId,
        viewerData.id,
        cursor
      )) || []
    );
  }

  /**
   * Resolves the user id of the message.
   */
  @UseGuards(AuthGuard)
  @ResolveField("user", () => UserDto)
  public async member(@Parent() message: MessageDto): Promise<User | null> {
    return this.messageService.getUserByMessageId(message.id);
  }

  /**
   * Creates message.
   */
  @UseGuards(AuthGuard)
  @Mutation(() => MessageDto)
  public async createMessage(
    @Args("input") input: CreateMessageInput,
    @ViewerDataDecorator() viewerData: IViewerData
  ): Promise<Message> {
    const message = await this.messageService.createByRoomIdAndUserId(
      input,
      viewerData.id
    );
    const roomMembers = await this.memberService.findByRoomId(input.roomId);

    void this.redisService.publish<IMessageCreatedSubscriptionPayload>(
      "messageCreated",
      {
        message,
        userIds: roomMembers?.map((member) => member.userId) || [],
      }
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
      _,
      context: GqlContext
    ): Promise<boolean> => {
      const viewerData = await context.getViewerData();

      return payload.userIds.includes(viewerData.id);
    },
  })
  public messageCreated(): AsyncIterator<Message> {
    return this.redisService.asyncIterator("messageCreated");
  }
}
