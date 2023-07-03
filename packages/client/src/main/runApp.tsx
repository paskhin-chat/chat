import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './app';

/**
 * Run whole client application.
 */
export function runApp(): void {
  const $root = document.querySelector('#root');

  if (!$root) {
    throw new Error('There are no root element.');
  }

  const root = createRoot($root);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
