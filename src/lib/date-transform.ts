import { formatDistanceToNow } from "date-fns";

/**
 * Calculates the time passed since a given date.
 *
 * This function takes a date string or Date object, converts it to a Date object,
 * and returns a human-readable string representing the time elapsed since that date.
 *
 * @param {string | Date} dateString - The date string or Date object to calculate the time passed since.
 * @returns string - A string representing the time passed since the given date, with a suffix.
 */
export function timePassedSince(dateString: string | Date) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}
