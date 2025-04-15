import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a given date string into a human-readable format.
 *
 * @param date - A date string (ISO format recommended).
 * @returns A string formatted as "Month Day, Year" (e.g., "April 14, 2025").
 *
 * @example
 * formatDate("2025-04-14T11:00:00+08:00"); // "April 14, 2025"
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

/**
 * Returns the relative time from a given date to now (e.g., "3 weeks ago").
 *
 * @param date - A string or Date object representing the past date.
 * @returns A localized relative time string (e.g., "2 days ago", "just now").
 *
 * @example
 * getRelativeTime("2025-04-01T09:00:00+08:00"); // "2 weeks ago"
 * getRelativeTime(new Date()); // "just now"
 */
export const getRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4.34524, 'week'], // 1 month = ~4.345 weeks
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year'],
  ];

  let value = seconds;
  let unit: Intl.RelativeTimeFormatUnit = 'second';

  for (const [interval, nextUnit] of intervals) {
    unit = nextUnit;
    if (value < interval) break;
    value = value / interval;
  }

  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    -Math.floor(value),
    unit
  );
};
