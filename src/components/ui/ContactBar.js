import { makeT } from "@/lib/copy";
import { mailtoReport, telLink, whatsappLink } from "@/lib/links";

export default function ContactBar({ contacts = {}, slug, lang = "en" }) {
  const t = makeT(lang);
  const { phone, whatsapp } = contacts;

  return (
    <div className="glass fixed bottom-16 left-0 right-0 z-30 border-t border-border px-4 py-3 md:bottom-0">
      <div className="mx-auto flex max-w-3xl items-center gap-2">
        <a
          href={telLink(phone)}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-teal py-3 text-sm font-semibold text-white transition hover:bg-brand-teal/90"
        >
          📞 {t("call")}
        </a>
        <a
          href={whatsapp ? whatsappLink(whatsapp) : undefined}
          aria-disabled={!whatsapp}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition ${
            whatsapp
              ? "bg-success text-white hover:bg-success/90"
              : "cursor-not-allowed bg-border text-muted"
          }`}
        >
          💬 {t("whatsapp")}
        </a>
        <a
          href={mailtoReport(slug)}
          className="flex items-center justify-center gap-2 rounded-full border border-border px-4 py-3 text-sm font-semibold text-muted transition hover:border-danger/50 hover:text-danger"
        >
          ⚑ {t("report")}
        </a>
      </div>
    </div>
  );
}
