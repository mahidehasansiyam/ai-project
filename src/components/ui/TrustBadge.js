import { makeT } from "@/lib/copy";

/**
 * Verification / sponsored badge. Sponsored is deliberately styled as a neutral
 * label, never as a quality or verified signal (see Read.md product principles).
 */
export default function TrustBadge({
  verification,
  sponsored = false,
  lang = "en",
  className = "",
}) {
  const t = makeT(lang);
  const badge = sponsored
    ? { text: t("sponsored"), cls: "bg-brand-navy/85 text-white" }
    : verification === "verified"
    ? { text: t("verified"), cls: "bg-success text-white" }
    : { text: t("unverified"), cls: "bg-border/80 text-muted" };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${badge.cls} ${className}`}
    >
      {sponsored ? "★ " : verification === "verified" ? "✓ " : ""}
      {badge.text}
    </span>
  );
}
