"use client";

import { makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";

export default function AboutPage() {
  const lang = useLang();
  const t = makeT(lang);

  const sections = [
    {
      id: "about",
      title: t("aboutTitle"),
      body: <p className="text-sm leading-relaxed text-muted">{t("aboutBody")}</p>,
    },
    {
      id: "sample-data",
      title: `⚠ ${t("sampleTitle")}`,
      body: (
        <p className="text-sm leading-relaxed text-warning">{t("sampleBody")}</p>
      ),
    },
    {
      id: "principles",
      title: t("principlesTitle"),
      body: (
        <ul className="space-y-2 text-sm text-muted">
          {[t("principle1"), t("principle2"), t("principle3")].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-brand-teal">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "review-rules",
      title: t("reviewRulesTitle"),
      body: <p className="text-sm leading-relaxed text-muted">{t("reviewRules")}</p>,
    },
    {
      id: "privacy",
      title: t("privacyTitle"),
      body: <p className="text-sm leading-relaxed text-muted">{t("privacyBody")}</p>,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-24 md:pb-10">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-teal">
        {t("aboutKicker")}
      </p>
      <h1 className="mt-1 font-display text-3xl font-extrabold">
        {t("aboutTitle")}
      </h1>

      <div className="mt-6 space-y-5">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="rounded-card border border-border bg-surface p-5 shadow-sm"
          >
            <h2 className="font-display text-lg font-bold">{section.title}</h2>
            <div className="mt-2">{section.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
