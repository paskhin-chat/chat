import { FC, useRef } from 'react';
import {
  Typography,
  useMediaQuery,
  Theme,
  css,
  styled,
  Stack,
} from '@mui/material';

import { messageModel } from 'entity';
import { MessageUi, RoomsUi } from 'feature';
import { queueMacrotask, UiBasePageLayout, UiFlexCentered } from 'shared';

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
    <UiBasePageLayout
      aside={
        roomListShown ? <RoomsUi.RoomList roomId={params.id} /> : undefined
      }
      asideHeader={<Typography>Here is a room header</Typography>}
      contentHeader={
        <Typography>Here is member&apos;s name or room&apos;s name</Typography>
      }
    >
      {roomContainerShown ? (
        params.id ? (
          <SRoom spacing={1}>
            <SMessageList ref={ref}>
              <MessageUi.MessageList roomId={params.id} ref={refChild} />
            </SMessageList>

            <SMessageForm>
              <MessageUi.CreateMessage roomId={params.id} />
            </SMessageForm>
          </SRoom>
        ) : (
          <UiFlexCentered>
            <Typography>Choose a room</Typography>
          </UiFlexCentered>
        )
      ) : null}
    </UiBasePageLayout>
  );
};

/**
 * Room page.
 */
export default RoomsPage;

const SRoom = styled(Stack)`
  overflow-y: scroll;
  flex-grow: 1;
`;

const SMessageList = styled('div')`
  display: flex;
  overflow-y: scroll;
  flex-grow: 1;
`;

const SMessageForm = styled('div')(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    padding-inline: ${theme.spacing(2)};
    padding-block: ${theme.spacing(1)};
  `,
);
