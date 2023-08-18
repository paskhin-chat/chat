import { FC } from 'react';

import { AuthUi } from 'feature';
import { UiCenteredPageLayout } from 'shared';

const LoginPage: FC = () => (
  <UiCenteredPageLayout>
    <AuthUi.Login />
  </UiCenteredPageLayout>
);

/**
 * Login page.
 */
export default LoginPage;
