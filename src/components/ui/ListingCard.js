"use client";

import { useState } from "react";
import Link from "next/link";
import { categoryMeta } from "@/lib/catalog";
import { makeT } from "@/lib/copy";
import { useLang, useNow } from "@/lib/client-store";
import { toggleCompare, toggleSaved, useCompare, useSaved } from "@/lib/storage";
import FreshnessChip from "./FreshnessChip";
import TrustBadge from "./TrustBadge";

const UNIT_KEYS = {
  month: "perMonth",
  night: "perNight",
  visit: "perVisit",
  unit: "perUnit",
};

export default function ListingCard({ listing, className = "" }) {
  const lang = useLang();
  const now = useNow();
  const t = makeT(lang);
  const meta = categoryMeta(listing.category);

  const saved = useSaved().includes(listing.slug);
  const inCompare = useCompare().includes(listing.slug);
  const [note, setNote] = useState("");

  const amount = listing.price?.amount ?? 0;
  const unit = t(UNIT_KEYS[listing.price?.unit] ?? "perUnit") || listing.price?.unit;

  const onCompare = () => {
    const result = toggleCompare(listing.slug);
    if (result.full) setNote(t("compareFull"));
    else setNote("");
  };

  return (
    <article
      className={`group flex w-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <Link href={`/listing/${listing.slug}`} className="block">
        <div
          className={`relative h-36 bg-gradient-to-br ${meta.thumb} bg-surface-strong`}
        >
          <span className="absolute inset-0 grid place-items-center text-6xl opacity-90">
            {meta.icon}
          </span>
          <FreshnessChip
            date={listing.confirmedAt}
            now={now}
            lang={lang}
            className="absolute left-3 top-3"
          />
          <TrustBadge
            verification={listing.verification}
            sponsored={listing.sponsored}
            lang={lang}
            className="absolute right-3 top-3 shadow-sm"
          />
        </div>

        <div className="px-4 pt-4">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${meta.chip}`}>
              {lang === "bn" ? meta.bn : meta.en}
            </span>
          </div>
          <h3 className="mt-2 truncate text-base font-semibold">
            {lang === "bn" ? listing.title?.bn : listing.title?.en}
          </h3>
          <p className="text-xs text-muted">📍 {listing.area}</p>
        </div>
      </Link>

      <div className="mt-3 flex flex-1 items-end justify-between gap-2 px-4 pb-4">
        <p className="font-display text-lg font-extrabold text-brand-teal">
          ৳{amount.toLocaleString("en-US")}
          <span className="text-xs font-medium text-muted">/{unit}</span>
        </p>
        <div className="flex gap-1">
          <button
            onClick={() => toggleSaved(listing.slug)}
            aria-label={saved ? t("saved") : t("save")}
            aria-pressed={saved}
            className={`grid h-9 w-9 place-items-center rounded-full border text-sm transition ${
              saved
                ? "border-danger/40 bg-danger/10 text-danger"
                : "border-border hover:border-brand-teal/50 hover:text-brand-teal"
            }`}
          >
            {saved ? "❤️" : "🤍"}
          </button>
          <button
            onClick={onCompare}
            aria-label={t("addToCompare")}
            aria-pressed={inCompare}
            className={`grid h-9 w-9 place-items-center rounded-full border text-sm transition ${
              inCompare
                ? "border-brand-teal/50 bg-brand-teal/10 text-brand-teal"
                : "border-border hover:border-brand-teal/50 hover:text-brand-teal"
            }`}
          >
            ⚖️
          </button>
        </div>
      </div>

      {note ? (
        <p className="px-4 pb-3 text-[11px] font-medium text-warning">{note}</p>
      ) : null}
    </article>
  );
}
