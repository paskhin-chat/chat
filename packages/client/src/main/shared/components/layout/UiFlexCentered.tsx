import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IProps {
  children: ReactNode;
  viewportHeight?: boolean;
}

/**
 * Renders children in centered flex container.
 */
export const UiFlexCentered: FC<IProps> = ({ children, viewportHeight }) => (
  <SRoot sx={{ height: viewportHeight ? '100dvh' : undefined }}>{children}</SRoot>
);

const SRoot = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
