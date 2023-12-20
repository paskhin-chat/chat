import { useField } from '@roqueform/react';
import { DoubterMixin, doubterPlugin } from '@roqueform/doubter-plugin';
import { ResetMixin, resetPlugin } from '@roqueform/reset-plugin';
import { Shape } from 'doubter';
import { applyPlugins, Field } from 'roqueform';
import { RefMixin, refPlugin } from '@roqueform/ref-plugin';

/**
 * Base field type.
 */
export type IUiField<T> = Field<T, DoubterMixin & ResetMixin & RefMixin> & DoubterMixin & ResetMixin & RefMixin;

/**
 * Hook for getting base field.
 */
export function useUiField<T>(
  initialValue: (() => T) | T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shape: Shape<T, any>,
): IUiField<T> {
  return useField(
    initialValue,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    applyPlugins(doubterPlugin(shape), resetPlugin(), refPlugin()),
  );
}
