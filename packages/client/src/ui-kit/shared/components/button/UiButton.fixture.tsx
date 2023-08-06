import { FC } from 'react';
import { useSelect, useValue } from 'react-cosmos/client';

import { UiButton } from 'shared';

const UiButtonFixture: FC = () => {
  const [value] = useValue('value', { defaultValue: 'Click me' });
  const [pending] = useValue('pending', { defaultValue: true });
  const [disabled] = useValue('disabled', { defaultValue: false });
  const [size] = useSelect('size', {
    options: ['small', 'medium', 'large'],
    defaultValue: 'small',
  });

  return (
    <UiButton disabled={disabled} pending={pending} size={size}>
      {value}
    </UiButton>
  );
};

export default <UiButtonFixture />;
