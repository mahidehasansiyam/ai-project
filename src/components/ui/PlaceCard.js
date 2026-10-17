"use client";

import Link from "next/link";
import { placeTypeMeta } from "@/lib/catalog";
import { label, makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";

export default function PlaceCard({ place, className = "" }) {
  const lang = useLang();
  const t = makeT(lang);
  const meta = placeTypeMeta(place.type);

  return (
    <article
      className={`flex flex-col gap-3 rounded-card border border-border bg-surface p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-border/40 text-2xl">
          {meta.icon}
        </span>
        <div className="min-w-0">
          <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${meta.chip}`}>
            {lang === "bn" ? meta.bn : meta.en}
          </span>
          <h3 className="mt-1 truncate text-base font-semibold">
            {label(place.name, lang)}
          </h3>
          <p className="text-xs text-muted">📍 {place.area}</p>
        </div>
      </div>

      <dl className="space-y-1 text-xs text-muted">
        {place.speciality ? (
          <div className="flex gap-1">
            <dt className="font-medium text-foreground">{t("speciality")}:</dt>
            <dd>{label(place.speciality, lang)}</dd>
          </div>
        ) : null}
        {place.jumahTime ? (
          <div className="flex gap-1">
            <dt className="font-medium text-foreground">{t("jumahTime")}:</dt>
            <dd>{place.jumahTime}</dd>
          </div>
        ) : null}
        {place.chamberHours ? (
          <div className="flex gap-1">
            <dt className="font-medium text-foreground">{t("chamberHours")}:</dt>
            <dd>{place.chamberHours}</dd>
          </div>
        ) : null}
        {place.groups ? (
          <div className="flex gap-1">
            <dt className="font-medium text-foreground">{t("bloodGroups")}:</dt>
            <dd>{place.groups.join(", ")}</dd>
          </div>
        ) : null}
        {place.coverage ? (
          <div className="flex gap-1">
            <dt className="font-medium text-foreground">{t("coverage")}:</dt>
            <dd>{label(place.coverage, lang)}</dd>
          </div>
        ) : null}
        {place.emergencyPhone ? (
          <div className="flex gap-1 text-danger">
            <dt className="font-medium">{t("emergency")}:</dt>
            <dd>
              <a href={`tel:${place.emergencyPhone}`} className="underline">
                {place.emergencyPhone}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-auto flex flex-wrap gap-2">
        {place.contacts?.phone ? (
          <a
            href={`tel:${place.contacts.phone}`}
            className="rounded-full bg-brand-teal px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-teal/90"
          >
            📞 {t("call")}
          </a>
        ) : null}
        {place.location ? (
          <a
            href={`https://maps.google.com/?q=${place.location.lat},${place.location.lng}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition hover:border-brand-teal/50 hover:text-brand-teal"
          >
            🗺️ {t("openInMaps")}
          </a>
        ) : null}
      </div>
    </article>
  );
}
