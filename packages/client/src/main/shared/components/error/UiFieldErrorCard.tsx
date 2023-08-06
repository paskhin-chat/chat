import React from 'react';
import { FieldRenderer } from '@roqueform/react';
import { Alert } from '@mui/material';

import type { IUiField } from '../field';

interface IProps {
  field: IUiField<unknown>;
}

/**
 * Component for rendering field's error in card view.
 */
export const UiFieldErrorCard: React.VFC<IProps> = ({ field }) => (
  <FieldRenderer field={field}>
    {() => field.error && <Alert severity='error'>{field.error.message}</Alert>}
  </FieldRenderer>
);
