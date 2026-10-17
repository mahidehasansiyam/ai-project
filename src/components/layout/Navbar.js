"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLang, useTheme, writeStored } from "@/lib/client-store";
import { makeT } from "@/lib/copy";

export default function Navbar() {
  const lang = useLang();
  const theme = useTheme();
  const t = makeT(lang);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <header className="glass sticky top-0 z-40 border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-teal text-lg shadow-lg shadow-brand-teal/25">
            🏙️
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-extrabold tracking-tight">
              CitySheba
            </span>
            <span className="hidden text-[11px] text-muted sm:block">
              {t("tagline")}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => writeStored("theme", theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-base transition hover:border-brand-teal/50"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <div className="flex items-center rounded-full border border-border bg-surface p-0.5 text-xs font-semibold">
            <button
              onClick={() => writeStored("lang", "en")}
              className={`rounded-full px-3 py-1.5 transition ${
                lang === "en" ? "bg-brand-navy text-white" : "text-muted"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => writeStored("lang", "bn")}
              className={`rounded-full px-3 py-1.5 transition ${
                lang === "bn" ? "bg-brand-navy text-white" : "text-muted"
              }`}
            >
              বাং
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
