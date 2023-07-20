import { FC } from 'react';
import { formatISO } from 'date-fns';

import { format as dateFormat, IDateFormatOptions, UiDateFormat } from './date';

interface IProps {
  date: Date;
  format?: UiDateFormat;
  options?: IDateFormatOptions;
}

/**
 * Ui component for render date.
 */
export const UiDate: FC<IProps> = ({
  date,
  format = UiDateFormat.FULL,
  options,
}) => (
  <time
    title={formatISO(date)}
    dateTime={dateFormat(date, UiDateFormat.DIGITS)}
  >
    {dateFormat(date, format, options)}
  </time>
);
