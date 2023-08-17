import { FC, useMemo } from 'react';
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material';

import { formatUserName } from 'shared';
import { IRoom } from '../model';

interface IProps {
  viewerId: string;
  rooms: IRoom[];
  selectedRoomId: string | undefined;
  onRoomSelect: (id: string) => void;
}

/**
 * Renders the rooms as a list.
 */
export const RoomList: FC<IProps> = ({
  selectedRoomId,
  viewerId,
  rooms,
  onRoomSelect,
}) => {
  const { viewerRoom, rest } = useMemo(() => {
    const res: { viewerRoom: IRoom | undefined; rest: IRoom[] } = {
      viewerRoom: undefined,
      rest: [],
    };

    for (const room of rooms) {
      if (room.members.length === 1) {
        res.viewerRoom = room;
      }

      res.rest.push(room);
    }

    return res;
  }, [rooms]);

  return (
    <List>
      <Stack divider={<Divider />}>
        {viewerRoom && (
          <ListItemButton
            onClick={() => onRoomSelect(viewerRoom.id)}
            selected={viewerRoom.id === selectedRoomId}
          >
            <ListItemText primary={viewerRoom.name || 'Saved messages'} />
          </ListItemButton>
        )}

        {rest.map((room) => (
          <ListItemButton
            key={room.id}
            onClick={() => onRoomSelect(room.id)}
            selected={room.id === selectedRoomId}
          >
            <ListItemText
              primary={
                room.name ||
                room.members
                  .filter((member) => member.userId !== viewerId)
                  .map((member) => formatUserName(member))
                  .join(', ')
              }
            />
          </ListItemButton>
        ))}
      </Stack>
    </List>
  );
};
