"use client";

import Link from "next/link";
import { categoryMeta } from "@/lib/catalog";
import { label, makeT } from "@/lib/copy";
import { useLang, useNow } from "@/lib/client-store";
import { toggleCompare, toggleSaved, useCompare, useSaved } from "@/lib/storage";
import ContactBar from "@/components/ui/ContactBar";
import FreshnessChip from "@/components/ui/FreshnessChip";
import TrustBadge from "@/components/ui/TrustBadge";
import Reviews from "./Reviews";

const UNIT_KEYS = {
  month: "perMonth",
  night: "perNight",
  visit: "perVisit",
  unit: "perUnit",
};

function money(value) {
  return `৳${Number(value || 0).toLocaleString("en-US")}`;
}

export default function ListingDetail({ listing }) {
  const lang = useLang();
  const now = useNow();
  const t = makeT(lang);
  const meta = categoryMeta(listing.category);

  const saved = useSaved().includes(listing.slug);
  const inCompare = useCompare().includes(listing.slug);

  const base = listing.price?.amount ?? 0;
  const extras = listing.extras ?? [];
  const extrasTotal = extras.reduce((sum, extra) => sum + (extra.amount ?? 0), 0);
  const unit = t(UNIT_KEYS[listing.price?.unit] ?? "perUnit") || listing.price?.unit;

  const facilities = listing.details?.facilities ?? [];
  const specialities = listing.details?.specialities ?? [];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-40 pt-5">
      <div className="flex items-center justify-between">
        <Link
          href="/search"
          className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition hover:text-brand-teal"
        >
          ← {t("back")}
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => toggleSaved(listing.slug)}
            aria-pressed={saved}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              saved
                ? "border-danger/40 bg-danger/10 text-danger"
                : "border-border hover:border-brand-teal/50 hover:text-brand-teal"
            }`}
          >
            {saved ? "❤️" : "🤍"} {saved ? t("saved") : t("save")}
          </button>
          <button
            onClick={() => toggleCompare(listing.slug)}
            aria-pressed={inCompare}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              inCompare
                ? "border-brand-teal/50 bg-brand-teal/10 text-brand-teal"
                : "border-border hover:border-brand-teal/50 hover:text-brand-teal"
            }`}
          >
            ⚖️ {inCompare ? t("inCompare") : t("compare")}
          </button>
        </div>
      </div>

      <div
        className={`relative mt-4 grid h-56 place-items-center overflow-hidden rounded-card bg-gradient-to-br ${meta.thumb} bg-surface-strong sm:h-72`}
      >
        <span className="text-8xl opacity-90">{meta.icon}</span>
        <FreshnessChip
          date={listing.confirmedAt}
          now={now}
          lang={lang}
          className="absolute left-4 top-4"
        />
        <TrustBadge
          verification={listing.verification}
          sponsored={listing.sponsored}
          lang={lang}
          className="absolute right-4 top-4 shadow-sm"
        />
      </div>

      <div className="mt-5">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${meta.chip}`}>
          {lang === "bn" ? meta.bn : meta.en}
        </span>
        <h1 className="mt-2 font-display text-3xl font-extrabold">
          {label(listing.title, lang)}
        </h1>
        <p className="mt-1 text-sm text-muted">📍 {listing.area}</p>
      </div>

      <div className="mt-5 rounded-card border border-border bg-surface p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted">{t("basePrice")}</span>
          <span className="font-display text-2xl font-extrabold text-brand-teal">
            {money(base)}
            <span className="text-sm font-medium text-muted">/{unit}</span>
          </span>
        </div>

        {extras.length ? (
          <div className="mt-3 border-t border-border pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t("priceBreakdown")}
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {extras.map((extra, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {label(extra.label, lang)}
                    {extra.kind === "estimate" ? " ~" : ""}
                  </span>
                  <span className="text-muted">{money(extra.amount)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex justify-between border-t border-border pt-2 text-sm font-semibold">
              <span>{t("estTotal")}</span>
              <span>{money(base + extrasTotal)}</span>
            </div>
          </div>
        ) : null}
      </div>

      {facilities.length ? (
        <div className="mt-5">
          <h2 className="font-display text-lg font-bold">{t("facilities")}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {facilities.map((facility) => (
              <span
                key={facility}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs capitalize"
              >
                {facility.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {specialities.length ? (
        <div className="mt-5">
          <h2 className="font-display text-lg font-bold">{t("speciality")}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {specialities.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs capitalize"
              >
                {item.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {listing.links?.booking || listing.links?.map ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {listing.links?.booking ? (
            <a
              href={listing.links.booking}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-blue px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-blue/90"
            >
              🎫 {t("bookNow")}
            </a>
          ) : null}
          {listing.links?.map ? (
            <a
              href={listing.links.map}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold transition hover:border-brand-teal/50 hover:text-brand-teal"
            >
              🗺️ {t("openInMaps")}
            </a>
          ) : null}
          <span className="text-[11px] text-muted">↗ {t("externalNotice")}</span>
        </div>
      ) : null}

      <Reviews slug={listing.slug} />

      <ContactBar contacts={listing.contacts} slug={listing.slug} lang={lang} />
    </div>
  );
}
