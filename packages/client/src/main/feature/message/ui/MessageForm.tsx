import { FC } from 'react';
import * as d from 'doubter';
import { IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';
import { css, styled } from '@mui/material/styles';

import { UiForm, UiTextInputField, useUiField } from 'shared';
import { messageModel } from 'entity';

const messageShape = d.object({
  content: d.string(),
});

interface IProps {
  roomId: string;
}

/**
 * Form for creating a message.
 */
export const MessageForm: FC<IProps> = ({ roomId }) => {
  const field = useUiField(
    {
      content: '',
    },
    messageShape,
  );

  const createMessageExecutor = messageModel.useCreateMessageExecutor({
    onCompleted: () => field.reset(),
  });

  const handleSubmit = (): void => {
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

  return (
    <SMessageForm onSubmit={handleSubmit}>
      <UiTextInputField
        field={field.at('content')}
        fullWidth={true}
        placeholder='Write a message...'
        autoComplete='off'
      />

      <IconButton type='submit' focusRipple={true}>
        <Send />
      </IconButton>
    </SMessageForm>
  );
};

const SMessageForm = styled(UiForm)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    column-gap: ${theme.spacing(1)};
  `,
);
