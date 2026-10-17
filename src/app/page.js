"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HUBS, PLACE } from "@/lib/catalog";
import { label, makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";
import { filterListings, sortListings } from "@/lib/search";
import SearchBar from "@/components/ui/SearchBar";
import ListingCard from "@/components/ui/ListingCard";
import CategoryTile from "@/components/ui/CategoryTile";
import listings from "@/data/listings.json";
import destinations from "@/data/destinations.json";

export default function Home() {
  const lang = useLang();
  const t = makeT(lang);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");

  const areas = useMemo(() => {
    const seen = new Map();
    for (const item of listings) if (!seen.has(item.areaId)) seen.set(item.areaId, item.area);
    return [...seen.entries()];
  }, []);

  const recent = useMemo(
    () =>
      sortListings(
        filterListings(listings, {
          q: query,
          areaId: area === "all" ? undefined : area,
        }),
        "newest"
      ).slice(0, 8),
    [query, area]
  );

  const submitSearch = (value) =>
    router.push(value ? `/search?q=${encodeURIComponent(value)}` : "/search");

  return (
    <div className="pb-24 md:pb-0">
      {/* Hero */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-6 sm:pt-10">
        <div className="animate-rise relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-navy via-brand-navy to-brand-teal px-6 py-10 text-white shadow-2xl shadow-brand-navy/20 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand-teal/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-brand-blue/25 blur-3xl" />

          <div className="relative max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20">
              ✨ {t("heroBadge")}
            </p>
            <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-3 text-sm text-white/80 sm:text-base">{t("heroSub")}</p>

            <div className="mt-6">
              <SearchBar
                size="lg"
                value={query}
                onChange={setQuery}
                onSubmit={submitSearch}
                placeholder={t("searchPlaceholder")}
                buttonLabel={t("search")}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setArea("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${
                  area === "all"
                    ? "bg-white text-brand-navy ring-white"
                    : "bg-white/10 text-white ring-white/20 hover:bg-white/20"
                }`}
              >
                📍 {t("areaAll")}
              </button>
              {areas.map(([id, name]) => (
                <button
                  key={id}
                  onClick={() => setArea(id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${
                    area === id
                      ? "bg-white text-brand-navy ring-white"
                      : "bg-white/10 text-white ring-white/20 hover:bg-white/20"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hub tiles */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-teal">
          {t("hubsKicker")}
        </p>
        <h2 className="mt-1 font-display text-2xl font-bold">{t("hubsTitle")}</h2>
        <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {HUBS.map((hub) => (
            <CategoryTile
              key={hub.id}
              href={hub.href}
              icon={hub.icon}
              label={lang === "bn" ? hub.bn : hub.en}
            />
          ))}
          <Link
            href="/explore"
            className="flex flex-col items-center gap-2 rounded-card border border-dashed border-border bg-surface/50 p-4 text-center text-muted transition hover:border-brand-teal/40 hover:text-brand-teal"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-border/40 text-2xl">
              ➕
            </span>
            <span className="text-xs font-medium leading-tight">{t("more")}</span>
          </Link>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: "✅", title: t("trust1Title"), body: t("trust1Body") },
            { icon: "⏱️", title: t("trust2Title"), body: t("trust2Body") },
            { icon: "🌐", title: t("trust3Title"), body: t("trust3Body") },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-card border border-border bg-surface p-4 shadow-sm"
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-muted">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently confirmed */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-teal">
              {t("recentKicker")}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold">{t("recentTitle")}</h2>
          </div>
          <Link
            href="/search"
            className="text-sm font-semibold text-brand-teal hover:underline"
          >
            {t("viewAll")} →
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="mt-6 rounded-card border border-dashed border-border bg-surface p-8 text-center text-sm text-muted">
            {t("noResults")}
          </p>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recent.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        )}
      </section>

      {/* Explore Bangladesh */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-teal">
              {t("exploreKicker")}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold">{t("exploreTitle")}</h2>
          </div>
          <Link
            href="/explore"
            className="text-sm font-semibold text-brand-teal hover:underline"
          >
            {t("viewAll")} →
          </Link>
        </div>

        <div className="no-scrollbar -mx-4 mt-5 flex gap-4 overflow-x-auto px-4 pb-2">
          {destinations.map((place) => {
            const meta = PLACE[place.category] ?? PLACE.heritage;
            return (
              <Link
                key={place.slug}
                href={`/explore/${place.division}/${place.slug}`}
                className="group relative flex h-52 w-[220px] flex-none flex-col justify-end overflow-hidden rounded-card shadow-md transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span
                  className={`absolute inset-0 grid place-items-center bg-gradient-to-br ${meta.chip} via-brand-navy to-brand-navy text-6xl`}
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
                  <span className="block text-xs capitalize text-white/70">
                    {place.division} · {place.district}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Provider CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-10">
        <div className="flex flex-col items-start justify-between gap-4 rounded-[28px] border border-border bg-gradient-to-br from-surface to-surface-strong p-8 shadow-sm sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold">{t("ctaTitle")}</h2>
            <p className="mt-1 text-sm text-muted">{t("ctaBody")}</p>
          </div>
          <Link
            href="/portal"
            className="rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-teal/25 transition hover:bg-brand-teal/90"
          >
            {t("ctaBtn")}
          </Link>
        </div>
      </section>
    </div>
  );
}
