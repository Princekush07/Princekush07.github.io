import { useCallback, useEffect, useMemo, useState } from "react";
import { flattenDays, roadmapMeta, WEEKS } from "../data/roadmap.js";

const ALL_DAYS = flattenDays(WEEKS);

function loadState() {
  try {
    const raw = localStorage.getItem(roadmapMeta.storageKey);
    if (!raw) return { completed: {}, strictBlocking: true };
    const parsed = JSON.parse(raw);
    return {
      completed: parsed.completed && typeof parsed.completed === "object" ? parsed.completed : {},
      strictBlocking: parsed.strictBlocking !== false,
    };
  } catch {
    return { completed: {}, strictBlocking: true };
  }
}

function blockKey(dayId, blockKey) {
  return `${dayId}:${blockKey}`;
}

export function isDayComplete(completed, dayId) {
  return ["deep", "lab", "py", "rev", "mock"].every((k) => completed[blockKey(dayId, k)]);
}

export function isDayUnlocked(completed, globalIndex) {
  if (globalIndex <= 0) return true;
  const prev = ALL_DAYS[globalIndex - 1];
  return isDayComplete(completed, prev.id);
}

export function canUnlockBlock(completed, dayId, blockKeyName, orderedKeys) {
  const day = ALL_DAYS.find((d) => d.id === dayId);
  if (!day || !isDayUnlocked(completed, day.globalIndex)) return false;
  const idx = orderedKeys.indexOf(blockKeyName);
  if (idx <= 0) return true;
  const prevKey = orderedKeys[idx - 1];
  return Boolean(completed[blockKey(dayId, prevKey)]);
}

export function useRoadmapProgress() {
  const [completed, setCompleted] = useState(() => loadState().completed);
  const [strictBlocking, setStrictBlocking] = useState(() => loadState().strictBlocking);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      roadmapMeta.storageKey,
      JSON.stringify({ completed, strictBlocking, updatedAt: new Date().toISOString() }),
    );
  }, [completed, strictBlocking, hydrated]);

  const orderedKeys = useMemo(() => ["deep", "lab", "py", "rev", "mock"], []);

  const stats = useMemo(() => {
    const totalBlocks = ALL_DAYS.length * orderedKeys.length;
    let done = 0;
    ALL_DAYS.forEach((d) => {
      orderedKeys.forEach((k) => {
        if (completed[blockKey(d.id, k)]) done += 1;
      });
    });
    const daysDone = ALL_DAYS.filter((d) => isDayComplete(completed, d.id)).length;
    return {
      totalBlocks,
      doneBlocks: done,
      percent: totalBlocks ? Math.round((done / totalBlocks) * 100) : 0,
      daysDone,
      totalDays: ALL_DAYS.length,
    };
  }, [completed, orderedKeys]);

  const toggleBlock = useCallback(
    (dayId, key) => {
      const day = ALL_DAYS.find((d) => d.id === dayId);
      if (!day) return;
      if (strictBlocking && !isDayUnlocked(completed, day.globalIndex)) return;

      const id = blockKey(dayId, key);
      const currently = Boolean(completed[id]);

      if (!currently && strictBlocking && !canUnlockBlock(completed, dayId, key, orderedKeys)) {
        return;
      }

      setCompleted((prev) => {
        const next = { ...prev };
        if (currently) {
          delete next[id];
          orderedKeys.slice(orderedKeys.indexOf(key) + 1).forEach((k) => {
            delete next[blockKey(dayId, k)];
          });
        } else {
          next[id] = true;
        }
        return next;
      });
    },
    [completed, orderedKeys, strictBlocking],
  );

  const resetProgress = useCallback(() => {
    if (window.confirm("Clear all roadmap progress on this device?")) {
      setCompleted({});
    }
  }, []);

  const exportProgress = useCallback(() => {
    const blob = new Blob(
      [JSON.stringify({ completed, strictBlocking, exportedAt: new Date().toISOString() }, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prince-roadmap-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [completed, strictBlocking]);

  const importProgress = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.completed) setCompleted(data.completed);
        if (typeof data.strictBlocking === "boolean") setStrictBlocking(data.strictBlocking);
      } catch {
        window.alert("Invalid progress file.");
      }
    };
    reader.readAsText(file);
  }, []);

  return {
    completed,
    strictBlocking,
    setStrictBlocking,
    toggleBlock,
    resetProgress,
    exportProgress,
    importProgress,
    stats,
    orderedKeys,
    allDays: ALL_DAYS,
    isDayUnlocked: (globalIndex) => isDayUnlocked(completed, globalIndex),
    isDayComplete: (dayId) => isDayComplete(completed, dayId),
    isBlockUnlocked: (dayId, key) => {
      if (!strictBlocking) return true;
      const day = ALL_DAYS.find((d) => d.id === dayId);
      if (!day || !isDayUnlocked(completed, day.globalIndex)) return false;
      return canUnlockBlock(completed, dayId, key, orderedKeys);
    },
  };
}
