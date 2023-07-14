import { FC } from 'react';
import styled from 'styled-components';

import { viewerModel } from 'entity';
import { MessageUi, RoomsUi, MessagesUi } from 'feature';

interface IProps {
  params: {
    id?: string;
  };
}

const RoomsPage: FC<IProps> = ({ params }) => {
  const viewerExecutor = viewerModel.useViewerExecutor();
  const logoutExecutor = viewerModel.useLogoutExecutor();

  const viewer = viewerExecutor.response;

  const handleLogout = (): void => {
    logoutExecutor.execute();
  };

  return (
    <SWrapper>
      <SHeader>
        Header
        <span>
          Hi, {viewer?.firstName} {viewer?.lastName}!
        </span>
        <button type='button' onClick={handleLogout}>
          logout
        </button>
      </SHeader>

      <SContent>
        <SRoomList>
          <RoomsUi.RoomList />
        </SRoomList>

        <SRoom>
          {params.id ? (
            <>
              <SMessageList>
                <MessagesUi.MessageList roomId={params.id} />
              </SMessageList>

              <SMessageForm>
                <MessageUi.MessageForm roomId={params.id} />
              </SMessageForm>
            </>
          ) : (
            'Choose a room'
          )}
        </SRoom>
      </SContent>
    </SWrapper>
  );
};

/**
 * Room page.
 */
export default RoomsPage;

const SWrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 1fr;
  height: 100vh;
`;

const SHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 4px;
  padding-inline: 10px;
  background-color: gray;
`;

const SContent = styled.div`
  display: flex;
  overflow-y: scroll;
`;

const SRoomList = styled.aside`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 25%;
  overflow-y: scroll;
  background-color: #4d4d4d;
`;

const SRoom = styled.div`
  display: grid;
  grid-template-rows: auto min-content;
  grid-template-columns: 1fr;
  padding: 12px 8px 24px;
  flex-grow: 1;
  row-gap: 12px;
`;

const SMessageList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const SMessageForm = styled.div``;
