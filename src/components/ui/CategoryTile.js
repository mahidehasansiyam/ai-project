import Link from "next/link";

export default function CategoryTile({
  href,
  icon,
  label,
  tint = "bg-brand-teal/10",
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-2 rounded-card border border-border bg-surface p-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-brand-teal/40 hover:shadow-lg"
    >
      <span
        className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl transition group-hover:scale-105 ${tint}`}
      >
        {icon}
      </span>
      <span className="text-xs font-medium leading-tight">{label}</span>
    </Link>
  );
}
