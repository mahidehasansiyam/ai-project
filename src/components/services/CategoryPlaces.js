"use client";

import { useState } from "react";
import { placeTypeMeta } from "@/lib/catalog";
import { makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";
import PlaceCard from "@/components/ui/PlaceCard";

export default function CategoryPlaces({ category, items }) {
  const lang = useLang();
  const t = makeT(lang);
  const meta = placeTypeMeta(category);
  const [type, setType] = useState("");

  const types = [...new Set(items.map((item) => item.type))];
  const results = type ? items.filter((item) => item.type === type) : items;

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

      {types.length > 1 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => setType("")}
            className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${
              type === ""
                ? "bg-brand-teal text-white ring-brand-teal"
                : "bg-surface text-muted ring-border hover:text-brand-teal"
            }`}
          >
            {t("filterAll")}
          </button>
          {types.map((id) => {
            const tm = placeTypeMeta(id);
            return (
              <button
                key={id}
                onClick={() => setType(id)}
                className={`rounded-full px-3 py-1 text-xs font-medium ring-1 transition ${
                  type === id
                    ? "bg-brand-teal text-white ring-brand-teal"
                    : "bg-surface text-muted ring-border hover:text-brand-teal"
                }`}
              >
                {tm.icon} {lang === "bn" ? tm.bn : tm.en}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((place) => (
          <PlaceCard key={place.slug} place={place} />
        ))}
      </div>
    </div>
  );
}
