import { FC } from 'react';
import { formatISO, formatRFC3339, parseISO, startOfDay } from 'date-fns';
import { Box, List, ListItem, ListSubheader } from '@mui/material';
import { css, styled } from '@mui/material/styles';

import { UiDate } from '../date';

import { IUiMessageProps, UiMessage } from './UiMessage';

interface IProps {
  messages: IUiMessageProps[];
}

/**
 * Feature for listing messages.
 */
export const UiMessageList: FC<IProps> = ({ messages }) => {
  const groupedMessages = groupByDate(messages);

  return (
    <>
      {groupedMessages.map((group) => (
        <List
          subheader={
            <SHeader>
              <UiDate date={group[0]} />
            </SHeader>
          }
          key={formatRFC3339(group[0])}
        >
          {group[1].map((message) => (
            <SMessageRow key={message.id} isLeft={!message.isAuthorViewer}>
              <SMessageWrapper
                key={message.id}
                isLeft={!message.isAuthorViewer}
              >
                <UiMessage
                  position={message.isAuthorViewer ? 'right' : 'left'}
                  {...message}
                />
              </SMessageWrapper>
            </SMessageRow>
          ))}
        </List>
      ))}
    </>
  );
};

const SHeader = styled(ListSubheader)(css`
  text-align: center;
`);

const SMessageRow = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'isLeft',
})<{ isLeft: boolean }>(
  ({ isLeft }) => css`
    justify-content: ${isLeft ? 'flex-start' : 'flex-end'};
  `,
);

const SMessageWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isLeft',
})<{ isLeft: boolean }>(
  ({ isLeft }) => css`
    display: flex;
    width: max(40%, 350px);
    justify-content: ${isLeft ? 'flex-start' : 'flex-end'};
  `,
);

function groupByDate(
  messages: IUiMessageProps[],
): Array<[Date, IUiMessageProps[]]> {
  const map: Map<string, IUiMessageProps[]> = new Map();

  for (const message of messages) {
    const messageDay = formatISO(startOfDay(message.time));

    if (map.has(messageDay)) {
      map.get(messageDay)?.push(message);
    } else {
      map.set(messageDay, [message]);
    }
  }

  return [...map.entries()].map((entry) => [parseISO(entry[0]), entry[1]]);
}
