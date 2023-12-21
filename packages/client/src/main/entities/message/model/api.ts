import {
  gql,
  IGqlExecutor,
  IGqlExecutorOptions,
  ISubscriptionOptions,
  useGqlExecutor,
  useSubscription,
  Mutation,
  MutationCreateMessageArgs,
  Query,
  QueryMessagesArgs,
  Subscription,
} from '../../../shared';

export function useMessagesExecutor(
  options?: IGqlExecutorOptions<Pick<Query, 'messages'>, QueryMessagesArgs>,
): IGqlExecutor<QueryMessagesArgs> {
  return useGqlExecutor<Pick<Query, 'messages'>, QueryMessagesArgs>(messagesQuery, options);
}

export function useCreateMessageExecutor(
  options?: IGqlExecutorOptions<Pick<Mutation, 'createMessage'>, MutationCreateMessageArgs, { id: string }>,
): IGqlExecutor<MutationCreateMessageArgs> {
  return useGqlExecutor<Pick<Mutation, 'createMessage'>, MutationCreateMessageArgs, { id: string }>(
    createMessageMutation,
    options,
  );
}

export function useMessageCreatedSubscription(
  options: ISubscriptionOptions<Pick<Subscription, 'messageCreated'>>,
): void {
  return useSubscription(messageCreatedSubscription, undefined, options);
}

const messagesQuery = gql`
  query Messages($roomId: ID!, $cursor: String) {
    messages(roomId: $roomId, cursor: $cursor) {
      id
      content
      sendTime
      user {
        id
        lastName
        firstName
        secondName
      }
    }
  }
`;

const createMessageMutation = gql`
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      content
      sendTime
      user {
        id
        lastName
        firstName
        secondName
      }
    }
  }
`;

const messageCreatedSubscription = gql`
  subscription MessageCreated {
    messageCreated {
      id
      content
      sendTime
      roomId
      user {
        id
        lastName
        firstName
        secondName
      }
    }
  }
`;
