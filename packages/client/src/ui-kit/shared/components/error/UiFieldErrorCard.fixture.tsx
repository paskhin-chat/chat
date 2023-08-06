import { FC } from 'react';
import * as d from 'doubter';
import { useValue } from 'react-cosmos/client';

import { UiFieldErrorCard, useUiField } from 'shared';

const shape = d.object({});

const UiFieldErrorCardFixture: FC = () => {
  const [message] = useValue('error message', {
    defaultValue: 'Error occurred.',
  });

  const field = useUiField({}, shape);

  field.setError({ message });

  return <UiFieldErrorCard field={field} />;
};

export default UiFieldErrorCardFixture;
