/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldRenderer } from '@roqueform/react';
import { ReactElement, ReactNode } from 'react';

import { IUiField } from './useUiField';

/**
 * Props of base field.
 */
export interface IUiFieldBaseProps<F extends IUiField<any>> {
  /**
   * Used field.
   */
  field: F;
  /**
   * Field value changer.
   */
  onChange?: (value: ReturnType<F['value']>) => void;
}

interface IProps<F extends IUiField<any>> extends IUiFieldBaseProps<F> {
  children: (field: F) => ReactNode;
}

/**
 * Component of base field.
 */
export const UiField = <F extends IUiField<any>>(props: IProps<F>): ReactElement => {
  const { field, onChange, children } = props;

  return (
    <FieldRenderer field={field} onChange={onChange}>
      {children}
    </FieldRenderer>
  );
};

/* eslint-enable */
