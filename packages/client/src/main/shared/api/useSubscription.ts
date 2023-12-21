import { useEffect, useRef } from 'react';

import { useWsManager } from './useWsManager';

export interface ISubscriptionOptions<Data extends Record<string, unknown>> {
  onSuccess?: (data: Data) => void;
}

export function useSubscription<
  Data extends Record<string, unknown>,
  Variables extends Record<string, unknown> = Record<string, unknown>,
>(query: string, variables?: Variables, options?: ISubscriptionOptions<Data>): void {
  const wsManager = useWsManager();

  const onSuccessRef = useRef<ISubscriptionOptions<Data>['onSuccess']>();

  onSuccessRef.current = options?.onSuccess;

  useEffect(
    () =>
      wsManager.subscribe(
        {
          query,
          variables,
        },
        {
          next(response) {
            if (response.data) {
              onSuccessRef.current?.(response.data as Data);
            }
            if (response.errors) {
              // eslint-disable-next-line no-console
              console.error('Subscription error:', response.errors);
            }
          },
          error(err) {
            // eslint-disable-next-line no-console
            console.error('Subscription error:', err);
          },
          complete() {
            //
          },
        },
      ),
    // TODO: it may be excessive to invoke the effect because of variables dependency here
    [query, variables, wsManager],
  );
}
