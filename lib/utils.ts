import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: "long",
    day: "numeric",
    year: "numeric"
  })
}

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
