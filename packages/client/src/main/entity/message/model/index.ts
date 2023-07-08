import { gql, useMutation, useQuery } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import { CreateMessageInput, MessageDto } from 'api';
import { useEffect } from 'react';

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

const MessagesQuery = gql`
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
`;

/**
 * Hook for getting and storing messages.
 */
export function useMessages(roomId: string): {
  messages: IMessage[];
  loading: boolean;
} {
  const { data, loading, subscribeToMore } = useQuery<
    { messages: MessageDto[] },
    { roomId: string }
  >(MessagesQuery, {
    variables: {
      roomId,
    },
  });

  useEffect(() => {
    subscribeToMore<{ messageCreated: MessageDto }>({
      variables: {
        roomId,
      },
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
      updateQuery: (previousQueryResult, options) => {
        const newMessage = options.subscriptionData.data.messageCreated;

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
  }, [roomId, subscribeToMore]);

  const messages: IMessage[] =
    data?.messages.map((message) => ({
      id: message.id,
      content: message.content,
      member: {
        userId: message.member.user.id,
        firstName: message.member.user.firstName,
        lastName: message.member.user.lastName,
      },
      sendTime: new Date(message.sendTime),
    })) || [];

  return {
    messages,
    loading,
  };
}

/**
 * Creates and stores a message.
 */
export function useCreateMessage(onCompleted?: () => void): [
  createMessage: (input: CreateMessageInput) => void,
  result: {
    loading: boolean;
    error: ApolloError | undefined;
  },
] {
  const [createMessage, { loading, error }] = useMutation<
    { createMessage: MessageDto },
    { input: CreateMessageInput }
  >(
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
    {
      // update: (cache, result, options) => {
      //   const data = cache.readQuery<
      //     { messages: MessageDto[] },
      //     { roomId: string }
      //   >({
      //     query: MessagesQuery,
      //     variables: {
      //       roomId: options.variables!.input.roomId,
      //     },
      //   });
      //
      //   if (!data) {
      //     return;
      //   }
      //
      //   cache.writeQuery<{ messages: MessageDto[] }, { roomId: string }>({
      //     query: MessagesQuery,
      //     variables: {
      //       roomId: options.variables!.input.roomId,
      //     },
      //     data: {
      //       messages: [...data.messages, result.data!.createMessage],
      //     },
      //   });
      // },
      onCompleted,
    },
  );

  return [
    (input) => createMessage({ variables: { input } }),
    { loading, error },
  ];
}
