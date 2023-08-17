import { forwardRef, JSX } from 'react';

import { messageModel, MessageUi, viewerModel } from 'entity';
import { UiCirclePending, UiFlexCentered } from 'shared';

interface IProps {
  roomId: string;
}

/**
 * Feature for listing messages.
 */
export const MessageList = forwardRef<HTMLDivElement, IProps>(
  ({ roomId }, ref): JSX.Element => {
    const messagesExecutor = messageModel.useMessagesExecutor({
      variables: { roomId },
    });
    const viewerExecutor = viewerModel.useViewerExecutor();

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
      <MessageUi.MessageList
        ref={ref}
        messages={messages!}
        viewerId={viewer!.id}
      />
    );
  },
);
