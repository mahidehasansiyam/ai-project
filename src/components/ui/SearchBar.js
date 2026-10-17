"use client";

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search…",
  buttonLabel = "Search",
  size = "md",
}) {
  const pad = size === "lg" ? "p-1.5" : "p-1";
  const input = size === "lg" ? "py-2.5" : "py-2";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(value);
      }}
      className={`flex items-center gap-2 rounded-full bg-white ${pad} shadow-xl shadow-black/10`}
    >
      <span className="pl-3 text-lg">🔍</span>
      <input
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className={`min-w-0 flex-1 bg-transparent px-1 ${input} text-sm text-brand-navy placeholder:text-slate-400 focus:outline-none`}
      />
      <button
        type="submit"
        className="rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-teal/90"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
