import { FC } from 'react';
import noop from 'lodash/noop';

import { MessageUi } from 'entity';
import { useUiField } from 'shared';
import { withGlobalStyles } from '../../__utils__';

const MessageFormFixture: FC = () => {
  const field = useUiField(
    {
      content: '',
    },
    MessageUi.messageFormShape,
  );

  return <MessageUi.MessageForm field={field} handleSubmit={noop} />;
};

export default withGlobalStyles(MessageFormFixture);
