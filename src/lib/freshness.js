export function daysSince(dateStr, now) {
  if (!now || !dateStr) return 0;
  const then = new Date(`${dateStr}T00:00:00`);
  const diff = Math.floor((now - then.getTime()) / 86_400_000);
  return Number.isFinite(diff) ? Math.max(0, diff) : 0;
}

/**
 * Returns a data-only freshness verdict. UI maps `bucket` to colors/copy.
 *  fresh  -> 0-14 days
 *  aging  -> 15-30 days
 *  stale  -> 31+ days
 */
export function freshnessBucket(dateStr, now) {
  const days = daysSince(dateStr, now);
  const bucket = days <= 14 ? "fresh" : days <= 30 ? "aging" : "stale";
  return { days, bucket };
}
