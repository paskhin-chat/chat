import { createContext, useContext, useEffect } from 'react';

import { createListStore, IListStore, useRerender, MessageDto } from '../../../shared';

const MessagesStoreContext = createContext(createListStore<MessageDto>());

export function useMessagesStore(): IListStore<MessageDto> {
  const store = useContext(MessagesStoreContext);
  const rerender = useRerender();

  useEffect(() => store.subscribe(rerender), [store, rerender]);

  return store;
}
