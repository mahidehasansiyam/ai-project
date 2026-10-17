"use client";

import Link from "next/link";
import { makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";
import { useSaved } from "@/lib/storage";
import ListingCard from "@/components/ui/ListingCard";
import listings from "@/data/listings.json";

export default function SavedPage() {
  const lang = useLang();
  const t = makeT(lang);
  const saved = useSaved();
  const items = saved
    .map((slug) => listings.find((listing) => listing.slug === slug))
    .filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 pb-24 md:pb-10">
      <h1 className="font-display text-2xl font-bold">{t("savedTitle")}</h1>
      <p className="mt-1 text-sm text-muted">{t("savedSub")}</p>

      {items.length === 0 ? (
        <div className="mt-6 rounded-card border border-dashed border-border bg-surface p-8 text-center">
          <p className="text-sm text-muted">{t("savedEmpty")}</p>
          <Link
            href="/search"
            className="mt-4 inline-block rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-teal/90"
          >
            {t("browseListings")}
          </Link>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
