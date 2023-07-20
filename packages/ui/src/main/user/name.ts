import capitalize from 'lodash/capitalize';

/**
 * Can be used instead of real user first name.
 */
export const DEFAULT_FIRST_NAME = 'Anonymous';

/**
 * Can be used instead of real user last name.
 */
export const DEFAULT_LAST_NAME = 'Anonymuch';

/**
 * Formats user full name.
 */
export function getUserFullName(
  firstName: string,
  lastName: string,
  secondName = '',
): string {
  if (secondName) {
    return (
      `${capitalize(lastName)} ${firstName.at(0)?.toUpperCase()}.` +
      ` ${secondName.at(0)?.toUpperCase()}.`
    );
  }

  return `${firstName} ${lastName}`;
}
