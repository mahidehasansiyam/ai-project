"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";
import { filterListings, filterPlaces, sortListings } from "@/lib/search";
import FilterPanel from "@/components/ui/FilterPanel";
import ListingCard from "@/components/ui/ListingCard";
import PlaceCard from "@/components/ui/PlaceCard";
import SearchBar from "@/components/ui/SearchBar";
import listings from "@/data/listings.json";
import places from "@/data/places.json";
import areaData from "@/data/areas.json";

const AREAS = areaData.flatMap((city) =>
  city.areas.map((area) => [area.id, area.name])
);

function SearchInner() {
  const lang = useLang();
  const t = makeT(lang);
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [draft, setDraft] = useState(query);
  const [filters, setFilters] = useState(() => ({
    areaId: searchParams.get("area") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    sort: "newest",
  }));

  const listingResults = useMemo(
    () => sortListings(filterListings(listings, { q: query, ...filters }), filters.sort),
    [query, filters]
  );

  const placeResults = useMemo(
    () => filterPlaces(places, { q: query, areaId: filters.areaId }).slice(0, 6),
    [query, filters.areaId]
  );

  const submit = (value) =>
    router.push(value ? `/search?q=${encodeURIComponent(value)}` : "/search");

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pt-6 pb-24 md:pb-10">
      <h1 className="font-display text-2xl font-bold">
        {query ? `“${query}”` : t("searchTitle")}
      </h1>
      <p className="mt-1 text-sm text-muted">{t("searchSub")}</p>

      <div className="mt-4 max-w-2xl">
        <SearchBar
          value={draft}
          onChange={setDraft}
          onSubmit={submit}
          placeholder={t("searchPlaceholder")}
          buttonLabel={t("search")}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onClear={() => setFilters({ sort: "newest" })}
            areas={AREAS}
          />
        </aside>

        <div>
          <p className="mb-3 text-sm text-muted">
            <span className="font-semibold text-foreground">
              {listingResults.length}
            </span>{" "}
            {t("results")}
          </p>

          {listingResults.length === 0 ? (
            <p className="rounded-card border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
              {t("noResults")}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {listingResults.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          )}

          {placeResults.length ? (
            <section className="mt-10">
              <h2 className="font-display text-xl font-bold">{t("placesLabel")}</h2>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {placeResults.map((place) => (
                  <PlaceCard key={place.slug} place={place} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted">…</div>}>
      <SearchInner />
    </Suspense>
  );
}
