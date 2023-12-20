import { format as baseFormat, parseJSON } from "date-fns";
import { DateLike } from "./types";

/**
 * Formats time.
 */
export function formatTime(date: DateLike): string {
  return baseFormat(parseJSON(date), "HH:mm");
}
