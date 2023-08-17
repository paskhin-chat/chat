import { useSelect, useValue } from 'react-cosmos/client';
import { faker } from '@faker-js/faker';
import { FC } from 'react';
import { parseISO } from 'date-fns';

import { MessageUi } from 'entity';
import { withGlobalStyles, useBooleanValue } from '../../__utils__';
import { getMessageContent } from '../../__mock__';
import { formatUserName } from 'shared';

const defaultContent = getMessageContent();
const defaultTime = faker.date.anytime().toISOString();

const MessageFixture: FC = () => {
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
  const [isAuthorViewer] = useBooleanValue('isAuthorViewer');

  const member = {
    userId: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };

  return (
    <MessageUi.Message
      message={{
        content,
        sendTime: parseISO(time),
        member,
        id: faker.string.uuid(),
      }}
      title={isAuthorViewer ? 'You' : formatUserName(member)}
      position={position}
    />
  );
};

export default withGlobalStyles(MessageFixture);
