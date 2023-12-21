import { FC } from 'react';
import { useSelect, useValue } from 'react-cosmos/client';

import { UiTextInput } from '../../../main/shared';
import { withGlobalStyles } from '../../__utils__';

const UiTextInputFixture: FC = () => {
  const [label] = useValue('label', { defaultValue: 'Label' });
  const [placeholder] = useValue('placeholder', {
    defaultValue: 'Placeholder',
  });
  const [helperText] = useValue('helper text', { defaultValue: 'Helper' });
  const [size] = useSelect('size', {
    options: ['small', 'medium'],
    defaultValue: 'small',
  });
  const [variant] = useSelect('variant', {
    options: ['outlined', 'standard', 'filled'],
    defaultValue: 'outlined',
  });

  return <UiTextInput label={label} helperText={helperText} size={size} variant={variant} placeholder={placeholder} />;
};

export default withGlobalStyles(UiTextInputFixture);
