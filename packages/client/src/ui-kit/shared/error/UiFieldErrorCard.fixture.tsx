import { FC, useEffect } from 'react';
import * as d from 'doubter';
import { useValue } from 'react-cosmos/client';

import { UiFieldErrorCard, useUiField } from '../../../main/shared';
import { withGlobalStyles } from '../../__utils__';

const shape = d.object({});

const UiFieldErrorCardFixture: FC = () => {
  const [message] = useValue('error message', {
    defaultValue: 'Error occurred.',
  });

  const field = useUiField('', shape);

  useEffect(() => {
    field.setError({ message });
  }, [field, message]);

  return <UiFieldErrorCard field={field} />;
};

export default withGlobalStyles(UiFieldErrorCardFixture);
