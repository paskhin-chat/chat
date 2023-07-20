import { format as baseFormat } from 'date-fns';

/**
 * Formats time.
 */
export function format(date: Date): string {
  return baseFormat(date, 'HH:mm');
}
