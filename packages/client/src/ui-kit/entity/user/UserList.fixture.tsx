import { faker } from '@faker-js/faker';
import { range } from 'lodash';
import { FC, useMemo, useState } from 'react';
import { useValue } from 'react-cosmos/client';
import { UniqueEnforcer } from 'enforce-unique';

import { UserUi } from '../../../main/entities';
import { withGlobalStyles } from '../../__utils__';
import { getUserName } from '../../__mock__';
import { UserDto } from '../../../main/gen/api-types';

const unq = new UniqueEnforcer();

const getUsers = (count: number): UserDto[] =>
  range(count).map<UserDto>(() => ({
    __typename: 'UserDto',
    ...getUserName(),
    id: faker.string.uuid(),
    dob: faker.date.past().toISOString(),
    login: unq.enforce(faker.internet.userName),
  }));

const RoomListFixture: FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string>();
  const [count] = useValue("user's count", { defaultValue: 25 });

  const users = useMemo(() => getUsers(count), [count]);

  return <UserUi.UserList users={users} onUserSelect={setSelectedUserId} selectedUserId={selectedUserId} />;
};

export default withGlobalStyles(RoomListFixture);
