"use client";

import { makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";
import { whatsappLink } from "@/lib/links";

export default function PortalPage() {
  const lang = useLang();
  const t = makeT(lang);
  const steps = [t("portalStep1"), t("portalStep2"), t("portalStep3")];

  const waText =
    lang === "bn"
      ? "আমি CitySheba-তে আমার সেবা যোগ করতে চাই।"
      : "I would like to add my service to CitySheba.";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-24 md:pb-10">
      <div className="rounded-[28px] border border-border bg-gradient-to-br from-surface to-surface-strong p-8 shadow-sm">
        <h1 className="font-display text-3xl font-extrabold">{t("portalTitle")}</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">{t("portalSub")}</p>

        <ol className="mt-6 space-y-3">
          {steps.map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-brand-teal/15 text-xs font-bold text-brand-teal">
                {index + 1}
              </span>
              <span className="text-sm text-muted">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={whatsappLink("+8801700000000", waText)}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-success px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-success/90"
          >
            💬 {t("portalWhatsapp")}
          </a>
          <a
            href="mailto:admin@citysheba.com?subject=Add%20my%20service"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-brand-teal/50 hover:text-brand-teal"
          >
            ✉️ {t("portalEmail")}
          </a>
        </div>

        <p className="mt-4 text-[11px] text-muted">↗ {t("externalNotice")}</p>
      </div>
    </div>
  );
}
