import 'cross-fetch/polyfill';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { CreateRoomInput, RoomDto, UserDto } from 'api';
import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';

import { UsersUi } from 'feature';

const userId = faker.string.uuid();
const roomId = faker.string.uuid();

describe('Users list feature', () => {
  it('should load data and render user list', async () => {
    const { getByText, getByRole } = render(
      <MockedProvider
        mocks={[usersQueryMock, createRoomMutationMock]}
        addTypename={false}
      >
        <UsersUi.UserList />
      </MockedProvider>,
    );

    await waitFor(async () => {
      const user = getByText('Akkakii | Akkakievich');
      const createRoomButton = getByRole('button');

      expect(user).toBeTruthy();
      expect(createRoomButton).toBeTruthy();

      await userEvent.click(createRoomButton);

      expect(window.location.pathname).toBe(`/rooms/${roomId}`);
    });
  });
});

const usersQueryMock: MockedResponse<{ users: UserDto[] }> = {
  request: {
    query: gql`
      query Users {
        users {
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
      users: [
        {
          id: userId,
          login: faker.internet.userName(),
          lastName: 'Akkakievich',
          firstName: 'Akkakii',
          dob: faker.date.past(),
          secondName: faker.person.middleName(),
        },
      ],
    },
  },
};

const createRoomMutationMock: MockedResponse<
  { createRoom: RoomDto },
  { input: CreateRoomInput }
> = {
  request: {
    query: gql`
      mutation CreateRoom($input: CreateRoomInput!) {
        createRoom(input: $input) {
          id
        }
      }
    `,
    variables: { input: { userIds: [userId] } },
  },
  result: {
    data: {
      createRoom: {
        id: roomId,
        members: [],
        creationDate: null,
        name: null,
      },
    },
  },
};
