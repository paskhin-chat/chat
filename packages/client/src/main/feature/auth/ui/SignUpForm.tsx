import { FC } from 'react';
import * as d from 'doubter';
import { styled } from '@mui/material/styles';

import {
  UiButton,
  UiFieldErrorCard,
  UiForm,
  UiTextInputField,
  useUiField,
} from 'shared';
import { viewerModel } from 'entity';

const signUpShape = d.object({
  login: d.string().min(5),
  firstName: d.string().min(1),
  lastName: d.string().min(1),
  password: d.string().min(5),
});

/**
 * Component for sign up feature.
 */
export const SignUpForm: FC = () => {
  const field = useUiField(
    {
      login: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    signUpShape,
  );

  const signUpExecutor = viewerModel.useSignUpExecutor({
    onError: (error) => {
      field.setError(error.message);
    },
  });

  const handleSubmit = (): void => {
    field.clearErrors();
    field.validate();

    if (field.isInvalid) {
      return;
    }

    signUpExecutor.execute(field.value);
  };

  return (
    <SForm onSubmit={handleSubmit}>
      <UiTextInputField placeholder='Login' field={field.at('login')} />
      <UiTextInputField
        placeholder='First name'
        field={field.at('firstName')}
      />
      <UiTextInputField placeholder='Last name' field={field.at('lastName')} />
      <UiTextInputField placeholder='Password' field={field.at('password')} />

      <UiFieldErrorCard field={field} />

      <UiButton type='submit' pending={signUpExecutor.loading}>
        Confirm
      </UiButton>
    </SForm>
  );
};

const SForm = styled(UiForm)`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
