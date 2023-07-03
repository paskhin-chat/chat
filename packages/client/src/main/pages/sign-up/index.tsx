import { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'wouter';

import { AuthUi } from '../../features';

const SignUpPage: FC = () => (
  <SPageWrapper>
    <SFormWrapper>
      <STitle>
        Sign up or <Link href='/login'>login</Link>
      </STitle>

      <AuthUi.SignUpForm />
    </SFormWrapper>
  </SPageWrapper>
);

/**
 * Sign up page.
 */
export default SignUpPage;

const SPageWrapper = styled.div`
  display: grid;
  grid-template-rows: 2fr 5fr 2fr;
  grid-template-columns: 2fr 5fr 2fr;
  justify-content: center;
  height: 100vh;
`;

const STitle = styled.h2``;

const SFormWrapper = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  justify-self: center;
  width: 80%;
`;
