import { FC } from 'react';
import { formatISO, parseJSON } from 'date-fns';
import { Typography } from '@mui/material';

import { formatDate, IDateFormatOptions, UiDateFormat } from './date';
import { DateLike } from './types';

interface IProps {
  date: DateLike;
  format?: UiDateFormat;
  options?: IDateFormatOptions;
}

/**
 * Ui component for render date.
 */
export const UiDate: FC<IProps> = ({ date, format = UiDateFormat.FULL, options }) => (
  <Typography
    component='time'
    title={formatISO(parseJSON(date))}
    dateTime={formatDate(parseJSON(date), UiDateFormat.DIGITS)}
  >
    {formatDate(parseJSON(date), format, options)}
  </Typography>
);
