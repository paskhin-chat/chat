import { faker } from '@faker-js/faker';
import { range } from 'lodash';
import { compareAsc } from 'date-fns';
import { FC, useMemo } from 'react';
import { useValue } from 'react-cosmos/fixture';

import { UiMessageList } from 'shared/components/message/UiMessageList';
import { IUiMessageProps } from 'shared/components/message/UiMessage';

import { getMessageContent, getUserName, getRandomBool } from './__mock';

const getMessages = (count: number): IUiMessageProps[] =>
  range(0, count)
    .map<IUiMessageProps>(() => ({
      time: faker.date.past(),
      content: getMessageContent(),
      author: getUserName(),
      isAuthorViewer: getRandomBool(),
    }))
    .sort((a, b) => compareAsc(a.time, b.time));

const UiMessageListFixture: FC = () => {
  const [count] = useValue('message count', { defaultValue: 25 });

  const messages = useMemo(() => getMessages(count), [count]);

  return <UiMessageList messages={messages} />;
};

export default <UiMessageListFixture />;
