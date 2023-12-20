import { createContext, useContext, useEffect } from 'react';

import { UserDto } from '../../../gen/api-types';
import { createBaseStore, IBaseStore } from '../../../shared/store/createBaseStore';
import { useRerender } from '../../../shared';

const ViewerStoreContext = createContext(createBaseStore<UserDto>());

export function useViewerStore(): IBaseStore<UserDto> {
  const store = useContext(ViewerStoreContext);
  const rerender = useRerender();

  useEffect(() => store.subscribe(rerender), [store, rerender]);

  return store;
}
