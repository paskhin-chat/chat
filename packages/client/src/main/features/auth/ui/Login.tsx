import { FC } from 'react';

import { useUiField } from '../../../shared';
import { authModel, AuthUi } from '../../../entities';

/**
 * Component for log in feature.
 */
export const Login: FC = () => {
  const field = useUiField(
    {
      login: '',
      password: '',
    },
    AuthUi.loginFormShape,
  );

  const loginExecutor = authModel.useLoginExecutor({
    onError: err => {
      field.setError(err[0]?.message || 'Unknown error');
    },
  });

  const handleSubmit = (): void => {
    field.clearErrors();
    field.validate();

    if (field.isInvalid) {
      return;
    }

    loginExecutor.execute({ input: field.value });
  };

  return <AuthUi.LoginForm field={field} handleSubmit={handleSubmit} pending={loginExecutor.pending} />;
};
