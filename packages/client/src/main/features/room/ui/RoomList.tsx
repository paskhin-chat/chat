import { FC, useState } from 'react';
import { useLocation } from 'wouter';

import { roomModel, RoomUi, viewerModel } from '../../../entities';
import { UiCirclePending, UiFlexCentered, useEffectOnce } from '../../../shared';
import { RoomDto } from '../../../gen/api-types';

interface IProps {
  roomId?: string;
}

/**
 * @feature
 */
export const RoomList: FC<IProps> = ({ roomId }) => {
  const [, setLocation] = useLocation();

  const [rooms, setRooms] = useState<RoomDto[]>([]);

  const roomsExecutor = roomModel.useRoomsExecutor({
    onSuccess: data => {
      if (data?.rooms) {
        setRooms(data.rooms);
      }
    },
  });
  const viewerStore = viewerModel.useViewerStore();

  useEffectOnce(() => {
    roomsExecutor.execute();
  });

  if (roomsExecutor.pending || !viewerStore.state) {
    return (
      <UiFlexCentered>
        <UiCirclePending />
      </UiFlexCentered>
    );
  }

  return (
    <RoomUi.RoomList
      onRoomSelect={id => setLocation(`/rooms/${id}`)}
      rooms={rooms}
      selectedRoomId={roomId}
      viewerId={viewerStore.state.id}
    />
  );
};
