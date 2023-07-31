import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { FC } from 'react';

const GlobalStylesBase = createGlobalStyle`
  *:not(button,input,a) {
    color: white;
  }
  * {
    box-sizing: border-box;
  }
  
  body {
    min-height: 100vh;
    background: #ccc;
  }
`;

/**
 * Styles for all application.
 */
export const GlobalStyles: FC = () => (
  <>
    <Normalize />
    <GlobalStylesBase />
  </>
);
