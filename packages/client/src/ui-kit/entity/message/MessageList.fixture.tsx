import { faker } from '@faker-js/faker';
import { range } from 'lodash';
import { add, compareAsc } from 'date-fns';
import { FC, useMemo } from 'react';
import { useValue } from 'react-cosmos/client';

import { messageModel, MessageUi } from 'entity';
import { findRandomElement, withGlobalStyles } from '../../__utils__';
import { getMessageContent, getUserName } from '../../__mock__';

const getMessages = (
  count: number,
  members: Array<messageModel.IMessage['member']>,
  dates: Date[],
): messageModel.IMessage[] =>
  range(0, count)
    .map<messageModel.IMessage>(() => ({
      id: faker.string.uuid(),
      member: findRandomElement(members)!,
      sendTime: add(findRandomElement(dates)!, {
        hours: faker.date.past().getHours(),
        minutes: faker.date.past().getMinutes(),
        seconds: faker.date.past().getSeconds(),
      }),
      content: getMessageContent(),
    }))
    .sort((a, b) => compareAsc(a.sendTime, b.sendTime));

const MessageListFixture: FC = () => {
  const [messageCount] = useValue("message's count", { defaultValue: 25 });
  const [memberCount] = useValue("member's count", { defaultValue: 2 });

  const dates = useMemo(
    () => range(messageCount / 5).map(() => faker.date.past()),
    [messageCount],
  );

  const members = useMemo<Array<messageModel.IMessage['member']>>(
    () =>
      range(memberCount).map(() => ({
        userId: faker.string.uuid(),
        ...getUserName(),
      })),
    [memberCount],
  );

  const messages = useMemo(
    () => getMessages(messageCount, members, dates),
    [messageCount, members, dates],
  );

  return (
    <MessageUi.MessageList messages={messages} viewerId={members[0]!.userId} />
  );
};

export default withGlobalStyles(MessageListFixture);
