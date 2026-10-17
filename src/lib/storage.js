import { useStoredJson, writeStoredJson } from "./client-store";

const SAVED_KEY = "saved";
const COMPARE_KEY = "compare";
const REVIEWS_KEY = "reviews";
const MAX_COMPARE = 3;

const EMPTY_LIST = [];
const EMPTY_MAP = {};

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function useSaved() {
  return useStoredJson(SAVED_KEY, EMPTY_LIST);
}

export function toggleSaved(slug) {
  const list = readJson(SAVED_KEY, EMPTY_LIST);
  const next = list.includes(slug)
    ? list.filter((item) => item !== slug)
    : [...list, slug];
  writeStoredJson(SAVED_KEY, next);
  return next.includes(slug);
}

export function useCompare() {
  return useStoredJson(COMPARE_KEY, EMPTY_LIST);
}

export function toggleCompare(slug) {
  const list = readJson(COMPARE_KEY, EMPTY_LIST);
  if (list.includes(slug)) {
    const next = list.filter((item) => item !== slug);
    writeStoredJson(COMPARE_KEY, next);
    return { list: next, added: false, full: false };
  }
  if (list.length >= MAX_COMPARE) {
    return { list, added: false, full: true };
  }
  const next = [...list, slug];
  writeStoredJson(COMPARE_KEY, next);
  return { list: next, added: true, full: false };
}

export function clearCompare() {
  writeStoredJson(COMPARE_KEY, EMPTY_LIST);
}

export function useReviews(slug) {
  const all = useStoredJson(REVIEWS_KEY, EMPTY_MAP);
  return all[slug] ?? EMPTY_LIST;
}

export function addReview(slug, review) {
  const all = readJson(REVIEWS_KEY, EMPTY_MAP);
  const list = all[slug] ?? [];
  const next = { ...all, [slug]: [...list, review] };
  writeStoredJson(REVIEWS_KEY, next);
  return next[slug];
}
