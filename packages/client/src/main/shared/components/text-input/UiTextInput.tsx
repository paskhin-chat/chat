import { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

/**
 * Ui input props.
 */
export type IUiTextInputProps = TextFieldProps;

/**
 * Ui text input component.
 */
export const UiTextInput = forwardRef<HTMLInputElement, IUiTextInputProps>(
  (props, ref) => <TextField ref={ref} size='small' {...props} />,
);
