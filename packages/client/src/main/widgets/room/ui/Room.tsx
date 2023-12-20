import { FC, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';

import {
  IntersectionSpy,
  IUiControlledScrollContainerRefHandler,
  UiBasePageLayoutContent,
  UiCirclePending,
  UiControlledScrollContainer,
  UiFlexCentered,
} from '../../../shared';
import { messageModel, MessageUi, viewerModel } from '../../../entities';
import { MessageUi as MessageFeatureUi } from '../../../features';
import { useMessageCreatedSubscription } from '../../../entities/message/model';

interface IProps {
  roomId: string | undefined;
}

/**
 * @widget
 */
export const Room: FC<IProps> = ({ roomId }) => {
  const scrollHandlerRef = useRef<IUiControlledScrollContainerRefHandler>(null);

  // TODO: maybe I don't need to use this store, because I can use simple useState
  const messagesStore = messageModel.useMessagesStore();
  const messagesExecutor = messageModel.useMessagesExecutor({
    onSuccess: data => {
      messagesStore.prepend(data?.messages || []);
      scrollHandlerRef.current?.needsToRestoreScrollPosition();
    },
  });
  const viewerId = viewerModel.useViewerStore().state?.id;

  useMessageCreatedSubscription({
    onSuccess: data => {
      if (data.messageCreated.roomId !== roomId || data.messageCreated.user.id === viewerId) {
        return;
      }

      messagesStore.append(data.messageCreated);
      scrollHandlerRef.current?.needsToScrollToBottom();
    },
  });

  useEffect(() => {
    messagesStore.reset();
    if (roomId) {
      messagesExecutor.execute({ roomId });
    }
    // TODO: make a refactoring of executors for escaping this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesStore, roomId]);

  const handleLoadMore = (): void => {
    if (roomId) {
      messagesExecutor.execute({ roomId, cursor: messagesStore.state[0]?.id });
    }
  };

  const handleMessageSent = (): void => {
    scrollHandlerRef.current?.needsToScrollToBottom();
  };

  if (!viewerId || !roomId) {
    return (
      <UiBasePageLayoutContent header={<Typography>Chat room messages</Typography>}>
        <UiFlexCentered>{roomId ? <UiCirclePending /> : <Typography>Choose a room</Typography>}</UiFlexCentered>
      </UiBasePageLayoutContent>
    );
  }

  return (
    <UiBasePageLayoutContent
      header={<Typography>Chat room messages</Typography>}
      footer={<MessageFeatureUi.CreateMessage roomId={roomId} onSubmitted={handleMessageSent} />}
    >
      <UiControlledScrollContainer
        refHandler={scrollHandlerRef}
        sx={{ display: messagesStore.state.length === 0 ? 'flex' : 'block' }}
      >
        <IntersectionSpy target={<div />} onIntersect={handleLoadMore}>
          <MessageUi.MessageList
            messages={messagesStore.state}
            viewerId={viewerId}
            pending={messagesExecutor.pending}
          />
        </IntersectionSpy>
      </UiControlledScrollContainer>
    </UiBasePageLayoutContent>
  );
};
