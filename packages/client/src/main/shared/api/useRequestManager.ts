import { useContext } from "react";
import { RequestManagerContext } from "./RequestManagerContext";

export function useRequestManager() {
  const requestManager = useContext(RequestManagerContext);

  if (!requestManager) {
    throw new Error(
      "useRequestManager must be used within a RequestManagerContext.Provider"
    );
  }

  return requestManager;
}
