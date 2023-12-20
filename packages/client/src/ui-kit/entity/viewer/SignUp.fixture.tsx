import { FC, useEffect } from 'react';
import noop from 'lodash/noop';

import { AuthUi } from '../../../main/entities';
import { useUiField } from '../../../main/shared';
import { useBooleanValue, withGlobalStyles } from '../../__utils__';

const SignUpFixture: FC = () => {
  const [pending] = useBooleanValue('pending');
  const [errored] = useBooleanValue('errored');

  const field = useUiField(
    {
      login: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    AuthUi.signUpFormShape,
  );

  useEffect(() => {
    if (errored) {
      field.setError({ message: 'Error has occurred' });
    } else {
      field.clearErrors();
    }
  }, [errored, field]);

  return <AuthUi.SignUpForm field={field} handleSubmit={noop} pending={pending} />;
};

export default withGlobalStyles(SignUpFixture);
