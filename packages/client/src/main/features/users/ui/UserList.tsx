import { FC, Fragment } from 'react';
import styled from 'styled-components';
import { useLocation } from 'wouter';

import { userModel, roomModel } from '../../../entities';

/**
 * Feature for listing users.
 */
export const UserList: FC = () => {
  const [, setLocation] = useLocation();

  const { users, loading } = userModel.useUsers();
  const [createRoom, { loading: createRoomLoading }] =
    roomModel.useCreateRoom();

  if (loading) {
    return <>Loading...</>;
  }

  const handleCreateRoom = async (userId: string): Promise<void> => {
    await createRoom({
      userIds: [userId],
    });
    setLocation('/rooms');
  };

  return (
    <SWrapper>
      {users.map((user, index) => (
        <Fragment key={user.id}>
          <SUserWrapper>
            <span>
              {user.firstName} | {user.lastName}
            </span>

            <button
              type='button'
              disabled={createRoomLoading}
              onClick={() => handleCreateRoom(user.id)}
            >
              Create room
            </button>
          </SUserWrapper>

          {users.length - 1 !== index && <SDelimiter />}
        </Fragment>
      ))}
    </SWrapper>
  );
};

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const SUserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SDelimiter = styled.span`
  height: 2px;
  background-color: black;
`;
