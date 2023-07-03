import { Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MemberService {
  public constructor(private readonly prismaService: PrismaService) {}

  /**
   * Finds member by its id.
   */
  public async findById(memberId: string): Promise<Member | null> {
    return this.prismaService.member.findUnique({
      where: { id: memberId },
    });
  }

  /**
   * Finds room's members.
   */
  public async findByRoomId(roomId: string): Promise<Member[] | null> {
    return this.prismaService.room
      .findUnique({ where: { id: roomId } })
      .members();
  }

  /**
   * Finds member by room's id and user's id.
   */
  public async findByRoomIdAndUserId(
    roomId: string,
    userId: string,
  ): Promise<Member | null> {
    const members = await this.prismaService.room
      .findUnique({ where: { id: roomId } })
      .members({
        where: {
          userId,
        },
      });

    return members?.[0] || null;
  }
}
