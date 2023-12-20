import {
  gql,
  IGqlExecutor,
  IGqlExecutorOptions,
  ISubscriptionOptions,
  useGqlExecutor,
  useSubscription,
} from "../../../shared";
import {
  Mutation,
  MutationCreateMessageArgs,
  Query,
  QueryMessagesArgs,
  Subscription,
} from "../../../gen/api-types";

export function useMessagesExecutor(
  options?: IGqlExecutorOptions<Pick<Query, "messages">, QueryMessagesArgs>
): IGqlExecutor<Pick<Query, "messages">, QueryMessagesArgs> {
  return useGqlExecutor(messagesQuery, options);
}

export function useCreateMessageExecutor(
  options?: IGqlExecutorOptions<
    Pick<Mutation, "createMessage">,
    MutationCreateMessageArgs,
    {
      id: string;
    }
  >
): IGqlExecutor<Pick<Mutation, "createMessage">, MutationCreateMessageArgs> {
  return useGqlExecutor(createMessageMutation, options);
}

export function useMessageCreatedSubscription(
  options: ISubscriptionOptions<Pick<Subscription, "messageCreated">>
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
