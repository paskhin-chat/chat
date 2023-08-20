import { FC } from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'wouter';

import { UsersUi } from 'feature';
import { roomModel } from 'entity';
import { Navbar, UiBasePageLayout, UiButton, UiFlexCentered } from 'shared';

interface IProps {
  params: {
    id?: string;
  };
}

const UsersPage: FC<IProps> = ({ params }) => {
  const [, setLocation] = useLocation();

  const createRoomExecutor = roomModel.useCreateRoomExecutor({
    onCompleted: (data) => {
      setLocation(`/rooms/${data.id}`);
    },
  });

  const handleCreateRoom = (userId: string): void => {
    createRoomExecutor.execute({ userIds: [userId] });
  };

  return (
    <UiBasePageLayout
      aside={<UsersUi.UserList userId={params.id} />}
      asideHeader={<Typography>Here is a user header</Typography>}
      asideFooter={<Navbar selected={params.id ? undefined : 'users'} />}
      contentHeader={<Typography>Here is a user header</Typography>}
    >
      <UiFlexCentered>
        {params.id ? (
          <UiButton onClick={() => handleCreateRoom(params.id!)}>
            Create a room
          </UiButton>
        ) : (
          <Typography>Choose a user</Typography>
        )}
      </UiFlexCentered>
    </UiBasePageLayout>
  );
};

/**
 * Users page.
 */
export default UsersPage;
