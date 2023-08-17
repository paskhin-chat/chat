import { FC } from 'react';
import * as d from 'doubter';
import { Stack, Typography } from '@mui/material';

import {
  IUiField,
  UiButton,
  UiFieldErrorCard,
  UiForm,
  UiTextInputField,
  UiTextLink,
} from 'shared';

interface IProps {
  field: IUiField<TLoginFormValue>;
  handleSubmit: () => void;
  pending: boolean;
}

/**
 * Shape of login form's fields.
 */
export const loginFormShape = d.object({
  login: d.string(),
  password: d.string(),
});

/**
 * Input type of login form.
 */
export type TLoginFormValue = d.Input<typeof loginFormShape>;

/**
 * Component for log in feature.
 */
export const LoginForm: FC<IProps> = ({ field, handleSubmit, pending }) => (
  <Stack spacing={3}>
    <Typography variant='h5'>
      Login or <UiTextLink href='/sign-up'>sing up</UiTextLink>
    </Typography>

    <UiForm onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <UiTextInputField
          label='Login'
          disabled={pending}
          field={field.at('login')}
        />

        <UiTextInputField
          label='Password'
          type='password'
          disabled={pending}
          field={field.at('password')}
        />

        <UiButton type='submit' pending={pending}>
          Confirm
        </UiButton>

        <UiFieldErrorCard field={field} />
      </Stack>
    </UiForm>
  </Stack>
);
