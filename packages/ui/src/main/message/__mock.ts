import { faker, SexType } from '@faker-js/faker';
import { random } from 'lodash';

import { UiUserNameUtils } from '../user';

/**
 * 50%/50% false/true.
 */
export const getRandomBool = (): boolean => random(0, 1) > 0.5;

/**
 * 50%/50% male/female.
 */
export const getRandomSexType = (): SexType =>
  getRandomBool() ? 'male' : 'female';

/**
 * Gets mock user name.
 */
export function getUserName(): string {
  const isAnonymous = getRandomBool();
  const sexType = getRandomSexType();

  return UiUserNameUtils.getUserFullName(
    isAnonymous
      ? faker.person.firstName(sexType)
      : UiUserNameUtils.DEFAULT_FIRST_NAME,
    isAnonymous
      ? faker.person.lastName(sexType)
      : UiUserNameUtils.DEFAULT_LAST_NAME,
    getRandomBool() ? faker.person.middleName(sexType) : undefined,
  );
}

/**
 * Gets mock message content.
 */
export function getMessageContent(min = 1, max = 25): string {
  return faker.lorem.words({ min, max });
}
