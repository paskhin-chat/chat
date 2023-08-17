import { FC, JSX } from 'react';
import { Box, ThemeProvider } from '@mui/material';

import { GlobalStyles, theme } from 'shared';

/**
 * Wraps the fixture component with theme and adds the app's global styles.
 */
export function withGlobalStyles<P extends JSX.IntrinsicAttributes>(
  Fixture: FC<P>,
): FC<P> {
  return function Component(props: P) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <Box
          sx={{
            borderWidth: theme.spacing(1),
            borderStyle: 'dotted',
            borderColor: theme.palette.grey['900'],
          }}
        >
          <Fixture {...props} />
        </Box>
      </ThemeProvider>
    );
  };
}
