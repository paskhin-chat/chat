import 'cross-fetch/polyfill';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { MessageDto, UserDto } from 'api';
import { faker } from '@faker-js/faker';
import { render, waitFor } from '@testing-library/react';

import { MessageUi } from 'feature';

const roomId = faker.string.uuid();
const messageText = faker.word.words();

describe('Messages list feature', () => {
  it('should load data and render message list', async () => {
    const { getAllByText } = render(
      <MockedProvider
        mocks={[
          messagesQueryMock,
          viewerQueryMock,
          messageCreatedSubscriptionMock,
        ]}
        addTypename={false}
      >
        <MessageUi.MessageList roomId={roomId} />
      </MockedProvider>,
    );

    await waitFor(() => {
      const messages = getAllByText(messageText);

      expect(messages).toBeTruthy();
      expect(messages.length).toBe(2);
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
          id: faker.string.uuid(),
          content: messageText,
          sendTime: faker.date.past(),
          roomId,
          room: {
            id: faker.string.uuid(),
            members: [],
          },
          memberId: faker.string.uuid(),
          member: {
            id: faker.string.uuid(),
            joinDate: faker.date.past(),
            user: {
              id: faker.string.uuid(),
              login: faker.internet.userName(),
              lastName: faker.person.lastName(),
              firstName: faker.person.firstName(),
              secondName: faker.person.middleName(),
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
        id: faker.string.uuid(),
        login: faker.internet.userName(),
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        secondName: faker.person.middleName(),
        dob: faker.date.past(),
      },
    },
  },
};

const messageCreatedSubscriptionMock: MockedResponse<{
  messageCreated: MessageDto;
}> = {
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
    variables: {},
  },
  result: {
    data: {
      messageCreated: {
        id: faker.string.uuid(),
        content: messageText,
        sendTime: faker.date.past(),
        roomId,
        room: {
          id: faker.string.uuid(),
          members: [],
        },
        memberId: faker.string.uuid(),
        member: {
          id: faker.string.uuid(),
          joinDate: faker.date.past(),
          user: {
            id: faker.string.uuid(),
            login: faker.internet.userName(),
            lastName: faker.person.lastName(),
            firstName: faker.person.firstName(),
            secondName: faker.person.middleName(),
          },
        },
      },
    },
  },
};
