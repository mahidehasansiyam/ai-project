"use client";

import { makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";

export default function Footer() {
  const t = makeT(useLang());
  return (
    <footer className="mx-auto mt-12 w-full max-w-7xl px-4 pb-24 text-center text-xs text-muted md:pb-8">
      <p>© CitySheba · {t("tagline")}</p>
      <p className="mt-1 font-medium text-warning">⚠ {t("sampleNotice")}</p>
    </footer>
  );
}
