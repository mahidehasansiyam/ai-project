"use client";

import { useState } from "react";
import { makeT } from "@/lib/copy";
import { useLang } from "@/lib/client-store";
import { addReview, useReviews } from "@/lib/storage";

function Stars({ value = 0, size = "text-base" }) {
  return (
    <span className={`${size} text-warning`} aria-label={`${value} / 5`}>
      {"★".repeat(Math.round(value))}
      <span className="text-border">{"★".repeat(5 - Math.round(value))}</span>
    </span>
  );
}

export default function Reviews({ slug }) {
  const lang = useLang();
  const t = makeT(lang);
  const reviews = useReviews(slug);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const average = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const submit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    addReview(slug, {
      rating,
      text: text.trim(),
      name: name.trim() || undefined,
      at: Date.now(),
    });
    setText("");
    setName("");
    setRating(5);
  };

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold">{t("reviews")}</h2>
        {reviews.length ? (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Stars value={average} />
            <span>
              {average.toFixed(1)} · {reviews.length}
            </span>
          </div>
        ) : null}
      </div>

      {reviews.length === 0 ? (
        <p className="mt-3 rounded-card border border-dashed border-border bg-surface p-4 text-sm text-muted">
          {t("noReviewsYet")}
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          {reviews.map((review, index) => (
            <li
              key={index}
              className="rounded-card border border-border bg-surface p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">
                  {review.name || (lang === "bn" ? "অতিথি" : "Guest")}
                </span>
                <Stars value={review.rating} size="text-sm" />
              </div>
              <p className="mt-1 text-sm text-muted">{review.text}</p>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={submit}
        className="mt-5 rounded-card border border-border bg-surface p-4"
      >
        <h3 className="text-sm font-semibold">{t("writeReview")}</h3>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-muted">{t("rating")}</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                aria-label={`${value} star`}
                className={`text-xl leading-none transition ${
                  value <= rating ? "text-warning" : "text-border"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t("reviewName")}
          className="mt-3 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand-teal/60"
        />
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={t("reviewText")}
          rows={3}
          className="mt-2 w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-brand-teal/60"
        />
        <button
          type="submit"
          className="mt-3 rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-teal/90"
        >
          {t("submitReview")}
        </button>
      </form>
    </section>
  );
}
