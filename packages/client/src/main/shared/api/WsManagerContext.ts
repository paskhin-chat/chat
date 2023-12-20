import { createContext } from 'react';
import { Client } from 'graphql-ws';

export const WsManagerContext = createContext<Client | null>(null);
