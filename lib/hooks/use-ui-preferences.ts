"use client";

import { useCallback, useEffect, useState } from "react";

const RECENTLY_VIEWED_KEY = "suradiq-recently-viewed";
const MAX_RECENT = 12;

function readIds(key: string) {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  const value = window.localStorage.getItem(key);
  if (!value) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(ids));
}

export function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(readIds(RECENTLY_VIEWED_KEY));
  }, []);

  const addRecentlyViewed = useCallback((productId: string) => {
    setIds((prev) => {
      const deduped = [productId, ...prev.filter((id) => id !== productId)].slice(
        0,
        MAX_RECENT,
      );
      writeIds(RECENTLY_VIEWED_KEY, deduped);
      return deduped;
    });
  }, []);

  return {
    recentlyViewedIds: ids,
    addRecentlyViewed,
  };
}
