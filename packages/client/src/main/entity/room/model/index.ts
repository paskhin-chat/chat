import { gql } from '@apollo/client';
import { CreateRoomInput, RoomDto } from 'api';

import {
  IExecutor,
  IMutationExecutor,
  TMutationOptions,
  useMutationExecutor,
  useQueryExecutor,
} from 'shared';

/**
 * Room member.
 */
export interface IRoomMember {
  /**
   * Member's id.
   */
  id: string;
  /**
   * Member's user's id.
   */
  userId: string;
  /**
   * Member's first name.
   */
  firstName: string;
  /**
   * Member's last name.
   */
  lastName: string;
  /**
   * Member's second name.
   */
  secondName?: string;
}

/**
 * Room.
 */
export interface IRoom {
  /**
   * Room's id.
   */
  id: string;

  /**
   * Room's name.
   */
  name?: string;

  /**
   * Room's creation date.
   */
  creationDate?: Date;

  /**
   * Members' info.
   */
  members: IRoomMember[];
}

/**
 * Hook for getting rooms.
 */
export function useRoomsExecutor(): IExecutor<IRoom[]> {
  const executor = useQueryExecutor<{ rooms: RoomDto[] }>(
    gql`
      query Rooms {
        rooms {
          id
          name
          creationDate
          members {
            id
            joinDate
            user {
              id
              firstName
              lastName
            }
          }
        }
      }
    `,
  );

  return {
    ...executor,
    response:
      executor.response &&
      executor.response.rooms.map((room) => roomMapper(room)),
  };
}

/**
 * Hook for creating a room.
 */
export function useCreateRoomExecutor(
  options?: TMutationOptions<{ id: string }, CreateRoomInput>,
): IMutationExecutor<{ id: string }, CreateRoomInput> {
  return useMutationExecutor(
    gql`
      mutation CreateRoom($input: CreateRoomInput!) {
        createRoom(input: $input) {
          id
        }
      }
    `,
    options,
  );
}

function roomMapper(dto: RoomDto): IRoom {
  return {
    id: dto.id,
    name: dto.name || undefined,
    creationDate: dto.creationDate ? new Date(dto.creationDate) : undefined,
    members: dto.members.map((member) => ({
      id: member.id,
      userId: member.user.id,
      firstName: member.user.firstName,
      lastName: member.user.lastName,
      secondName: member.user.secondName || undefined,
    })),
  };
}
