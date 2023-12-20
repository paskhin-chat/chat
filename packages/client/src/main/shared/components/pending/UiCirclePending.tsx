import { FC, useMemo } from 'react';
import { CircularProgress, Fade, useTheme } from '@mui/material';

interface IProps {
  size?: 'small' | 'medium' | 'large';
  showingDelay?: number | string | boolean;
}

/**
 * Depicts the loading process like a circle preloader.
 */
export const UiCirclePending: FC<IProps> = ({ size = 'medium', showingDelay }) => {
  const theme = useTheme();

  const sizeMap: Record<'small' | 'medium' | 'large', string> = {
    large: theme.spacing(3),
    medium: theme.spacing(3),
    small: theme.spacing(2),
  };

  const delay = useMemo(() => {
    const defaultDelay = `${theme.transitions.duration.enteringScreen}ms`;

    if (typeof showingDelay === 'string') {
      return showingDelay;
    }

    if (typeof showingDelay === 'number') {
      return `${showingDelay}ms`;
    }

    return showingDelay ? defaultDelay : '0ms';
  }, [showingDelay, theme.transitions.duration.enteringScreen]);

  return (
    <Fade in={true} style={{ transitionDelay: delay }}>
      <CircularProgress size={sizeMap[size]} />
    </Fade>
  );
};
