import { HTMLAttributes, FC, ReactNode, SyntheticEvent } from 'react';
import styled from 'styled-components';

interface IProps extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit?: () => void;
  children?: ReactNode | undefined;
}

/**
 * Generic form component.
 */
export const UiForm: FC<IProps> = ({ onSubmit, children, ...props }) => {
  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <SUiForm {...props} role='form' noValidate={true} onSubmit={handleSubmit}>
      {children}
    </SUiForm>
  );
};

const SUiForm = styled.form``;
