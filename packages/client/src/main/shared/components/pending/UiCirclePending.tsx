import { FC } from 'react';
import { CircularProgress, Fade, useTheme } from '@mui/material';

interface IProps {
  size?: 'small' | 'medium' | 'large';
  showingDelay?: number | string;
}

/**
 * Depicts the loading process like a circle preloader.
 */
export const UiCirclePending: FC<IProps> = ({
  size = 'medium',
  showingDelay,
}) => {
  const theme = useTheme();

  const sizeMap: Record<'small' | 'medium' | 'large', string> = {
    large: theme.spacing(3),
    medium: theme.spacing(3),
    small: theme.spacing(2),
  };

  return (
    <Fade
      in={true}
      style={{
        transitionDelay:
          typeof showingDelay === 'string'
            ? showingDelay
            : `${showingDelay ?? theme.transitions.duration.enteringScreen}ms`,
      }}
    >
      <CircularProgress size={sizeMap[size]} />
    </Fade>
  );
};
