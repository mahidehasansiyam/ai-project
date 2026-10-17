"use client";

import { useState } from "react";
import { makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";
import { filterRoutes } from "@/lib/search";

export default function TrainList({ routes }) {
  const lang = useLang();
  const t = makeT(lang);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const origins = [...new Set(routes.map((route) => route.origin))];
  const destinations = [...new Set(routes.map((route) => route.destination))];
  const results = filterRoutes(routes, { origin, destination });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-6 pb-24 md:pb-10">
      <h1 className="font-display text-2xl font-bold">{t("trainSchedules")}</h1>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">
            {lang === "bn" ? "যাত্রাস্থান" : "From"}
          </span>
          <select
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand-teal/60"
          >
            <option value="">{t("filterAll")}</option>
            {origins.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">
            {lang === "bn" ? "গন্তব্য" : "To"}
          </span>
          <select
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand-teal/60"
          >
            <option value="">{t("filterAll")}</option>
            {destinations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 space-y-3">
        {results.map((route) => (
          <article
            key={route.id}
            className="rounded-card border border-border bg-surface p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold">
                {route.origin} → {route.destination}
              </h2>
              <span className="rounded-full bg-brand-purple/10 px-2 py-0.5 text-[11px] font-semibold text-brand-purple">
                {route.trainType}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">{route.operator}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-display text-base font-extrabold text-brand-teal">
                ৳{route.fare.toLocaleString("en-US")}
              </span>
              {route.departures.map((time) => (
                <span
                  key={time}
                  className="rounded-full border border-border px-2 py-0.5"
                >
                  🕐 {time}
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-muted">
                {lang === "bn" ? "আপডেট" : "Updated"} {route.updatedAt}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${route.counterPhone}`}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition hover:border-brand-teal/50 hover:text-brand-teal"
                >
                  📞 {t("call")}
                </a>
                {route.bookingUrl ? (
                  <a
                    href={route.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-brand-teal px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-teal/90"
                  >
                    🎫 {t("bookNow")}
                  </a>
                ) : null}
              </div>
            </div>
            {route.bookingUrl ? (
              <p className="mt-2 text-[11px] text-muted">↗ {t("externalNotice")}</p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
