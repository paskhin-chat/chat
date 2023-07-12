import { FC, SyntheticEvent } from 'react';
import { UiTextInputField, useUiField } from 'ui';
import styled from 'styled-components';
import * as d from 'doubter';
import { FieldRenderer } from '@roqueform/react';

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

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

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
      <SFieldWrapper>
        <UiTextInputField field={field.at('content')} />
      </SFieldWrapper>

      <FieldRenderer field={field.at('content')}>
        {(contentField) => (
          <button
            type='submit'
            disabled={!contentField.value || createMessageExecutor.loading}
          >
            Send
          </button>
        )}
      </FieldRenderer>
    </SMessageForm>
  );
};

const SMessageForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SFieldWrapper = styled.div`
  width: 100%;
`;
