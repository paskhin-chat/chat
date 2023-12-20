import { FC } from 'react';
import * as d from 'doubter';
import { IconButton, Stack } from '@mui/material';
import { Send } from '@mui/icons-material';

import { IUiField, UiForm, UiTextInputField } from '../../../shared';

interface IProps {
  field: IUiField<TMessageFormValue>;
  handleSubmit: () => void;
}

/**
 * Shape of message form.
 */
export const messageFormShape = d.object({
  content: d.string(),
});

/**
 * Input type of message form.
 */
export type TMessageFormValue = d.Input<typeof messageFormShape>;

/**
 * Form for creating a message.
 */
export const CreateMessageForm: FC<IProps> = ({ field, handleSubmit }) => (
  <UiForm onSubmit={handleSubmit}>
    <Stack direction='row' spacing={1}>
      <UiTextInputField
        field={field.at('content')}
        fullWidth={true}
        placeholder='Write a message...'
        autoComplete='off'
      />

      <IconButton type='submit' color='primary'>
        <Send />
      </IconButton>
    </Stack>
  </UiForm>
);
