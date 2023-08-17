import { FC } from 'react';
import { useLocation } from 'wouter';

import { userModel, UserUi } from 'entity';
import { UiCirclePending, UiFlexCentered } from 'shared';

interface IProps {
  userId?: string;
}

/**
 * Feature for listing users.
 */
export const UserList: FC<IProps> = ({ userId }) => {
  const [, setLocation] = useLocation();

  const usersExecutor = userModel.useUsersExecutor();

  const users = usersExecutor.response;

  if (usersExecutor.loading) {
    return (
      <UiFlexCentered>
        <UiCirclePending />
      </UiFlexCentered>
    );
  }

  return (
    <UserUi.UserList
      users={users || []}
      selectedUserId={userId}
      onUserSelect={() => setLocation(`/users/${userId}`)}
    />
  );
};
