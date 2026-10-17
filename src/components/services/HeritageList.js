"use client";

import Link from "next/link";
import { PLACE } from "@/lib/catalog";
import { label, makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";

export default function HeritageList({ items }) {
  const lang = useLang();
  const t = makeT(lang);
  const meta = PLACE.heritage;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 pb-24 md:pb-10">
      <Link
        href="/explore"
        className="text-xs font-semibold text-brand-teal hover:underline"
      >
        ← {t("allDivisions")}
      </Link>
      <div className="mt-3 flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-purple/10 text-2xl text-brand-purple">
          {meta.icon}
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold">{t("heritage")}</h1>
          <p className="text-sm text-muted">
            {items.length} {t("destinationsLabel")}
          </p>
        </div>
      </div>
      <p className="mt-2 max-w-2xl text-sm text-muted">{t("heritageSub")}</p>

      {items.length === 0 ? (
        <p className="mt-6 rounded-card border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
          {t("noResults")}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((place) => (
            <Link
              key={place.slug}
              href={`/explore/${place.division}/${place.slug}`}
              className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-card shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span
                className={`absolute inset-0 grid place-items-center bg-gradient-to-br ${meta.chip} via-brand-navy to-brand-navy text-7xl`}
              >
                {meta.icon}
              </span>
              <span className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
              <span className="relative p-4 text-white">
                <span className="mb-1 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-medium ring-1 ring-white/20">
                  {lang === "bn" ? meta.bn : meta.en}
                </span>
                <span className="block font-display text-lg font-bold leading-tight">
                  {label(place.name, lang)}
                </span>
                <span className="block text-xs text-white/70">
                  {place.district}
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
