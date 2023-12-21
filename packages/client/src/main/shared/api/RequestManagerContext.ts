import { createContext } from 'react';

import type { IRequestManager } from './createRequestManager';

export const RequestManagerContext = createContext<IRequestManager | null>(null);
