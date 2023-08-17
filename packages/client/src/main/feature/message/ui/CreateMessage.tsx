import { FC } from 'react';

import { useUiField } from 'shared';
import { messageModel, MessageUi } from 'entity';

interface IProps {
  roomId: string;
}

/**
 * Creating a message provider.
 */
export const CreateMessage: FC<IProps> = ({ roomId }) => {
  const field = useUiField(
    {
      content: '',
    },
    MessageUi.messageFormShape,
  );

  const createMessageExecutor = messageModel.useCreateMessageExecutor({
    onCompleted: () => field.reset(),
  });

  const handleSubmit = (): void => {
    if (!field.value.content) {
      return;
    }

    field.clearErrors();
    field.validate();

    if (field.isInvalid) {
      return;
    }

    createMessageExecutor.execute({
      content: field.value.content,
      roomId,
    });
  };

  return <MessageUi.MessageForm field={field} handleSubmit={handleSubmit} />;
};
