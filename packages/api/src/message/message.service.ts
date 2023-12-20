import { Injectable } from "@nestjs/common";
import { Message, User } from "@prisma/client";
import { ApolloError } from "apollo-server";
import { ApolloServerErrorCode } from "@apollo/server/errors";

import { PrismaService } from "../prisma/prisma.service";
import { MemberService } from "../member/member.service";

import { CreateMessageInput } from "./dto/create-message.input";

@Injectable()
export class MessageService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly memberService: MemberService
  ) {}

  /**
   * Finds all messages of room.
   */
  public async findByRoomIdAndUserId(
    roomId: string,
    userId: string,
    cursor?: string,
    limit = 10
  ): Promise<Message[] | null> {
    return this.prismaService.room
      .findFirst({ where: { id: roomId, members: { some: { userId } } } })
      .messages({
        orderBy: { sendTime: "asc" },
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
        take: -limit,
      });
  }

  public async getUserByMessageId(messageId: string): Promise<User> {
    return this.prismaService.message
      .findUnique({ where: { id: messageId } })
      .member()
      .user();
  }

  /**
   * Creates message by room id, viewer id and its content.
   */
  public async createByRoomIdAndUserId(
    input: CreateMessageInput,
    viewerId: string
  ): Promise<Message> {
    const viewerMember = await this.memberService.findByRoomIdAndUserId(
      input.roomId,
      viewerId
    );

    if (!viewerMember) {
      throw new ApolloError(
        "Viewer's member's not been found",
        ApolloServerErrorCode.OPERATION_RESOLUTION_FAILURE
      );
    }

    return this.prismaService.message.create({
      data: {
        roomId: input.roomId,
        content: input.content,
        memberId: viewerMember.id,
      },
    });
  }
}
