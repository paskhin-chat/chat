import React, { FC } from 'react';
import { Button, CircularProgress, useTheme } from '@mui/material';
import {
  ButtonProps,
  ButtonPropsSizeOverrides,
} from '@mui/material/Button/Button';
import type { OverridableStringUnion } from '@mui/types';
import { Theme } from '@mui/material/styles/createTheme';

interface IProps extends ButtonProps {
  pending?: boolean;
}

/**
 * Ui button component.
 */
export const UiButton: FC<IProps> = ({
  disabled,
  pending,
  startIcon,
  size = 'medium',
  ...props
}) => {
  const theme = useTheme<Theme>();

  const circleProgressSizeMap: Record<
    OverridableStringUnion<
      'small' | 'medium' | 'large',
      ButtonPropsSizeOverrides
    >,
    string
  > = {
    large: theme.spacing(3),
    medium: theme.spacing(3),
    small: theme.spacing(2),
  };

  return (
    <Button
      variant='contained'
      {...props}
      disabled={disabled || pending}
      size={size}
      startIcon={
        pending ? (
          <CircularProgress size={circleProgressSizeMap[size]} />
        ) : (
          startIcon
        )
      }
    />
  );
};
