import { FC } from 'react';
import { formatISO } from 'date-fns';
import { Typography } from '@mui/material';

import { format as timeFormat } from './time';

interface IProps {
  time: Date;
}

/**
 * Ui component for render time.
 */
export const UiTime: FC<IProps> = ({ time }) => (
  <Typography
    variant='caption'
    component='time'
    title={formatISO(time)}
    dateTime={timeFormat(time)}
  >
    {timeFormat(time)}
  </Typography>
);
