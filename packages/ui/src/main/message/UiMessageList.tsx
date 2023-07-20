import { FC } from 'react';
import styled, { css } from 'styled-components';
import { formatISO, formatRFC3339, parseISO, startOfDay } from 'date-fns';

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
    <SWrapper>
      {groupedMessages.map((group) => (
        <SGroup key={formatRFC3339(group[0])}>
          <SGroupTitle>
            <UiDate date={group[0]} />
          </SGroupTitle>

          <SMessagesWrapper>
            {group[1].map((message, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <SMessageWrapper key={index} $isLeft={!message.isAuthorViewer}>
                <UiMessage
                  position={message.isAuthorViewer ? 'right' : 'left'}
                  {...message}
                />
              </SMessageWrapper>
            ))}
          </SMessagesWrapper>
        </SGroup>
      ))}
    </SWrapper>
  );
};

const SWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  row-gap: 8px;
`;

const SGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SGroupTitle = styled.h4`
  margin-block: 1rem;
`;

const SMessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
`;

const SMessageWrapper = styled.div<{ $isLeft: boolean }>(
  (props) => css`
    display: flex;
    justify-content: ${props.$isLeft ? 'flex-start' : 'flex-end'};
    align-self: ${props.$isLeft ? 'flex-start' : 'flex-end'};
    width: 35%;
    min-width: 150px;
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
