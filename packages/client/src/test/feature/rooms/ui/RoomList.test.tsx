import 'cross-fetch/polyfill';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { RoomDto, UserDto } from 'api';
import { faker } from '@faker-js/faker';

import { RoomsUi } from 'feature';

const roomId = faker.string.uuid();
const viewerId = faker.string.uuid();
const roomName = 'Лаврентий Палыч, Akkakii Akkakievich';

describe('Rooms list feature', () => {
  it('should load data and render room list', async () => {
    const { getByText } = render(
      <MockedProvider
        mocks={[viewerQueryMock, roomsQueryMock]}
        addTypename={false}
      >
        <RoomsUi.RoomList />
      </MockedProvider>,
    );

    await waitFor(() => {
      const room = getByText(roomName);

      expect(room).toBeTruthy();
    });
  });
});

const roomsQueryMock: MockedResponse<{ rooms: RoomDto[] }> = {
  request: {
    query: gql`
      query Rooms {
        rooms {
          id
          name
          creationDate
          members {
            id
            joinDate
            user {
              id
              firstName
              lastName
            }
          }
        }
      }
    `,
  },
  result: {
    data: {
      rooms: [
        {
          id: roomId,
          name: null,
          creationDate: null,
          members: [
            {
              id: viewerId,
              joinDate: faker.date.past(),
              user: {
                id: faker.string.uuid(),
                login: faker.internet.userName(),
                lastName: 'Палыч',
                firstName: 'Лаврентий',
                secondName: faker.person.middleName(),
                dob: faker.date.past(),
              },
            },
            {
              id: faker.string.uuid(),
              joinDate: faker.date.past(),
              user: {
                id: faker.string.uuid(),
                login: faker.internet.userName(),
                lastName: 'Akkakievich',
                firstName: 'Akkakii',
                secondName: faker.person.middleName(),
                dob: faker.date.past(),
              },
            },
          ],
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
        id: viewerId,
        login: faker.internet.userName(),
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        secondName: faker.person.middleName(),
        dob: faker.date.past(),
      },
    },
  },
};
