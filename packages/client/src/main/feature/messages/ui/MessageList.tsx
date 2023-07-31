import { forwardRef } from 'react';
import styled from 'styled-components';

import { UiMessageList, formatUserName } from 'shared';
import { messageModel, viewerModel } from 'entity';

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

    if (messagesExecutor.loading || viewerExecutor.loading) {
      return <>Loading...</>;
    }

    if (messages?.length === 0) {
      return <SEmptyWrapper>There&apos;re no messages yet.</SEmptyWrapper>;
    }

    return (
      <SWrapper ref={ref}>
        <UiMessageList
          messages={
            messages?.map((message) => ({
              time: message.sendTime,
              author: formatUserName(message.member),
              content: message.content,
              position:
                viewerExecutor.response?.id === message.member.userId
                  ? 'right'
                  : 'left',
              isAuthorViewer:
                viewerExecutor.response?.id === message.member.userId,
            })) || []
          }
        />
      </SWrapper>
    );
  },
);

const SEmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  width: 100%;
  padding: 0 12px;
`;
