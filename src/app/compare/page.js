"use client";

import Link from "next/link";
import { categoryMeta } from "@/lib/catalog";
import { label, makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";
import { clearCompare, toggleCompare, useCompare } from "@/lib/storage";
import TrustBadge from "@/components/ui/TrustBadge";
import listings from "@/data/listings.json";

const UNITS = { month: "perMonth", night: "perNight", visit: "perVisit", unit: "perUnit" };

function money(value) {
  return `৳${Number(value || 0).toLocaleString("en-US")}`;
}

function format(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).replace(/-/g, " ")).join(", ");
  }
  if (typeof value === "string") return value.replace(/-/g, " ");
  return value ?? "";
}

const ROWS = [
  { key: "price", label: "basePrice", get: (l) => money(l.price?.amount) },
  { key: "area", label: "filterArea", get: (l) => l.area },
  { key: "roomType", label: "fieldRoomType", get: (l) => l.details?.roomType },
  { key: "occupancy", label: "fieldOccupancy", get: (l) => l.details?.occupancy },
  { key: "gender", label: "fieldGender", get: (l) => l.details?.genderPolicy },
  { key: "seats", label: "fieldSeats", get: (l) => l.details?.seatsOpen },
  { key: "response", label: "fieldResponse", get: (l) => l.details?.responseTime },
  { key: "subjects", label: "fieldSubjects", get: (l) => l.details?.subjects },
  { key: "classes", label: "fieldClasses", get: (l) => l.details?.classes },
  { key: "facilities", label: "facilities", get: (l) => l.details?.facilities },
  { key: "speciality", label: "speciality", get: (l) => l.details?.specialities },
  { key: "confirmed", label: "lastConfirmed", get: (l) => l.confirmedAt },
];

export default function ComparePage() {
  const lang = useLang();
  const t = makeT(lang);
  const slugs = useCompare();
  const items = slugs
    .map((slug) => listings.find((listing) => listing.slug === slug))
    .filter(Boolean);

  const rows = ROWS.filter((row) =>
    items.some((listing) => {
      const value = row.get(listing);
      return Array.isArray(value) ? value.length > 0 : value !== undefined && value !== "";
    })
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 pb-24 md:pb-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold">{t("compareTitle")}</h1>
          <p className="mt-1 text-sm text-muted">{t("compareSub")}</p>
        </div>
        {items.length > 0 ? (
          <button
            onClick={clearCompare}
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted transition hover:border-danger/50 hover:text-danger"
          >
            {t("clearAll")}
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-card border border-dashed border-border bg-surface p-8 text-center">
          <p className="text-sm text-muted">{t("compareEmpty")}</p>
          <Link
            href="/search"
            className="mt-4 inline-block rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-teal/90"
          >
            {t("browseListings")}
          </Link>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-card border border-border bg-surface">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-40 border-b border-border p-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("compareTitle")}
                </th>
                {items.map((listing) => {
                  const meta = categoryMeta(listing.category);
                  return (
                    <th
                      key={listing.slug}
                      className="border-b border-border p-3 text-left align-top"
                    >
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${meta.chip}`}>
                        {meta.icon} {lang === "bn" ? meta.bn : meta.en}
                      </span>
                      <Link
                        href={`/listing/${listing.slug}`}
                        className="mt-1 block font-semibold hover:text-brand-teal"
                      >
                        {label(listing.title, lang)}
                      </Link>
                      <button
                        onClick={() => toggleCompare(listing.slug)}
                        className="mt-2 text-[11px] font-semibold text-danger hover:underline"
                      >
                        ✕ {t("remove")}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="border-b border-border p-3 text-left text-xs font-medium text-muted">
                  {t("basePrice")}
                </th>
                {items.map((listing) => (
                  <td
                    key={listing.slug}
                    className="border-b border-border p-3 font-display font-extrabold text-brand-teal"
                  >
                    {money(listing.price?.amount)}
                    <span className="text-xs font-medium text-muted">
                      /{t(UNITS[listing.price?.unit] ?? "perUnit")}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <th className="border-b border-border p-3 text-left text-xs font-medium text-muted">
                  {t("verified")}
                </th>
                {items.map((listing) => (
                  <td key={listing.slug} className="border-b border-border p-3">
                    <TrustBadge
                      verification={listing.verification}
                      sponsored={listing.sponsored}
                      lang={lang}
                    />
                  </td>
                ))}
              </tr>
              {rows.map((row) => (
                <tr key={row.key}>
                  <th className="border-b border-border p-3 text-left text-xs font-medium text-muted">
                    {t(row.label)}
                  </th>
                  {items.map((listing) => (
                    <td
                      key={listing.slug}
                      className="border-b border-border p-3 capitalize"
                    >
                      {format(row.get(listing)) || "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
