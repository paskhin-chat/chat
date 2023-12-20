import { FC, useMemo } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { RoomDto } from "../../../gen/api-types";
import { formatUserName } from "../../../shared";

interface IProps {
  viewerId: string;
  rooms: RoomDto[];
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
    const res: { viewerRoom: RoomDto | undefined; rest: RoomDto[] } = {
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
            <ListItemText primary={viewerRoom.name || "Saved messages"} />
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
                  .filter((member) => member.user.id !== viewerId)
                  .map((member) => formatUserName(member.user))
                  .join(", ")
              }
            />
          </ListItemButton>
        ))}
      </Stack>
    </List>
  );
};
