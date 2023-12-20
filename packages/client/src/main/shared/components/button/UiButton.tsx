import React, { FC } from 'react';
import { Button } from '@mui/material';
import { ButtonProps } from '@mui/material/Button/Button';

import { UiCirclePending } from '../pending';

interface IProps extends ButtonProps {
  pending?: boolean;
}

/**
 * Ui button component.
 */
export const UiButton: FC<IProps> = ({ disabled, pending, startIcon, size = 'medium', ...props }) => (
  <Button
    variant='contained'
    fullWidth={true}
    {...props}
    disabled={disabled || pending}
    size={size}
    startIcon={pending ? <UiCirclePending size={size} showingDelay={0} /> : startIcon}
  />
);
