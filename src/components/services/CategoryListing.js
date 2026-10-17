"use client";

import { useMemo, useState } from "react";
import { categoryMeta } from "@/lib/catalog";
import { makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";
import { filterListings, sortListings } from "@/lib/search";
import ListingCard from "@/components/ui/ListingCard";

export default function CategoryListing({ category, items }) {
  const lang = useLang();
  const t = makeT(lang);
  const meta = categoryMeta(category);
  const [sort, setSort] = useState("newest");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const results = useMemo(
    () => sortListings(filterListings(items, { verifiedOnly }), sort),
    [items, sort, verifiedOnly]
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 pb-24 md:pb-10">
      <div className="flex items-center gap-3">
        <span className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${meta.chip}`}>
          {meta.icon}
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold">
            {lang === "bn" ? meta.bn : meta.en}
          </h1>
          <p className="text-sm text-muted">
            {results.length} {t("results")}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted">{t("sort")}</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand-teal/60"
          >
            <option value="newest">{t("sortNewest")}</option>
            <option value="price-asc">{t("sortPriceAsc")}</option>
            <option value="price-desc">{t("sortPriceDesc")}</option>
          </select>
        </label>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(event) => setVerifiedOnly(event.target.checked)}
            className="h-4 w-4 accent-brand-teal"
          />
          {t("filterVerified")}
        </label>
      </div>

      {results.length === 0 ? (
        <p className="mt-6 rounded-card border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
          {t("noResults")}
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
