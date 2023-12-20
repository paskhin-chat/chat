import { authModel, AuthUi } from "../../../entities";
import { FC } from "react";

import { useUiField } from "../../../shared";

/**
 * Component for sign up feature.
 */
export const SignUp: FC = () => {
  const field = useUiField(
    {
      login: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    AuthUi.signUpFormShape
  );

  const registerMutation = authModel.useRegisterExecutor({
    onError: (error) => {
      field.setError(error[0]?.message || "Unknown error");
    },
  });

  const handleSubmit = (): void => {
    field.clearErrors();
    field.validate();

    if (field.isInvalid) {
      return;
    }

    registerMutation.execute({ input: field.value });
  };

  return (
    <AuthUi.SignUpForm
      field={field}
      handleSubmit={handleSubmit}
      pending={registerMutation.pending}
    />
  );
};
