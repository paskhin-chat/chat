import { FC } from 'react';

import { AuthUi } from 'feature';
import { UiCenteredPageLayout } from 'shared';

const SignUpPage: FC = () => (
  <UiCenteredPageLayout>
    <AuthUi.SignUp />
  </UiCenteredPageLayout>
);

/**
 * Sign up page.
 */
export default SignUpPage;
