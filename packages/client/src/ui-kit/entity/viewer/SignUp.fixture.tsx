import { FC, useEffect } from 'react';
import noop from 'lodash/noop';

import { ViewerUi } from 'entity';
import { useUiField } from 'shared';
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
    ViewerUi.signUpFormShape,
  );

  useEffect(() => {
    if (errored) {
      field.setError({ message: 'Error has occurred' });
    } else {
      field.clearErrors();
    }
  }, [errored, field]);

  return (
    <ViewerUi.SignUpForm field={field} handleSubmit={noop} pending={pending} />
  );
};

export default withGlobalStyles(SignUpFixture);
