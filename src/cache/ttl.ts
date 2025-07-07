/**
 * Redis TTLs (Time To Live) should be defined here in seconds.
 * This provides a single source of truth for cache durations.
 */
export const TTLS = {
  ONE_SECOND: 1,
  ONE_MINUTE: 60,
  ONE_HOUR: 60 * 60,
  ONE_DAY: 60 * 60 * 24,
  ONE_WEEK: 60 * 60 * 24 * 7,
  ONE_MONTH: 60 * 60 * 24 * 30,
  ONE_YEAR: 60 * 60 * 24 * 365,
};
