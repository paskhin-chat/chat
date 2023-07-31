import { format as baseFormat, isSameYear, startOfToday } from 'date-fns';

/**
 * Formats for dates.
 */
export enum UiDateFormat {
  FULL,
  DIGITS,
}

const withYearFormats: Record<UiDateFormat, string> = {
  [UiDateFormat.FULL]: 'dd MMMM yyy',
  [UiDateFormat.DIGITS]: 'dd.MM.yyy',
};

const yearLessFormats: Record<UiDateFormat, string> = {
  [UiDateFormat.FULL]: 'dd MMMM',
  [UiDateFormat.DIGITS]: 'dd.MM',
};

/**
 * Additional options for formatting a date.
 */
export interface IDateFormatOptions {
  /**
   * Show year only for dates before current year.
   *
   * @default true
   */
  actualYear: boolean;
}

/**
 * Formats date.
 */
export function format(
  date: Date,
  ft: UiDateFormat = UiDateFormat.FULL,
  options?: IDateFormatOptions,
): string {
  const actualYear = options?.actualYear ?? true;

  const actualFormat = actualYear
    ? isSameYear(startOfToday(), date)
      ? yearLessFormats[ft]
      : withYearFormats[ft]
    : withYearFormats[ft];

  return baseFormat(date, actualFormat);
}
