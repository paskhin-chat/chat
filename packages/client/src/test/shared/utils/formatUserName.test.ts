import { faker } from '@faker-js/faker';
import capitalize from 'lodash/capitalize';

import {
  DEFAULT_FIRST_NAME,
  DEFAULT_LAST_NAME,
  formatUserName,
} from 'shared/utils';

describe('Format user name', () => {
  it('should format using full name object', () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const secondName = faker.person.middleName();

    expect(
      formatUserName({
        firstName,
        lastName,
        secondName,
      }),
    ).toBe(
      `${capitalize(lastName)} ${firstName.at(0)?.toUpperCase()}.` +
        ` ${secondName.at(0)?.toUpperCase()}.`,
    );
    expect(
      formatUserName({
        firstName,
        secondName,
      }),
    ).toBe(
      `${DEFAULT_LAST_NAME} ${firstName.at(0)?.toUpperCase()}.` +
        ` ${secondName.at(0)?.toUpperCase()}.`,
    );
    expect(
      formatUserName({
        lastName,
        secondName,
      }),
    ).toBe(
      `${capitalize(lastName)} ${DEFAULT_FIRST_NAME.at(0)?.toUpperCase()}.` +
        ` ${secondName.at(0)?.toUpperCase()}.`,
    );
    expect(
      formatUserName({
        firstName,
        lastName,
      }),
    ).toBe(`${firstName} ${lastName}`);
    expect(formatUserName({})).toBe(
      `${DEFAULT_FIRST_NAME} ${DEFAULT_LAST_NAME}`,
    );
  });

  it('should format using name params', () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const secondName = faker.person.middleName();

    expect(formatUserName(firstName, lastName, secondName)).toBe(
      `${capitalize(lastName)} ${firstName.at(0)?.toUpperCase()}.` +
        ` ${secondName.at(0)?.toUpperCase()}.`,
    );
    expect(formatUserName(firstName, undefined, secondName)).toBe(
      `${DEFAULT_LAST_NAME} ${firstName.at(0)?.toUpperCase()}.` +
        ` ${secondName.at(0)?.toUpperCase()}.`,
    );
    expect(formatUserName(undefined, lastName, secondName)).toBe(
      `${capitalize(lastName)} ${DEFAULT_FIRST_NAME.at(0)?.toUpperCase()}.` +
        ` ${secondName.at(0)?.toUpperCase()}.`,
    );
    expect(formatUserName(firstName, lastName)).toBe(
      `${firstName} ${lastName}`,
    );
    expect(formatUserName({})).toBe(
      `${DEFAULT_FIRST_NAME} ${DEFAULT_LAST_NAME}`,
    );
  });
});
