"use client";

import { CATEGORY } from "@/lib/catalog";
import { makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";

const SORTS = [
  { id: "newest", key: "sortNewest" },
  { id: "price-asc", key: "sortPriceAsc" },
  { id: "price-desc", key: "sortPriceDesc" },
];

const field =
  "w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none transition focus:border-brand-teal/60";

export default function FilterPanel({ filters, onChange, onClear, areas = [] }) {
  const lang = useLang();
  const t = makeT(lang);

  const set = (patch) => onChange({ ...filters, ...patch });

  return (
    <div className="rounded-card border border-border bg-surface p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">{t("filters")}</h2>
        <button
          onClick={onClear}
          className="text-xs font-semibold text-brand-teal hover:underline"
        >
          {t("clearFilters")}
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">
            {t("filterCategory")}
          </span>
          <select
            className={field}
            value={filters.category ?? ""}
            onChange={(event) => set({ category: event.target.value || undefined })}
          >
            <option value="">{t("filterAll")}</option>
            {Object.entries(CATEGORY).map(([id, meta]) => (
              <option key={id} value={id}>
                {lang === "bn" ? meta.bn : meta.en}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">
            {t("filterArea")}
          </span>
          <select
            className={field}
            value={filters.areaId ?? ""}
            onChange={(event) => set({ areaId: event.target.value || undefined })}
          >
            <option value="">{t("areaAll")}</option>
            {areas.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">
              {t("filterMinPrice")}
            </span>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              className={field}
              value={filters.minPrice ?? ""}
              onChange={(event) =>
                set({
                  minPrice: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">
              {t("filterMaxPrice")}
            </span>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              className={field}
              value={filters.maxPrice ?? ""}
              onChange={(event) =>
                set({
                  maxPrice: event.target.value ? Number(event.target.value) : undefined,
                })
              }
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">
            {t("sort")}
          </span>
          <select
            className={field}
            value={filters.sort ?? "newest"}
            onChange={(event) => set({ sort: event.target.value })}
          >
            {SORTS.map((option) => (
              <option key={option.id} value={option.id}>
                {t(option.key)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm">
          <input
            type="checkbox"
            checked={Boolean(filters.verifiedOnly)}
            onChange={(event) => set({ verifiedOnly: event.target.checked })}
            className="h-4 w-4 accent-brand-teal"
          />
          {t("filterVerified")}
        </label>
      </div>
    </div>
  );
}
