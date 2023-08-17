import { FC } from 'react';

import { useUiField } from 'shared';
import { viewerModel, ViewerUi } from 'entity';

/**
 * Component for sign up feature.
 */
export const SignUp: FC = () => {
  const field = useUiField(
    {
      login: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    ViewerUi.signUpFormShape,
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
    <ViewerUi.SignUpForm
      field={field}
      handleSubmit={handleSubmit}
      pending={signUpExecutor.loading}
    />
  );
};
