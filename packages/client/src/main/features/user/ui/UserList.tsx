import { FC, useState } from 'react';
import { useLocation } from 'wouter';

import { userModel, UserUi } from '../../../entities';
import { UiCirclePending, UiFlexCentered, useEffectOnce } from '../../../shared';
import { UserDto } from '../../../gen/api-types';

interface IProps {
  userId?: string;
}

/**
 * @feature
 */
export const UserList: FC<IProps> = ({ userId }) => {
  const [, setLocation] = useLocation();

  const [users, setUsers] = useState<UserDto[]>([]);

  const userModelExecutor = userModel.useUsersExecutor({
    onSuccess: data => {
      if (data?.users) {
        setUsers(data.users);
      }
    },
  });

  useEffectOnce(() => {
    userModelExecutor.execute();
  });

  if (userModelExecutor.pending) {
    return (
      <UiFlexCentered>
        <UiCirclePending />
      </UiFlexCentered>
    );
  }

  return <UserUi.UserList users={users} selectedUserId={userId} onUserSelect={id => setLocation(`/users/${id}`)} />;
};
