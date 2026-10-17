import { freshnessBucket } from "@/lib/freshness";
import { interpolate, makeT } from "@/lib/copy";

const STYLES = {
  fresh: "bg-success/15 text-success",
  aging: "bg-warning/15 text-warning",
  stale: "bg-danger/15 text-danger",
};

export default function FreshnessChip({ date, now, lang = "en", className = "" }) {
  const t = makeT(lang);

  if (!now) {
    return (
      <span
        className={`rounded-full bg-border/50 px-2.5 py-1 text-[11px] font-semibold text-muted ${className}`}
      >
        {t("pending")}
      </span>
    );
  }

  const { days, bucket } = freshnessBucket(date, now);
  const text =
    bucket === "stale"
      ? t("mayBeOutdated")
      : days === 0
      ? t("confirmedToday")
      : interpolate(t("confirmedDays"), { n: days });

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${STYLES[bucket]} ${className}`}
    >
      ⏱ {text}
    </span>
  );
}
