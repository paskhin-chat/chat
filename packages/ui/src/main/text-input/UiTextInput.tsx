import {
  ChangeEventHandler,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from 'react';

/**
 * Ui input props.
 */
export interface IUiTextInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  /**
   * Input value.
   */
  value?: string;
  /**
   * Input value changer.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

/**
 * Ui text input component.
 */
export const UiTextInput = forwardRef<HTMLInputElement, IUiTextInputProps>(
  (props, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <input {...props} type='text' ref={ref} />
  ),
);
