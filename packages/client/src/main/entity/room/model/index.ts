import { gql, useMutation, useQuery } from '@apollo/client';
import { CreateRoomInput, RoomDto } from 'api';
import { ApolloError } from '@apollo/client/errors';

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
 * Hook for getting room.
 */
export function useRoom(id: string): {
  room: IRoom | undefined;
  loading: boolean;
} {
  const { data, loading } = useQuery<{ room: RoomDto | null }, { id: string }>(
    gql`
      query Room($id: ID!) {
        room(id: $id) {
          id
          name
          members {
            id
            user {
              id
              firstName
              lastName
            }
          }
        }
      }
    `,
    {
      variables: {
        id,
      },
    },
  );

  const room: IRoom | undefined = data?.room
    ? {
        ...data.room,
        name: data.room.name || undefined,
        creationDate: data.room.creationDate
          ? new Date(data.room.creationDate)
          : undefined,
        members: data.room.members.map((member) => ({
          id: member.id,
          userId: member.user.id,
          firstName: member.user.firstName,
          lastName: member.user.lastName,
        })),
      }
    : undefined;

  return {
    room,
    loading,
  };
}

/**
 * Hook for getting rooms.
 */
export function useRooms(): {
  rooms: IRoom[];
  loading: boolean;
} {
  const { data, loading } = useQuery<{ rooms: RoomDto[] }>(
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

  const rooms: IRoom[] =
    data?.rooms.map((room) => ({
      ...room,
      name: room.name || undefined,
      creationDate: room.creationDate ? new Date(room.creationDate) : undefined,
      members: room.members.map((member) => ({
        id: member.id,
        userId: member.user.id,
        firstName: member.user.firstName,
        lastName: member.user.lastName,
      })),
    })) || [];

  return {
    rooms,
    loading,
  };
}

/**
 * Hook for creating a room.
 */
export function useCreateRoom(): [
  createRoom: (input: CreateRoomInput) => Promise<void>,
  result: { loading: boolean; error: ApolloError | undefined },
] {
  const [createRoomMutation, { loading, error }] = useMutation<
    { createRoom: { id: string } },
    { input: CreateRoomInput }
  >(
    gql`
      mutation CreateRoom($input: CreateRoomInput!) {
        createRoom(input: $input) {
          id
        }
      }
    `,
    {
      fetchPolicy: 'network-only',
    },
  );

  const createRoom = async (input: CreateRoomInput): Promise<void> => {
    await createRoomMutation({
      variables: { input },
    });
  };

  return [createRoom, { error, loading }];
}
