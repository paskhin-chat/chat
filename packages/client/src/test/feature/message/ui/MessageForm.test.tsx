import 'cross-fetch/polyfill';
import { act, render } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import { CreateMessageInput, MessageDto } from 'api';

import { MessageUi } from 'feature';

const roomId = faker.string.uuid();
const content = 'message-content';

describe('Message form feature', () => {
  it('should render message form and create a message', async () => {
    const { getByRole } = render(
      <MockedProvider mocks={[createMessageMutationMock]} addTypename={false}>
        <MessageUi.MessageForm roomId={roomId} />
      </MockedProvider>,
    );

    const form = getByRole('form') as HTMLFormElement;
    const messageContentInput = getByRole('textbox') as HTMLInputElement;
    const submitButton = getByRole('button');

    expect(form).toBeTruthy();
    expect(messageContentInput).toBeTruthy();
    expect(submitButton).toBeTruthy();

    await act(async () => {
      await userEvent.click(messageContentInput);
      await userEvent.keyboard(content);

      expect(messageContentInput.value).toBe(content);

      await userEvent.click(submitButton);
    });
  });
});

const createMessageMutationMock: MockedResponse<
  { createMessage: MessageDto },
  { input: CreateMessageInput }
> = {
  request: {
    query: gql`
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
    variables: { input: { roomId, content } },
  },
  result: {
    data: {
      createMessage: {
        id: '1',
        content,
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
