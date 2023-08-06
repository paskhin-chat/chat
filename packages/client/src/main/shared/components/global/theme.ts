import { createTheme } from '@mui/material';

/**
 * Global app theme.
 */
export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
