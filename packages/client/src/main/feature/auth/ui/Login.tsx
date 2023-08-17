import { FC } from 'react';

import { useUiField } from 'shared';
import { viewerModel, ViewerUi } from 'entity';

/**
 * Component for log in feature.
 */
export const Login: FC = () => {
  const field = useUiField(
    {
      login: '',
      password: '',
    },
    ViewerUi.loginFormShape,
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
    <ViewerUi.LoginForm
      field={field}
      handleSubmit={handleSubmit}
      pending={loginExecutor.loading}
    />
  );
};
