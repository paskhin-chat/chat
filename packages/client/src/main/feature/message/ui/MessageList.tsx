import { FC, useRef } from 'react';
import { Box } from '@mui/material';

import { messageModel, MessageUi, viewerModel } from 'entity';
import { UiCirclePending, UiFlexCentered } from 'shared';

interface IProps {
  roomId: string;
}

/**
 * Feature for listing messages.
 */
export const MessageList: FC<IProps> = ({ roomId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const refChild = useRef<HTMLDivElement>(null);

  const viewerExecutor = viewerModel.useViewerExecutor();
  const messagesExecutor = messageModel.useMessagesExecutor({
    variables: { roomId },
    initialFetchPolicy: 'network-only',
    onCompleted: () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      ref.current?.scrollBy?.({
        top: refChild.current?.scrollHeight || 0,
      });
    },
  });

  const messages = messagesExecutor.response;
  const viewer = viewerExecutor.response;

  if (messagesExecutor.loading || viewerExecutor.loading) {
    return (
      <UiFlexCentered>
        <UiCirclePending />
      </UiFlexCentered>
    );
  }

  return (
    <Box sx={{ overflowY: 'scroll' }} ref={ref}>
      <Box ref={refChild}>
        <MessageUi.MessageList messages={messages!} viewerId={viewer!.id} />
      </Box>
    </Box>
  );
};
