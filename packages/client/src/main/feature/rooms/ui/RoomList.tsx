import { FC, Fragment } from 'react';
import styled from 'styled-components';
import { useLocation } from 'wouter';

import { roomModel, viewerModel } from 'entity';

/**
 * Feature for listing rooms.
 */
export const RoomList: FC = () => {
  const [, setLocation] = useLocation();

  const { rooms, loading } = roomModel.useRooms();
  const { viewer, loading: viewerLoading } = viewerModel.useViewer();

  if (loading || viewerLoading) {
    return <>Loading...</>;
  }

  return (
    <SWrapper>
      {rooms.map((room, index) => (
        <Fragment key={room.id}>
          <SRoomWrapper onClick={() => setLocation(`/rooms/${room.id}`)}>
            {room.members.length === 1 ? (
              <span>Saved messages by {room.members[0]!.firstName}</span>
            ) : (
              room.members
                .filter((member) => member.userId !== viewer?.id)
                .map((member) => (
                  <span key={member.id}>
                    {member.firstName} {member.lastName}
                  </span>
                ))
            )}
          </SRoomWrapper>

          {rooms.length - 1 !== index && <SDelimiter />}
        </Fragment>
      ))}
    </SWrapper>
  );
};

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 16px 12px;
  width: 100%;
`;

const SRoomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const SDelimiter = styled.span`
  height: 2px;
  background-color: black;
  flex-shrink: 0;
`;
