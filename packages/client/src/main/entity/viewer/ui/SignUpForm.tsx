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
  field: IUiField<TSignUpFormValue>;
  handleSubmit: () => void;
  pending: boolean;
}

/**
 * Shape of sign up form's fields.
 */
export const signUpFormShape = d.object({
  login: d.string().min(5),
  firstName: d.string().min(1),
  lastName: d.string().min(1),
  password: d.string().min(5),
});

/**
 * Input type of sign up form.
 */
export type TSignUpFormValue = d.Input<typeof signUpFormShape>;

/**
 * Component for sign up feature.
 */
export const SignUpForm: FC<IProps> = ({ field, pending, handleSubmit }) => (
  <Stack spacing={3}>
    <Typography variant='h5'>
      Sign up or <UiTextLink href='/login'>login</UiTextLink>
    </Typography>

    <UiForm onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <UiTextInputField
          label='Login'
          disabled={pending}
          field={field.at('login')}
        />

        <UiTextInputField
          label='First name'
          disabled={pending}
          field={field.at('firstName')}
        />

        <UiTextInputField
          label='Last name'
          disabled={pending}
          field={field.at('lastName')}
        />

        <UiTextInputField
          label='Password'
          disabled={pending}
          type='password'
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
