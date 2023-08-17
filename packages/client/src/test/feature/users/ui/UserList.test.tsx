import 'cross-fetch/polyfill';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { UserDto } from 'api';
import { faker } from '@faker-js/faker';

import { UsersUi } from 'feature';

const userId = faker.string.uuid();

describe('Users list feature', () => {
  it('should load data and render user list', async () => {
    const { getByText } = render(
      <MockedProvider mocks={[usersQueryMock]} addTypename={false}>
        <UsersUi.UserList />
      </MockedProvider>,
    );

    await waitFor(() => {
      const user = getByText('Akkakii Akkakievich');

      expect(user).toBeTruthy();
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
          secondName: null,
        },
      ],
    },
  },
};
