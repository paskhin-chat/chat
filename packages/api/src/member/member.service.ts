import { Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MemberService {
  public constructor(private readonly prismaService: PrismaService) {}

  /**
   * Finds room's members.
   */
  public async findByRoomId(roomId: string): Promise<Member[] | null> {
    return this.prismaService.room
      .findUnique({ where: { id: roomId } })
      .members();
  }
}
