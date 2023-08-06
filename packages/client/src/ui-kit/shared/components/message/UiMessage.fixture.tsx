import { useSelect, useValue } from 'react-cosmos/client';
import { faker } from '@faker-js/faker';
import { FC } from 'react';
import { parseISO } from 'date-fns';

import { UiMessage } from 'shared';

import { getMessageContent, getUserName } from './__mock';

const defaultContent = getMessageContent();
const defaultTime = faker.date.anytime().toISOString();
const defaultAuthor = getUserName();

const UiMessageFixture: FC = () => {
  const [position] = useSelect('position', {
    defaultValue: 'right',
    options: ['left', 'right'],
  });
  const [content] = useValue('content', {
    defaultValue: defaultContent,
  });
  const [time] = useValue('time', {
    defaultValue: defaultTime,
  });
  const [author] = useValue('author', {
    defaultValue: defaultAuthor,
  });
  const [isAuthorViewer] = useValue('isAuthorViewer', {
    defaultValue: false,
  });

  return (
    <UiMessage
      id={faker.string.uuid()}
      time={parseISO(time)}
      content={content}
      author={author}
      isAuthorViewer={isAuthorViewer}
      position={position}
    />
  );
};

export default UiMessageFixture;
