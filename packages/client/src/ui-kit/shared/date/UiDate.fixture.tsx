import { FC } from 'react';
import { useSelect, useValue } from 'react-cosmos/client';
import { faker } from '@faker-js/faker';
import { parseISO } from 'date-fns';

import { UiDate, UiDateUtils } from 'shared';
import { withGlobalStyles } from '../../__utils__';

const defaultDate = faker.date.anytime().toISOString();

const UiDateFixture: FC = () => {
  const [date] = useValue('date', {
    defaultValue: defaultDate,
  });
  const [format] = useSelect('format', {
    options: [UiDateUtils.UiDateFormat.DIGITS, UiDateUtils.UiDateFormat.FULL],
    defaultValue: UiDateUtils.UiDateFormat.DIGITS,
  });
  const [actualYear] = useValue('actual year', { defaultValue: true });

  return (
    <UiDate date={parseISO(date)} options={{ actualYear }} format={format} />
  );
};

export default withGlobalStyles(UiDateFixture);
