"use client";

import Link from "next/link";
import { label, makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";

export default function ExploreDivisions({ divisions }) {
  const lang = useLang();
  const t = makeT(lang);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 pb-24 md:pb-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-teal">
        {t("exploreKicker")}
      </p>
      <h1 className="mt-1 font-display text-3xl font-extrabold">
        {t("exploreTitle")}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">{t("exploreSub")}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {divisions.map((division) => (
          <Link
            key={division.id}
            href={`/explore/${division.id}`}
            className="group relative flex h-40 flex-col justify-end overflow-hidden rounded-card border border-border bg-gradient-to-br from-brand-navy to-brand-teal p-4 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            <span className="relative text-3xl">🗺️</span>
            <span className="relative mt-2 font-display text-lg font-bold leading-tight">
              {label(division.name, lang)}
            </span>
            <span className="relative text-xs text-white/75">
              {division.count} {t("destinationsLabel")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
