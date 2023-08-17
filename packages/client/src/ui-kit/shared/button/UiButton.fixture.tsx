import { FC } from 'react';
import { useSelect, useValue } from 'react-cosmos/client';

import { UiButton } from 'shared';
import { useBooleanValue, withGlobalStyles } from '../../__utils__';

const UiButtonFixture: FC = () => {
  const [value] = useValue('value', { defaultValue: 'Click me' });
  const [pending] = useBooleanValue('pending');
  const [disabled] = useBooleanValue('disabled');
  const [size] = useSelect('size', {
    options: ['small', 'medium', 'large'],
    defaultValue: 'medium',
  });

  return (
    <UiButton disabled={disabled} pending={pending} size={size}>
      {value}
    </UiButton>
  );
};

export default withGlobalStyles(UiButtonFixture);
