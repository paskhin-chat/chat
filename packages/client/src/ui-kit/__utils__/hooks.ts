import { useValue } from 'react-cosmos/client';
import { Dispatch, SetStateAction } from 'react';

/**
 * Hook for boolean toggle value.
 */
export function useBooleanValue(
  inputName: string,
  defaultValue = false,
): [boolean, Dispatch<SetStateAction<boolean>>] {
  return useValue(inputName, { defaultValue });
}
