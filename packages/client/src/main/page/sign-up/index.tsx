import { FC } from 'react';
import { styled } from '@mui/material/styles';

import { AuthUi } from 'feature';

const SignUpPage: FC = () => (
  <SPageWrapper>
    <AuthUi.SignUp />
  </SPageWrapper>
);

/**
 * Sign up page.
 */
export default SignUpPage;

const SPageWrapper = styled('div')`
  display: grid;
  grid-template-rows: 2fr 5fr 2fr;
  grid-template-columns: 2fr 5fr 2fr;
  justify-content: center;
  height: 100dvh;
`;
