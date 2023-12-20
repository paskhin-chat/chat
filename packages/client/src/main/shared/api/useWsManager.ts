import { useContext } from "react";
import { WsManagerContext } from "./WsManagerContext";
import { Client } from "graphql-ws";

export function useWsManager(): Client {
  const wsManager = useContext(WsManagerContext);

  if (!wsManager) {
    throw new Error(
      "useWsManager must be used within a WsManagerContext.Provider"
    );
  }

  return wsManager;
}
