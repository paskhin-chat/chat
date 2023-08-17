import 'cross-fetch/polyfill';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import { CreateMessageInput, MessageDto } from 'api';

import { MessageUi } from 'feature';

const roomId = faker.string.uuid();
const content = faker.word.words();

describe('Message form feature', () => {
  it('should render message form and create a message', async () => {
    const { getByRole } = render(
      <MockedProvider mocks={[createMessageMutationMock]} addTypename={false}>
        <MessageUi.CreateMessage roomId={roomId} />
      </MockedProvider>,
    );

    const form = getByRole('form') as HTMLFormElement;
    const messageContentInput = getByRole('textbox') as HTMLInputElement;
    const submitButton = getByRole('button');

    expect(form).toBeTruthy();
    expect(messageContentInput).toBeTruthy();
    expect(submitButton).toBeTruthy();

    await waitFor(async () => {
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
        id: faker.string.uuid(),
        content,
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
