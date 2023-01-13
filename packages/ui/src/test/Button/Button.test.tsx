import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { Button } from '../../main';

describe('Button component', () => {
  test('Rendered', () => {
    const { getByRole } = render(<Button>Click me</Button>);

    expect(getByRole('button')).toHaveTextContent('Click me');
  });
});
