import React from "react";
import { IAuthManager } from "./createAuthManager";
import { useRerender } from "../hooks";

export const AuthManagerContext = React.createContext<IAuthManager | null>(
  null
);

export function useAuthManager(): IAuthManager {
  const rerender = useRerender();
  const authManager = React.useContext(AuthManagerContext);

  if (!authManager) {
    throw new Error("Auth manager must be provided through AuthManagerContext");
  }

  React.useEffect(() => authManager.subscribe(rerender), [authManager]);

  return authManager;
}
