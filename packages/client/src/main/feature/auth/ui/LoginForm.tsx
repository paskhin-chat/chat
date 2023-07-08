import { FC, SyntheticEvent, useEffect } from 'react';
import * as d from 'doubter';
import { UiFieldErrorCard, UiTextInputField, useUiField } from 'ui';
import styled from 'styled-components';

import { viewerModel } from 'entity';

const loginShape = d.object({
  login: d.string(),
  password: d.string(),
});

/**
 * Component for log in feature.
 */
export const LoginForm: FC = () => {
  const [login, result] = viewerModel.useLogin();

  const field = useUiField(
    {
      login: '',
      password: '',
    },
    loginShape,
  );

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    field.clearErrors();
    field.validate();

    if (field.isInvalid) {
      return;
    }

    login(field.value);
  };

  useEffect(() => {
    if (result.error) {
      field.setError(result.error.message);
    }
  }, [field, result.error]);

  return (
    <SForm onSubmit={handleSubmit}>
      <UiTextInputField
        placeholder='Enter your login'
        field={field.at('login')}
      />
      <UiTextInputField
        placeholder='Enter your password'
        field={field.at('password')}
      />

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
