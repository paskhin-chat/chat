import { FC } from 'react';
import { useSelect, useValue } from 'react-cosmos/client';
import { faker } from '@faker-js/faker';
import { parseISO } from 'date-fns';

import { UiDate } from 'shared';
import { UiDateFormat } from 'shared/components/date/date';

const defaultDate = faker.date.anytime().toISOString();

const UiDateFixture: FC = () => {
  const [date] = useValue('date', {
    defaultValue: defaultDate,
  });
  const [format] = useSelect('format', {
    options: [UiDateFormat.DIGITS, UiDateFormat.FULL],
    defaultValue: UiDateFormat.DIGITS,
  });
  const [actualYear] = useValue('actual year', { defaultValue: true });

  return (
    <UiDate date={parseISO(date)} options={{ actualYear }} format={format} />
  );
};

export default UiDateFixture;
