import { createContext, useContext, useEffect } from 'react';

import { UserDto, createBaseStore, IBaseStore, useRerender } from '../../../shared';

const ViewerStoreContext = createContext(createBaseStore<UserDto>());

export function useViewerStore(): IBaseStore<UserDto> {
  const store = useContext(ViewerStoreContext);
  const rerender = useRerender();

  useEffect(() => store.subscribe(rerender), [store, rerender]);

  return store;
}
