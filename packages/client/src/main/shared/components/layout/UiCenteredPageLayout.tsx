import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

import { UiFlexCentered } from 'shared';

interface IProps {
  children: ReactNode;
}

/**
 * Renders children in center of a page.
 */
export const UiCenteredPageLayout: FC<IProps> = ({ children }) => (
  <UiFlexCentered>
    <Box sx={{ paddingBlock: '100px', width: 'max(40%, 300px)' }}>
      {children}
    </Box>
  </UiFlexCentered>
);
