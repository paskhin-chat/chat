import { gql } from '@apollo/client';
import { CreateMessageInput, MessageDto } from 'api';
import { useEffect } from 'react';

import {
  IExecutor,
  IMutationExecutor,
  TMutationOptions,
  IQueryOptions,
  useMutationExecutor,
  useQueryExecutor,
} from 'shared';

/**
 * Message.
 */
export interface IMessage {
  /**
   * Message's id.
   */
  id: string;
  /**
   * Message's member.
   */
  member: {
    userId: string;
    firstName: string;
    lastName: string;
  };
  /**
   * Message's content.
   */
  content: string;
  /**
   * Message's send time.
   */
  sendTime: Date;
}

/**
 * Hook for getting, storing and subscribing to messages.
 */
export function useMessagesExecutor(
  options: IQueryOptions<{ messages: MessageDto[] }, { roomId: string }>,
): IExecutor<IMessage[], { roomId: string }> {
  const executor = useQueryExecutor(
    gql`
      query Messages($roomId: ID!) {
        messages(roomId: $roomId) {
          id
          content
          sendTime
          roomId
          member {
            user {
              id
              lastName
              firstName
            }
          }
        }
      }
    `,
    options,
  );

  useEffect(() => {
    executor.subscribeToMore<{ messageCreated: MessageDto }>({
      variables: options.variables,
      document: gql`
        subscription MessageCreated {
          messageCreated {
            id
            content
            roomId
            sendTime
            member {
              user {
                id
                lastName
                firstName
              }
            }
          }
        }
      `,
      updateQuery: (previousQueryResult, opt) => {
        const newMessage = opt.subscriptionData.data.messageCreated;

        const exists = previousQueryResult.messages.find(
          ({ id }) => id === newMessage.id,
        );

        if (exists) {
          return previousQueryResult;
        }

        return {
          messages: [...previousQueryResult.messages, newMessage],
        };
      },
    });
  }, [executor, options.variables]);

  return {
    ...executor,
    response:
      executor.response?.messages &&
      executor.response.messages.map((message) => messageMapper(message)),
  };
}

/**
 * Creates a message.
 */
export function useCreateMessageExecutor(
  options?: TMutationOptions<MessageDto, CreateMessageInput>,
): IMutationExecutor<MessageDto, CreateMessageInput> {
  return useMutationExecutor(
    gql`
      mutation CreateMessage($input: CreateMessageInput!) {
        createMessage(input: $input) {
          id
          content
          sendTime
          roomId
          member {
            user {
              id
              lastName
              firstName
            }
          }
        }
      }
    `,
    options,
  );
}

function messageMapper(dto: MessageDto): IMessage {
  return {
    id: dto.id,
    content: dto.content,
    member: {
      userId: dto.member.user.id,
      firstName: dto.member.user.firstName,
      lastName: dto.member.user.lastName,
    },
    sendTime: new Date(dto.sendTime),
  };
}
