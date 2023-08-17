import { FC } from 'react';
import { useLocation } from 'wouter';

import { roomModel, RoomUi, viewerModel } from 'entity';
import { UiCirclePending, UiFlexCentered } from 'shared';

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
  const viewerId = viewerExecutor.response?.id;

  if (roomsExecutor.loading || viewerExecutor.loading) {
    return (
      <UiFlexCentered>
        <UiCirclePending />
      </UiFlexCentered>
    );
  }

  return (
    <RoomUi.RoomList
      onRoomSelect={(id) => setLocation(`/rooms/${id}`)}
      rooms={rooms || []}
      selectedRoomId={roomId}
      viewerId={viewerId!}
    />
  );
};
