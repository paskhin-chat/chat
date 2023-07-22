import type { IEnv } from './env.schema';

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface,@typescript-eslint/naming-convention
    interface ProcessEnv extends IEnv {}
  }
}
