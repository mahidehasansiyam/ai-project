"use client";

import Link from "next/link";
import { PLACE } from "@/lib/catalog";
import { label, makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";

function ExternalNotice({ lang }) {
  const t = makeT(lang);
  return (
    <span className="text-[11px] text-muted">↗ {t("externalNotice")}</span>
  );
}

export default function DestinationDetail({ destination, nearby = [] }) {
  const lang = useLang();
  const t = makeT(lang);
  const meta = PLACE[destination.category] ?? PLACE.heritage;
  const fee = destination.entryFee;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-24 md:pb-10">
      <Link
        href={`/explore/${destination.division}`}
        className="text-xs font-semibold text-brand-teal hover:underline"
      >
        ← {t("back")}
      </Link>

      <div
        className={`relative mt-4 grid h-56 place-items-center overflow-hidden rounded-card bg-gradient-to-br ${meta.chip} via-brand-navy to-brand-navy text-8xl sm:h-72`}
      >
        {meta.icon}
      </div>

      <div className="mt-5">
        <span className="inline-block rounded-full bg-brand-teal/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-teal">
          {lang === "bn" ? meta.bn : meta.en}
        </span>
        <h1 className="mt-2 font-display text-3xl font-extrabold">
          {label(destination.name, lang)}
        </h1>
        <p className="mt-1 text-sm capitalize text-muted">
          📍 {destination.district} · {destination.division}
        </p>
      </div>

      {destination.description ? (
        <p className="mt-5 text-sm leading-relaxed text-muted">
          {label(destination.description, lang)}
        </p>
      ) : null}

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        {destination.bestSeason ? (
          <div className="rounded-card border border-border bg-surface p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t("bestSeason")}
            </dt>
            <dd className="mt-1 text-sm font-medium">
              🌤 {destination.bestSeason}
            </dd>
          </div>
        ) : null}
        {fee ? (
          <div className="rounded-card border border-border bg-surface p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t("entryFee")}
            </dt>
            <dd className="mt-1 text-sm font-medium">
              {fee.amount === 0
                ? `🎟 ${t("feeFree")}`
                : fee.verified
                ? `🎟 ৳${Number(fee.amount).toLocaleString("en-US")}`
                : `🎟 ${t("feeUnverified")}`}
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {destination.mapLink ? (
          <div className="flex flex-col gap-1">
            <a
              href={destination.mapLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-brand-teal px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-teal/90"
            >
              🗺️ {t("directions")}
            </a>
            <ExternalNotice lang={lang} />
          </div>
        ) : null}
        {destination.sourceUrl ? (
          <div className="flex flex-col gap-1">
            <a
              href={destination.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold transition hover:border-brand-teal/50 hover:text-brand-teal"
            >
              🔗 {t("source")}
            </a>
            <ExternalNotice lang={lang} />
          </div>
        ) : null}
      </div>

      {nearby.length ? (
        <section className="mt-8">
          <h2 className="font-display text-xl font-bold">{t("nearby")}</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {nearby.map((place) => {
              const nearMeta = PLACE[place.category] ?? PLACE.heritage;
              return (
                <Link
                  key={place.slug}
                  href={`/explore/${place.division}/${place.slug}`}
                  className="flex items-center gap-3 rounded-card border border-border bg-surface p-3 transition hover:border-brand-teal/40 hover:shadow-sm"
                >
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-border/40 text-xl">
                    {nearMeta.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">
                      {label(place.name, lang)}
                    </span>
                    <span className="block truncate text-xs text-muted">
                      {place.district}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
