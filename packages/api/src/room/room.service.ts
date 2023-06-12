import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Room } from '@prisma/client';
import { uniq } from 'lodash';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

import { CreateRoomInput } from './dto/create-room.input';

@Injectable()
export class RoomService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UserService,
  ) {}

  /**
   * Finds or creates room by users.
   */
  public async create(
    input: CreateRoomInput,
    authorizedUserId: string,
  ): Promise<Room> {
    const userIds = uniq([...input.userIds, authorizedUserId]);
    const users = await this.usersService.findByIds(userIds);

    if (users.length !== userIds.length) {
      throw new HttpException(
        'Invalid user IDs Detected',
        HttpStatus.BAD_REQUEST,
      );
    }

    return (
      (await this.findRoomByUsers(userIds)) ||
      (await this.prismaService.room.create({
        data: {
          name: input.name,
          members: {
            createMany: {
              data: userIds.map((id) => ({ userId: id })),
            },
          },
        },
      }))
    );
  }

  /**
   * Finds room by its id and user id.
   */
  public async findRoomByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<Room | null> {
    const availableRooms = await this.findRoomsByUserId(userId);

    return availableRooms.find((room) => room.id === id) || null;
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

  private findRoomByUsers(userIds: string[]): Promise<Room | null> {
    return this.prismaService.room.findFirst({
      where: {
        members: {
          every: {
            userId: {
              in: userIds,
            },
          },
        },
      },
    });
  }
}
