import { FC, useEffect, useState } from "react";
import { useLocation } from "wouter";

import { userModel, UserUi } from "../../../entities";
import { UiCirclePending, UiFlexCentered } from "../../../shared";
import { UserDto } from "../../../gen/api-types";

interface IProps {
  userId?: string;
}

/**
 * Feature for listing users.
 */
export const UserList: FC<IProps> = ({ userId }) => {
  const [, setLocation] = useLocation();

  const [users, setUsers] = useState<UserDto[]>([]);

  const userModelExecutor = userModel.useUsersExecutor({
    onSuccess: (data) => {
      if (data?.users) {
        setUsers(data.users);
      }
    },
  });

  useEffect(() => {
    userModelExecutor.execute();
  }, []);

  if (userModelExecutor.pending) {
    return (
      <UiFlexCentered>
        <UiCirclePending />
      </UiFlexCentered>
    );
  }

  return (
    <UserUi.UserList
      users={users}
      selectedUserId={userId}
      onUserSelect={(id) => setLocation(`/users/${id}`)}
    />
  );
};
