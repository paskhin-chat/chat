import { faker } from '@faker-js/faker';
import { random, range } from 'lodash';
import { FC, useMemo, useState } from 'react';
import { useValue } from 'react-cosmos/client';

import { RoomUi } from '../../../main/entities';
import { findRandomIndex, getRandomValue, withGlobalStyles } from '../../__utils__';
import { getUserName } from '../../__mock__';
import { RoomDto } from '../../../main/shared';

const getRooms = (count: number): RoomDto[] =>
  range(count).map<RoomDto>(() => ({
    __typename: 'RoomDto',
    id: faker.string.uuid(),
    members: range(random(1, 4)).map(() => ({
      __typename: 'MemberDto',
      joinDate: faker.date.past().toISOString(),
      user: {
        __typename: 'UserDto',
        id: faker.string.uuid(),
        login: faker.internet.userName(),
        ...getUserName(),
      },
      userId: faker.string.uuid(),
      id: faker.string.uuid(),
      ...getUserName(),
    })),
    name: getRandomValue(faker.color.human),
    creationDate: faker.date.past().toISOString(),
  }));

const RoomListFixture: FC = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>();
  const [count] = useValue("room's count", { defaultValue: 25 });

  const rooms = useMemo(() => {
    const result = getRooms(count);

    result[findRandomIndex(result)] = {
      __typename: 'RoomDto',
      name: faker.color.human(),
      id: faker.string.uuid(),
      creationDate: faker.date.past().toISOString(),
      members: [
        {
          __typename: 'MemberDto',
          joinDate: faker.date.past().toISOString(),
          id: faker.string.uuid(),
          user: {
            __typename: 'UserDto',
            id: faker.string.uuid(),
            login: faker.internet.userName(),
            ...getUserName(),
          },
          ...getUserName(),
        },
      ],
    };

    return result;
  }, [count]);

  return (
    <RoomUi.RoomList
      rooms={rooms}
      selectedRoomId={selectedRoomId}
      onRoomSelect={setSelectedRoomId}
      viewerId={faker.string.uuid()}
    />
  );
};

export default withGlobalStyles(RoomListFixture);
