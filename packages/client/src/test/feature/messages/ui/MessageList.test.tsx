import 'cross-fetch/polyfill';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { MessageDto, UserDto } from 'api';
import { faker } from '@faker-js/faker';

import { MessagesUi } from 'feature';

const roomId = faker.string.uuid();
const messageText = 'message-content';

describe('Messages list feature', () => {
  it('should load data and render message list', async () => {
    const { getByText } = render(
      <MockedProvider
        mocks={[
          messagesQueryMock,
          viewerQueryMock,
          messageCreatedSubscriptionMock,
          messageCreatedSubscriptionMock,
        ]}
        addTypename={false}
      >
        <MessagesUi.MessageList roomId={roomId} />
      </MockedProvider>,
    );

    await waitFor(() => {
      const message = getByText(messageText);

      expect(message).toBeTruthy();
    });
  });
});

const messagesQueryMock: MockedResponse<
  { messages: MessageDto[] },
  { roomId: string }
> = {
  request: {
    query: gql`
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
    variables: { roomId },
  },
  result: {
    data: {
      messages: [
        {
          id: '1',
          content: messageText,
          sendTime: new Date(),
          roomId,
          room: {
            id: '111',
            members: [],
          },
          memberId: '123',
          member: {
            id: '123',
            joinDate: new Date(),
            user: {
              id: '11',
              login: 'login',
              lastName: 'lastName',
              firstName: 'firstName',
            },
          },
        },
      ],
    },
  },
};

const viewerQueryMock: MockedResponse<{ viewer: UserDto }> = {
  request: {
    query: gql`
      query Viewer {
        viewer {
          id
          login
          firstName
          lastName
          secondName
          dob
        }
      }
    `,
  },
  result: {
    data: {
      viewer: {
        id: '1',
        login: 'login',
        firstName: 'firstName',
        lastName: 'lastName',
        secondName: 'secondName',
        dob: new Date(),
      },
    },
  },
};

const messageCreatedSubscriptionMock: MockedResponse<
  { messageCreated: MessageDto },
  { roomId: string }
> = {
  request: {
    query: gql`
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
    variables: { roomId },
  },
  result: {
    data: {
      messageCreated: {
        id: '1',
        content: messageText,
        sendTime: new Date(),
        roomId,
        room: {
          id: '111',
          members: [],
        },
        memberId: '123',
        member: {
          id: '123',
          joinDate: new Date(),
          user: {
            id: '11',
            login: 'login',
            lastName: 'lastName',
            firstName: 'firstName',
          },
        },
      },
    },
  },
};
