/**
 * The DateLike type is designed to represent dates in a flexible and convenient format. It can be one of the following
 * types:
 *
 * - String: Expected to be a date in the ISO 8601 format, which is an international standard for representing dates and
 *   times. Examples include "2000-00-00" or "2000-00-00T00:00:00Z".
 * - Number: Represents the number of milliseconds since midnight of January 1, 1970, UTC. This is the standard time
 *   representation in JavaScript, also known as Unix time.
 * - Date: The standard JavaScript Date object, providing various methods for handling dates and times.
 */
export type DateLike = string | number | Date;
