import { createContext, useContext } from "react";

import { IConfig } from "./config";

export const ConfigContext = createContext<IConfig | null>(null);

export function useConfig(): IConfig {
  const config = useContext(ConfigContext);

  if (!config) {
    throw new Error("Config must be provided through ConfigContext");
  }

  return config;
}
