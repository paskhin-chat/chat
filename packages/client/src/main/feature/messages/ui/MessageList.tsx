import { FC } from 'react';
import styled from 'styled-components';

import { messageModel, viewerModel } from 'entity';

interface IProps {
  roomId: string;
}

/**
 * Feature for listing messages.
 */
export const MessageList: FC<IProps> = ({ roomId }) => {
  const { messages, loading } = messageModel.useMessages(roomId);
  const { viewer, loading: viewerLoading } = viewerModel.useViewer();

  // useS(roomId);

  if (loading || viewerLoading) {
    return <>Loading...</>;
  }

  if (messages.length === 0) {
    return <SEmptyWrapper>There&apos;re no messages yet.</SEmptyWrapper>;
  }

  return (
    <SWrapper>
      {messages.map((message) => (
        <SMessageWrapper key={message.id}>
          <SMessageContent>{message.content}</SMessageContent>

          <SMessageMember>
            {viewer?.id === message.member.userId
              ? 'You'
              : message.member.firstName}
          </SMessageMember>
        </SMessageWrapper>
      ))}
    </SWrapper>
  );
};

const SEmptyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  row-gap: 8px;
  width: 100%;
  padding: 0 12px;
`;

const SMessageWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-end;
  background-color: gray;
  padding: 5px;

  &:after {
    content: '';
    position: absolute;
    right: -10px;
    top: 0;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: gray;
    border-left-color: gray;
  }
`;

const SMessageContent = styled.div``;

const SMessageMember = styled.span`
  margin-top: 0.15rem;
  font-size: 0.85rem;
`;
