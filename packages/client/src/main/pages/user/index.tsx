import { FC } from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'wouter';

import { UsersUi } from '../../features';
import { roomModel } from '../../entities';
import {
  Navbar,
  UiBasePageLayout,
  UiBasePageLayoutAside,
  UiBasePageLayoutContent,
  UiButton,
  UiFlexCentered,
} from '../../shared';

interface IProps {
  params: {
    id?: string;
  };
}

const UserPage: FC<IProps> = ({ params }) => {
  const [, setLocation] = useLocation();

  const userId = params.id;

  const createRoomExecutor = roomModel.useCreateRoomExecutor({
    onSuccess: data => {
      if (data?.createRoom) {
        setLocation(`/rooms/${data.createRoom.id}`);
      }
    },
  });

  const handleCreateRoom = (userId: string): void => {
    createRoomExecutor.execute({ input: { userIds: [userId] } });
  };

  return (
    <UiBasePageLayout
      mobilePriorityPart={userId ? 'content' : 'aside'}
      aside={
        <UiBasePageLayoutAside
          header={<Typography>Here is a user header</Typography>}
          footer={<Navbar selected={userId ? undefined : 'users'} />}
        >
          <UsersUi.UserList userId={userId} />
        </UiBasePageLayoutAside>
      }
      content={
        <UiBasePageLayoutContent header={<Typography>Here is a user header</Typography>}>
          <UiFlexCentered>
            {userId ? (
              <UiButton onClick={() => handleCreateRoom(userId)}>Create a room</UiButton>
            ) : (
              <Typography>Choose a user</Typography>
            )}
          </UiFlexCentered>
        </UiBasePageLayoutContent>
      }
    />
  );
};

/**
 * Users page.
 */
export default UserPage;
