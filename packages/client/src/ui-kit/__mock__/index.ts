import { faker, SexType } from "@faker-js/faker";

import { getRandomBool, getRandomValue } from "../__utils__";
import { formatUserName } from "../../main/shared";

/**
 * 50%/50% male/female.
 */
export function getRandomSexType(): SexType {
  return getRandomBool() ? "male" : "female";
}

/**
 * Gets full user's name.
 */
export function getUserName(): {
  firstName: string;
  lastName: string;
  secondName?: string;
} {
  const sexType = getRandomSexType();

  return {
    firstName: faker.person.firstName(sexType),
    lastName: faker.person.lastName(sexType),
    secondName: getRandomValue(faker.person.middleName(sexType)),
  };
}

/**
 * Gets mock user name.
 */
export function getFormattedUserName(): string {
  const isAnonymous = getRandomBool();
  const sexType = getRandomSexType();

  return formatUserName(
    isAnonymous ? faker.person.firstName(sexType) : undefined,
    isAnonymous ? faker.person.lastName(sexType) : undefined,
    getRandomValue(faker.person.middleName(sexType))
  );
}

/**
 * Gets mock message content.
 */
export function getMessageContent(min = 1, max = 25): string {
  return faker.lorem.words({ min, max });
}
