import { FC } from 'react';
import { Box, List, ListItem, ListSubheader } from '@mui/material';
import { formatISO, formatRFC3339, parseISO, startOfDay } from 'date-fns';
import { css, styled } from '@mui/material/styles';

import { MessageDto, formatUserName, UiCirclePending, UiDate, UiFlexCentered } from '../../../shared';

import { Message } from './Message';

interface IProps {
  messages: MessageDto[];
  viewerId: string;
  pending: boolean | undefined;
}

/**
 * @entity Messages listing.
 */
export const MessageList: FC<IProps> = ({ messages, viewerId, pending }) => {
  const groupedMessages = groupByDate(messages);

  if (pending && messages.length === 0) {
    return (
      <UiFlexCentered>
        <UiCirclePending showingDelay={true} />
      </UiFlexCentered>
    );
  }

  if (messages.length === 0) {
    return <UiFlexCentered>There&apos;re no messages yet.</UiFlexCentered>;
  }

  return (
    <>
      {groupedMessages.map((group, index) => (
        <List
          subheader={
            <SHeader>
              <UiDate date={group[0]} />
            </SHeader>
          }
          key={formatRFC3339(group[0])}
        >
          {index === 0 && (
            <Box padding={5}>
              {pending && (
                <UiFlexCentered>
                  <UiCirclePending />
                </UiFlexCentered>
              )}
            </Box>
          )}

          {group[1].map(message => {
            const isAuthorViewer = message.user.id === viewerId;

            return (
              <SMessageRow id={message.id} key={message.id} isLeft={!isAuthorViewer}>
                <SMessageWrapper isLeft={!isAuthorViewer}>
                  <Message
                    position={isAuthorViewer ? 'right' : 'left'}
                    title={isAuthorViewer ? 'You' : formatUserName(message.user)}
                    message={message}
                  />
                </SMessageWrapper>
              </SMessageRow>
            );
          })}
        </List>
      ))}
    </>
  );
};

const SHeader = styled(ListSubheader)`
  text-align: center;
`;

const SMessageRow = styled(ListItem, {
  shouldForwardProp: prop => prop !== 'isLeft',
})<{ isLeft: boolean }>(
  ({ isLeft }) => css`
    justify-content: ${isLeft ? 'flex-start' : 'flex-end'};
  `,
);

const SMessageWrapper = styled('div', {
  shouldForwardProp: prop => prop !== 'isLeft',
})<{ isLeft: boolean }>(
  ({ isLeft }) => css`
    display: flex;
    width: max(40%, 350px);
    justify-content: ${isLeft ? 'flex-start' : 'flex-end'};
  `,
);

/**
 * @param messages
 */
function groupByDate(messages: MessageDto[]): Array<[Date, MessageDto[]]> {
  const map: Map<string, MessageDto[]> = new Map();

  for (const message of messages) {
    const messageDay = formatISO(startOfDay(parseISO(message.sendTime)));

    if (map.has(messageDay)) {
      map.get(messageDay)?.push(message);
    } else {
      map.set(messageDay, [message]);
    }
  }

  return [...map.entries()].map(entry => [parseISO(entry[0]), entry[1]]);
}
