import { FC } from 'react';
import { styled } from '@mui/material/styles';

import { AuthUi } from 'feature';

const LoginPage: FC = () => (
  <SPageWrapper>
    <AuthUi.Login />
  </SPageWrapper>
);

/**
 * Login page.
 */
export default LoginPage;

const SPageWrapper = styled('div')`
  display: grid;
  grid-template-rows: 2fr 5fr 2fr;
  grid-template-columns: 2fr 5fr 2fr;
  justify-content: center;
  height: 100dvh;
`;
