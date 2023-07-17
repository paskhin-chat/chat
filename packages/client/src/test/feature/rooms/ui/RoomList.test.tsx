import 'cross-fetch/polyfill';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { RoomDto, UserDto } from 'api';
import { faker } from '@faker-js/faker';

import { RoomsUi } from 'feature';

const roomId = faker.string.uuid();
const viewerId = faker.string.uuid();
const roomName = '2First 2Last';

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
          name: 'Room name',
          creationDate: null,
          members: [
            {
              id: viewerId,
              joinDate: new Date(),
              user: {
                id: faker.string.uuid(),
                login: 'login',
                lastName: '1Last',
                firstName: '1First',
                secondName: '',
                dob: new Date(),
              },
            },
            {
              id: faker.string.uuid(),
              joinDate: new Date(),
              user: {
                id: faker.string.uuid(),
                login: 'login',
                lastName: '2Last',
                firstName: '2First',
                secondName: '',
                dob: new Date(),
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
        login: 'login',
        firstName: 'firstName',
        lastName: 'lastName',
        secondName: 'secondName',
        dob: new Date(),
      },
    },
  },
};
