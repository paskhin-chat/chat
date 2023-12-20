import capitalize from 'lodash/capitalize';

import { Maybe } from '../types';

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
  firstName?: Maybe<string>;
  /**
   * Last name.
   *
   * @example
   *   'Paskhin';
   */
  lastName?: Maybe<string>;
  /**
   * Second name.
   *
   * @example
   *   'Sergeevich';
   */
  secondName?: Maybe<string>;
}

/**
 * Formats user full name.
 */
export function formatUserName(fullName?: Maybe<IUserFullName>): string;

/**
 * Formats user full name.
 */
export function formatUserName(firstName?: Maybe<string>, lastName?: Maybe<string>, secondName?: Maybe<string>): string;

/**
 * Formats user full name.
 */
export function formatUserName(
  name?: Maybe<string | IUserFullName>,
  lastName?: Maybe<string>,
  secondName?: Maybe<string>,
): string {
  let fName = DEFAULT_FIRST_NAME;
  let lName = DEFAULT_LAST_NAME;
  let sName = '';

  if (typeof name === 'object' && name !== null) {
    fName = name.firstName || fName;
    lName = name.lastName || lName;
    sName = name.secondName || sName;
  } else {
    fName = name || fName;
    lName = lastName || lName;
    sName = secondName || sName;
  }

  if (sName) {
    return `${capitalize(lName)} ${fName.at(0)?.toUpperCase()}. ${sName.at(0)?.toUpperCase()}.`;
  }

  return `${fName} ${lName}`;
}
