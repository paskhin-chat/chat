import { FC } from 'react';
import { formatISO } from 'date-fns';

import { format as timeFormat } from './time';

interface IProps {
  time: Date;
}

/**
 * Ui component for render time.
 */
export const UiTime: FC<IProps> = ({ time }) => (
  <time title={formatISO(time)} dateTime={timeFormat(time)}>
    {timeFormat(time)}
  </time>
);
