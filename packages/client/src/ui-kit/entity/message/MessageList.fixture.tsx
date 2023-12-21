import { faker } from '@faker-js/faker';
import { range } from 'lodash';
import { add, compareAsc, parseISO } from 'date-fns';
import { FC, useMemo } from 'react';
import { useValue } from 'react-cosmos/client';

import { MessageUi } from '../../../main/entities';
import { findRandomElement, withGlobalStyles } from '../../__utils__';
import { getMessageContent, getUserName } from '../../__mock__';
import { MessageDto, UserDto } from '../../../main/shared';

const getMessages = (count: number, users: UserDto[], dates: Date[]): MessageDto[] =>
  range(0, count)
    .map<MessageDto>(() => ({
      __typename: 'MessageDto',
      roomId: faker.string.uuid(),
      id: faker.string.uuid(),
      user: findRandomElement(users)!,
      sendTime: add(findRandomElement(dates)!, {
        hours: faker.date.past().getHours(),
        minutes: faker.date.past().getMinutes(),
        seconds: faker.date.past().getSeconds(),
      }).toISOString(),
      content: getMessageContent(),
    }))
    .sort((a, b) => compareAsc(parseISO(a.sendTime), parseISO(b.sendTime)));

const MessageListFixture: FC = () => {
  const [messageCount] = useValue("message's count", { defaultValue: 25 });
  const [memberCount] = useValue("member's count", { defaultValue: 2 });

  const dates = useMemo(() => range(messageCount / 5).map(() => faker.date.past()), [messageCount]);

  const users = useMemo<UserDto[]>(
    () =>
      range(memberCount).map(() => ({
        __typename: 'UserDto',
        id: faker.string.uuid(),
        login: faker.internet.userName(),
        ...getUserName(),
      })),
    [memberCount],
  );

  const messages = useMemo(() => getMessages(messageCount, users, dates), [messageCount, users, dates]);

  return <MessageUi.MessageList pending={false} messages={messages} viewerId={users[0]!.id} />;
};

export default withGlobalStyles(MessageListFixture);
