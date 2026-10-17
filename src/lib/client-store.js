"use client";

import { useRef, useSyncExternalStore } from "react";

const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function emit() {
  for (const callback of listeners) callback();
}

export function writeStored(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    return;
  }
  emit();
}

/**
 * Read a localStorage value without tripping the
 * `react-hooks/set-state-in-effect` rule or causing hydration mismatches.
 */
export function useStoredValue(key, serverFallback, clientFallback) {
  const getClientSnapshot = () => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) return raw;
    } catch {
      return serverFallback;
    }
    return clientFallback ? clientFallback() : serverFallback;
  };

  return useSyncExternalStore(subscribe, getClientSnapshot, () => serverFallback);
}

/**
 * Reactive JSON value from localStorage. `fallback` must be a stable value
 * (module-level constant) so the prerender snapshot stays consistent.
 */
export function useStoredJson(key, fallback) {
  const serverRawRef = useRef(null);
  if (serverRawRef.current === null) {
    serverRawRef.current = JSON.stringify(fallback ?? null);
  }
  const serverRaw = serverRawRef.current;

  const getSnapshot = () => {
    try {
      return window.localStorage.getItem(key) ?? serverRaw;
    } catch {
      return serverRaw;
    }
  };

  const raw = useSyncExternalStore(subscribe, getSnapshot, () => serverRaw);
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStoredJson(key, value) {
  writeStored(key, JSON.stringify(value));
}

export function useLang() {
  return useStoredValue("lang", "en");
}

export function useTheme() {
  return useStoredValue("theme", "light", () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
}

let currentTime = 0;
let timer = null;
const timeListeners = new Set();

function subscribeTime(callback) {
  timeListeners.add(callback);
  if (!timer) {
    currentTime = Date.now();
    timer = setInterval(() => {
      currentTime = Date.now();
      for (const listener of timeListeners) listener();
    }, 60_000);
  }
  return () => {
    timeListeners.delete(callback);
    if (timeListeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

/** Current time in ms; 0 during prerender so it is recomputed per visit. */
export function useNow() {
  return useSyncExternalStore(subscribeTime, () => currentTime, () => 0);
}
