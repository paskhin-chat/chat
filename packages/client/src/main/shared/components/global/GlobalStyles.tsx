import { CssBaseline, GlobalStyles as GlobalStylesCore } from '@mui/material';
import { FC } from 'react';
import { css } from '@mui/material/styles';

/**
 * Styles for all application.
 */
export const GlobalStyles: FC = () => (
  <>
    <CssBaseline />
    <GlobalStylesCore styles={css``} />
  </>
);
