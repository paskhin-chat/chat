import { createContext } from "react";
import { IRequestManager } from "./createRequestManager";

export const RequestManagerContext = createContext<IRequestManager | null>(
  null
);
