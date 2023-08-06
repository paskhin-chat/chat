import { FC, useRef } from 'react';
import { css, styled } from '@mui/material/styles';
import { Typography, useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles/createTheme';

import { messageModel } from 'entity';
import { MessagesUi, MessageUi, RoomsUi } from 'feature';
import { queueMacrotask } from 'shared';

interface IProps {
  params: {
    id?: string;
  };
}

const RoomsPage: FC<IProps> = ({ params }) => {
  const ref = useRef<HTMLDivElement>(null);
  const refChild = useRef<HTMLDivElement>(null);
  const smUpper = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));

  messageModel.useMessagesExecutor({
    variables: {
      roomId: params.id || '',
    },
    onCompleted: () => {
      queueMacrotask(() => {
        ref.current?.scrollBy({
          top: refChild.current?.scrollHeight || 0,
        });
      });
    },
    shouldSubscribe: false,
  });

  const roomListShown = smUpper || !params.id;
  const roomContainerShown = smUpper || !!params.id;

  return (
    <SContent>
      {roomListShown && (
        <SRoomListAside fullWidth={!smUpper}>
          <SRoomListHeader>
            <Typography>Here is a room header</Typography>
          </SRoomListHeader>

          <SRoomList>
            <RoomsUi.RoomList roomId={params.id} />
          </SRoomList>
        </SRoomListAside>
      )}

      {roomContainerShown && (
        <SRoom>
          {params.id ? (
            <>
              <SRoomHeader>
                <Typography>
                  Here is member&apos;s name or room&apos;s name
                </Typography>
              </SRoomHeader>

              <SMessageList ref={ref}>
                <MessagesUi.MessageList roomId={params.id} ref={refChild} />
              </SMessageList>

              <SMessageForm>
                <MessageUi.MessageForm roomId={params.id} />
              </SMessageForm>
            </>
          ) : (
            <Typography>Choose a room</Typography>
          )}
        </SRoom>
      )}
    </SContent>
  );
};

/**
 * Room page.
 */
export default RoomsPage;

const SContent = styled('main')`
  display: flex;
  overflow-y: scroll;
  height: 100dvh;
`;

const SRoomListHeader = styled('header')(
  ({ theme }) => css`
    border-bottom: ${theme.palette.divider} 1px solid;
    display: flex;
    align-items: center;
    padding-inline: ${theme.spacing(2)};
  `,
);

const SRoomListAside = styled('aside', {
  shouldForwardProp: (prop) => prop !== 'fullWidth',
})<{ fullWidth: boolean }>(
  ({ fullWidth, theme }) => css`
    display: grid;
    grid-template-rows: ${theme.spacing(6)} auto;
    grid-template-columns: 1fr;
    width: ${fullWidth ? '100%' : 'max(35%, 400px)'};
    border-right: ${theme.palette.divider} 1px solid;
  `,
);

const SRoomList = styled('div')`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const SRoom = styled('div')(
  ({ theme }) => css`
    display: grid;
    grid-template-rows: ${theme.spacing(6)} auto min-content;
    grid-template-columns: 1fr;
    flex-grow: 1;
    row-gap: ${theme.spacing(1)};
    width: 100%;
  `,
);

const SRoomHeader = styled('header')(
  ({ theme }) => css`
    border-bottom: ${theme.palette.divider} 1px solid;
    display: flex;
    align-items: center;
    padding-inline: ${theme.spacing(2)};
  `,
);

const SMessageList = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const SMessageForm = styled('div')(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    padding-inline: ${theme.spacing(2)};
    padding-block: ${theme.spacing(1)};
  `,
);
