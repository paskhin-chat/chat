import { render } from '@testing-library/react';

import { UiButton } from 'shared/components';

describe('UiButton component', () => {
  test('Rendered', () => {
    const { getByRole } = render(<UiButton>Click me</UiButton>);

    expect(getByRole('button')).toHaveTextContent('Click me');
  });
});
