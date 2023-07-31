import { FC } from 'react';
import * as d from 'doubter';
import styled from 'styled-components';

import { UiFieldErrorCard, UiTextInputField, useUiField, UiForm } from 'shared';
import { viewerModel } from 'entity';

const loginShape = d.object({
  login: d.string(),
  password: d.string(),
});

/**
 * Component for log in feature.
 */
export const LoginForm: FC = () => {
  const field = useUiField(
    {
      login: '',
      password: '',
    },
    loginShape,
  );

  const loginExecutor = viewerModel.useLoginExecutor({
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

    loginExecutor.execute(field.value);
  };

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

      <button type='submit'>
        {loginExecutor.loading ? 'Disabled' : 'Confirm'}
      </button>
    </SForm>
  );
};

const SForm = styled(UiForm)`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
