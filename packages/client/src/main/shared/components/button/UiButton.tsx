import { FC } from 'react';

interface IProps {
  children?: string;
}

/**
 * Ui button component.
 */
export const UiButton: FC<IProps> = ({ children }) => (
  <button type='button'>{children}</button>
);
