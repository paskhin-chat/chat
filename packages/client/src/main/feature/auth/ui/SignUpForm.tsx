import { FC, SyntheticEvent, useEffect } from 'react';
import { UiFieldErrorCard, UiTextInputField, useUiField } from 'ui';
import * as d from 'doubter';
import styled from 'styled-components';

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
  const [signUp, result] = viewerModel.useSignUp();

  const field = useUiField(
    {
      login: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    signUpShape,
  );

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    field.clearErrors();
    field.validate();

    if (field.isInvalid) {
      return;
    }

    signUp(field.value);
  };

  useEffect(() => {
    if (result.error) {
      field.setError(result.error.message);
    }
  }, [field, result.error]);

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

      <button type='submit'>{result.loading ? 'Disabled' : 'Confirm'}</button>
    </SForm>
  );
};

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
