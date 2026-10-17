"use client";

import Link from "next/link";
import { PLACE } from "@/lib/catalog";
import { label, makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";

export default function DivisionDestinations({ division, items }) {
  const lang = useLang();
  const t = makeT(lang);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 pb-24 md:pb-10">
      <Link
        href="/explore"
        className="text-xs font-semibold text-brand-teal hover:underline"
      >
        ← {t("allDivisions")}
      </Link>
      <h1 className="mt-3 font-display text-3xl font-extrabold">
        {label(division.name, lang)}
      </h1>
      <p className="mt-1 text-sm text-muted">
        {items.length} {t("destinationsLabel")}
      </p>

      {items.length === 0 ? (
        <p className="mt-6 rounded-card border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
          {t("noResults")}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((place) => {
            const meta = PLACE[place.category] ?? PLACE.heritage;
            return (
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
            );
          })}
        </div>
      )}
    </div>
  );
}
