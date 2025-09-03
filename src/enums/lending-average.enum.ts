export const lendingAverageTimeframes = [
  'day',
  'week',
  'month',
  'year',
  'all',
] as const;

export type ILendingAverageTimeFrame =
  (typeof lendingAverageTimeframes)[number];
