import capitalize from 'lodash/capitalize';

/**
 * Can be used instead of real user first name.
 */
export const DEFAULT_FIRST_NAME = 'Anon';

/**
 * Can be used instead of real user last name.
 */
export const DEFAULT_LAST_NAME = 'Ymous';

/**
 * Base user's name.
 */
export interface IUserFullName {
  /**
   * First name.
   *
   * @example
   *   'Dmitrii';
   */
  firstName?: string;
  /**
   * Last name.
   *
   * @example
   *   'Paskhin';
   */
  lastName?: string;
  /**
   * Second name.
   *
   * @example
   *   'Sergeevich';
   */
  secondName?: string;
}

/**
 * Formats user full name.
 */
export function formatUserName(fullName?: IUserFullName): string;

/**
 * Formats user full name.
 */
export function formatUserName(
  firstName?: string,
  lastName?: string,
  secondName?: string,
): string;

/**
 * Formats user full name.
 */
export function formatUserName(
  name?: string | IUserFullName,
  lastName?: string,
  secondName?: string,
): string {
  let fName = DEFAULT_FIRST_NAME;
  let lName = DEFAULT_LAST_NAME;
  let sName = '';

  if (typeof name === 'object') {
    fName = name.firstName || fName;
    lName = name.lastName || lName;
    sName = name.secondName || sName;
  } else {
    fName = name || fName;
    lName = lastName || lName;
    sName = secondName || sName;
  }

  if (sName) {
    return (
      `${capitalize(lName)} ${fName.at(0)?.toUpperCase()}.` +
      ` ${sName.at(0)?.toUpperCase()}.`
    );
  }

  return `${fName} ${lName}`;
}
