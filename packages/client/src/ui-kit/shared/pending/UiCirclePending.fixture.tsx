import { FC } from 'react';
import { useSelect, useValue } from 'react-cosmos/client';

import { UiCirclePending } from '../../../main/shared';
import { useBooleanValue, withGlobalStyles } from '../../__utils__';

const UiCirclePendingFixture: FC = () => {
  const [show] = useBooleanValue('show', true);
  const [delay] = useValue<number>('showing delay', { defaultValue: 0 });
  const [size] = useSelect('size', {
    defaultValue: 'medium',
    options: ['large', 'medium', 'small'],
  });

  if (!show) {
    return null;
  }

  return <UiCirclePending size={size} showingDelay={delay} />;
};

export default withGlobalStyles(UiCirclePendingFixture);
