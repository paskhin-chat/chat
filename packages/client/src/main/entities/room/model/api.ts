import { gql, IGqlExecutor, IGqlExecutorOptions, useGqlExecutor } from '../../../shared';
import { Mutation, MutationCreateRoomArgs, Query } from '../../../gen/api-types';

export function useRoomsExecutor(options?: IGqlExecutorOptions<Pick<Query, 'rooms'>>): IGqlExecutor {
  return useGqlExecutor(roomsQuery, options);
}

export function useCreateRoomExecutor(
  options?: IGqlExecutorOptions<Pick<Mutation, 'createRoom'>, MutationCreateRoomArgs>,
): IGqlExecutor<MutationCreateRoomArgs> {
  return useGqlExecutor(createRoomMutation, options);
}

const roomsQuery = gql`
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
`;

const createRoomMutation = gql`
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
    }
  }
`;
