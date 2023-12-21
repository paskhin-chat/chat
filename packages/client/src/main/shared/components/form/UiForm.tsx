import { FC, ReactNode, SyntheticEvent } from 'react';
import { Box, BoxProps } from '@mui/material';

interface IProps extends Omit<BoxProps<'form'>, 'onSubmit' | 'component'> {
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
    <Box flexGrow={1} {...props} role='form' noValidate={true} component='form' onSubmit={handleSubmit}>
      {children}
    </Box>
  );
};
