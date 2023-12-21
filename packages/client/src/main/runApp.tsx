import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './app';

/**
 * Run whole client application.
 */
export function runApp(): void {
  createRoot(document.querySelector('#root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
