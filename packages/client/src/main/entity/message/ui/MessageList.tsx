import { forwardRef } from 'react';
import { List, ListItem, ListSubheader } from '@mui/material';
import { formatISO, formatRFC3339, parseISO, startOfDay } from 'date-fns';
import { css, styled } from '@mui/material/styles';

import { formatUserName, UiDate, UiFlexCentered } from 'shared';
import { IMessage } from '../model';

import { Message } from './Message';

interface IProps {
  messages: IMessage[];
  viewerId: string;
}

/**
 * Messages listing.
 */
export const MessageList = forwardRef<HTMLDivElement, IProps>(
  ({ messages, viewerId }, ref) => {
    const groupedMessages = groupByDate(messages);

    if (messages.length === 0) {
      return <UiFlexCentered>There&apos;re no messages yet.</UiFlexCentered>;
    }

    return (
      <div ref={ref}>
        {groupedMessages.map((group) => (
          <List
            subheader={
              <SHeader>
                <UiDate date={group[0]} />
              </SHeader>
            }
            key={formatRFC3339(group[0])}
          >
            {group[1].map((message) => {
              const isAuthorViewer = message.member.userId === viewerId;

              return (
                <SMessageRow key={message.id} isLeft={!isAuthorViewer}>
                  <SMessageWrapper isLeft={!isAuthorViewer}>
                    <Message
                      position={isAuthorViewer ? 'right' : 'left'}
                      title={
                        isAuthorViewer ? 'You' : formatUserName(message.member)
                      }
                      message={message}
                    />
                  </SMessageWrapper>
                </SMessageRow>
              );
            })}
          </List>
        ))}
      </div>
    );
  },
);

const SHeader = styled(ListSubheader)`
  text-align: center;
`;

const SMessageRow = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'isLeft',
})<{ isLeft: boolean }>(
  ({ isLeft }) => css`
    justify-content: ${isLeft ? 'flex-start' : 'flex-end'};
  `,
);

const SMessageWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isLeft',
})<{ isLeft: boolean }>(
  ({ isLeft }) => css`
    display: flex;
    width: max(40%, 350px);
    justify-content: ${isLeft ? 'flex-start' : 'flex-end'};
  `,
);

function groupByDate(messages: IMessage[]): Array<[Date, IMessage[]]> {
  const map: Map<string, IMessage[]> = new Map();

  for (const message of messages) {
    const messageDay = formatISO(startOfDay(message.sendTime));

    if (map.has(messageDay)) {
      map.get(messageDay)?.push(message);
    } else {
      map.set(messageDay, [message]);
    }
  }

  return [...map.entries()].map((entry) => [parseISO(entry[0]), entry[1]]);
}
