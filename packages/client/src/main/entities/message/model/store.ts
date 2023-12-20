import { createListStore, useRerender } from "../../../shared";
import { createContext, useContext, useEffect } from "react";
import { MessageDto } from "../../../gen/api-types";

const MessagesStoreContext = createContext(createListStore<MessageDto>());

export function useMessagesStore() {
  const store = useContext(MessagesStoreContext);
  const rerender = useRerender();

  useEffect(() => store.subscribe(rerender), [store]);

  return store;
}
