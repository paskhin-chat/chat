import { faker } from '@faker-js/faker';
import { random, range } from 'lodash';
import { FC, useMemo, useState } from 'react';
import { useValue } from 'react-cosmos/client';

import { roomModel, RoomUi } from 'entity';
import {
  findRandomIndex,
  getRandomValue,
  withGlobalStyles,
} from '../../__utils__';
import { getUserName } from '../../__mock__';

const getRooms = (count: number): roomModel.IRoom[] =>
  range(count).map<roomModel.IRoom>(() => ({
    id: faker.string.uuid(),
    members: range(random(1, 4)).map(() => ({
      userId: faker.string.uuid(),
      id: faker.string.uuid(),
      ...getUserName(),
    })),
    name: getRandomValue(faker.color.human),
    creationDate: faker.date.past(),
  }));

const RoomListFixture: FC = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>();
  const [count] = useValue("room's count", { defaultValue: 25 });

  const rooms = useMemo(() => {
    const result = getRooms(count);

    result[findRandomIndex(result)] = {
      name: faker.color.human(),
      id: faker.string.uuid(),
      creationDate: faker.date.past(),
      members: [
        {
          id: faker.string.uuid(),
          userId: faker.string.uuid(),
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
