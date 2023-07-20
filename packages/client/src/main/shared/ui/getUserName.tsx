import { UiUserNameUtils } from 'ui';

/**
 * Formats user's name.
 */
export function getUserFullName(user: {
  firstName?: string;
  lastName?: string;
  secondName?: string;
}): string {
  return UiUserNameUtils.getUserFullName(
    user.firstName || UiUserNameUtils.DEFAULT_FIRST_NAME,
    user.lastName || UiUserNameUtils.DEFAULT_LAST_NAME,
    user.secondName,
  );
}
