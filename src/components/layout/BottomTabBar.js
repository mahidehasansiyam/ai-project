"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";

const TABS = [
  { href: "/", icon: "🏠", key: "navHome" },
  { href: "/search", icon: "🔍", key: "navSearch" },
  { href: "/explore", icon: "🗺️", key: "navExplore" },
  { href: "/saved", icon: "❤️", key: "navSaved" },
  { href: "/compare", icon: "⚖️", key: "navCompare" },
];

export default function BottomTabBar() {
  const lang = useLang();
  const t = makeT(lang);
  const pathname = usePathname();

  return (
    <nav className="glass fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t border-border px-2 py-2 md:hidden">
      {TABS.map((tab) => {
        const active =
          tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1 text-[11px] font-medium transition ${
              active ? "text-brand-teal" : "text-muted"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {t(tab.key)}
          </Link>
        );
      })}
    </nav>
  );
}
