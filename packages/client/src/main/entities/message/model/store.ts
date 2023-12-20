import { createContext, useContext, useEffect } from 'react';

import { createListStore, IListStore, useRerender } from '../../../shared';
import { MessageDto } from '../../../gen/api-types';

const MessagesStoreContext = createContext(createListStore<MessageDto>());

export function useMessagesStore(): IListStore<MessageDto> {
  const store = useContext(MessagesStoreContext);
  const rerender = useRerender();

  useEffect(() => store.subscribe(rerender), [store, rerender]);

  return store;
}
