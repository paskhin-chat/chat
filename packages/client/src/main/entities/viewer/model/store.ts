import { createContext, useContext, useEffect } from "react";
import { UserDto } from "../../../gen/api-types";
import { createBaseStore } from "../../../shared/store/createBaseStore";
import { useRerender } from "../../../shared";

const ViewerStoreContext = createContext(createBaseStore<UserDto>());

export function useViewerStore() {
  const store = useContext(ViewerStoreContext);
  const rerender = useRerender();

  useEffect(() => store.subscribe(rerender), [store]);

  return store;
}
