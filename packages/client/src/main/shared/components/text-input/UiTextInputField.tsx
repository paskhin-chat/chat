import { FC } from 'react';

import { IUiField, IUiFieldBaseProps, UiField } from '../field';

import { IUiTextInputProps, UiTextInput } from './UiTextInput';

interface IProps
  extends IUiFieldBaseProps<IUiField<string | undefined> | IUiField<string>>,
    Omit<IUiTextInputProps, 'value' | 'onChange'> {}

/**
 * {@see UiField} Wrapper {@see UiTextInput}.
 */
export const UiTextInputField: FC<IProps> = (props) => (
  <UiField {...props}>
    {(field) => (
      <UiTextInput
        helperText={field.error?.message as string}
        {...props}
        ref={field.refCallback.bind(field)}
        value={field.value}
        error={!!field.error}
        onChange={(event) => field.setValue(event.target.value)}
      />
    )}
  </UiField>
);
