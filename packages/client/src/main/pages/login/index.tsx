import { FC } from "react";
import { UiCenteredPageLayout } from "../../shared";
import { AuthUi } from "../../features";

const LoginPage: FC = () => (
  <UiCenteredPageLayout>
    <AuthUi.Login />
  </UiCenteredPageLayout>
);

/**
 * Login page.
 */
export default LoginPage;
