import { Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { uniq } from 'lodash';
import { UserInputError } from 'apollo-server';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

import { CreateRoomInput } from './dto/create-room.input';

@Injectable()
export class RoomService {
  public constructor(private readonly prismaService: PrismaService, private readonly usersService: UserService) {}

  /**
   * Finds or creates room by users.
   */
  public async create(input: CreateRoomInput, viewerId: string): Promise<Room> {
    const userIds = uniq([...input.userIds, viewerId]);
    const users = await this.usersService.findByIds(userIds);

    if (users.length !== userIds.length) {
      throw new UserInputError('Invalid user IDs detected');
    }

    return (
      (await this.findRoomByUsers(userIds)) ||
      (await this.prismaService.room.create({
        data: {
          name: input.name,
          members: {
            createMany: {
              data: userIds.map(id => ({ userId: id })),
            },
          },
        },
      }))
    );
  }

  /**
   * Finds room by its id.
   */
  public findById(id: string): Promise<Room | null> {
    return this.prismaService.room.findUnique({ where: { id } });
  }

  /**
   * Finds room by its member user.
   */
  public findRoomsByUserId(userId: string): Promise<Room[]> {
    return this.prismaService.room.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
    });
  }

  private async findRoomByUsers(userIds: string[]): Promise<Room | null> {
    const rooms = await this.prismaService.room.findMany({
      where: {
        members: {
          every: {
            userId: {
              in: userIds,
            },
          },
        },
      },
      include: {
        members: true,
      },
    });

    return rooms.find(room => room.members.length === userIds.length) || null;
  }
}
