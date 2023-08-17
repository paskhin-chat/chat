import { FC, useEffect } from 'react';
import noop from 'lodash/noop';

import { ViewerUi } from 'entity';
import { useUiField } from 'shared';
import { useBooleanValue, withGlobalStyles } from '../../__utils__';

const LoginFormFixture: FC = () => {
  const [pending] = useBooleanValue('pending');
  const [errored] = useBooleanValue('errored');

  const field = useUiField(
    {
      login: '',
      password: '',
    },
    ViewerUi.loginFormShape,
  );

  useEffect(() => {
    if (errored) {
      field.setError({ message: 'Error has occurred' });
    } else {
      field.clearErrors();
    }
  }, [errored, field]);

  return (
    <ViewerUi.LoginForm field={field} handleSubmit={noop} pending={pending} />
  );
};

export default withGlobalStyles(LoginFormFixture);
