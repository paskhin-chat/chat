import { FC, Fragment } from 'react';
import { useLocation } from 'wouter';
import { Divider, List, ListItemButton, ListItemText } from '@mui/material';

import { roomModel, viewerModel } from 'entity';
import { formatUserName } from 'shared';

interface IProps {
  roomId?: string;
}

/**
 * Feature for listing rooms.
 */
export const RoomList: FC<IProps> = ({ roomId }) => {
  const [, setLocation] = useLocation();

  const roomsExecutor = roomModel.useRoomsExecutor();
  const viewerExecutor = viewerModel.useViewerExecutor();

  const rooms = roomsExecutor.response;

  if (roomsExecutor.loading || viewerExecutor.loading) {
    return <>Loading...</>;
  }

  return (
    <List>
      {rooms?.map((room, index) => (
        <Fragment key={room.id}>
          <ListItemButton
            onClick={() => setLocation(`/rooms/${room.id}`)}
            selected={room.id === roomId}
          >
            {room.members.length === 1 ? (
              <ListItemText primary='Saved messages' />
            ) : (
              room.members
                .filter(
                  (member) => member.userId !== viewerExecutor.response?.id,
                )
                .map((member) => (
                  <ListItemText
                    primary={formatUserName(member)}
                    key={member.id}
                  />
                ))
            )}
          </ListItemButton>

          {rooms.length - 1 !== index && <Divider />}
        </Fragment>
      ))}
    </List>
  );
};
