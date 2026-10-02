import { useCallback, useEffect, useRef, useState } from "react";
import type { Chore, Done } from "../types";

export interface WeeklyState {
  chores: Chore[];
  done: Done;
}

const EMPTY: WeeklyState = { chores: [], done: {} };

const GIST_ID = import.meta.env.VITE_GH_GIST_ID as string | undefined;
const TOKEN = import.meta.env.VITE_GH_TOKEN as string | undefined;

const isConfigured = !!(GIST_ID && TOKEN);

async function fetchState(): Promise<WeeklyState> {
  const res = await fetch("/.netlify/functions/gist-sync");
  if (!res.ok) throw new Error("Error fetching state");
  return res.json();
}

async function saveState(state: WeeklyState): Promise<void> {
  const res = await fetch("/.netlify/functions/gist-sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  });
  if (!res.ok) throw new Error("Error saving state");
}

export type SyncStatus = "idle" | "loading" | "saving" | "error";

const DEBOUNCE_MS = 800;

export function useGitHubStorage() {
  const [state, setState] = useState<WeeklyState>(EMPTY);
  const [status, setStatus] = useState<SyncStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const initializedRef = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef<WeeklyState | null>(null);
  const savingRef = useRef(false);

  // ── Carga inicial ─────────────────────────────────────────────
  useEffect(() => {
    if (!isConfigured) {
      console.warn("[useGitHubStorage] Variables VITE_GH_* no configuradas.");
      initializedRef.current = true;
      return;
    }
    setStatus("loading");
    fetchState()
      .then((remote) => {
        setState(remote);
        setStatus("idle");
        setTimeout(() => {
          initializedRef.current = true;
        }, 0);
      })
      .catch((err) => {
        setError(String(err));
        setStatus("error");
        initializedRef.current = true;
      });
  }, []);

  // ── Guardado con debounce ─────────────────────────────────────
  useEffect(() => {
    if (!initializedRef.current || !isConfigured) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    pendingRef.current = state;

    debounceRef.current = setTimeout(async () => {
      if (savingRef.current || !pendingRef.current) return;
      savingRef.current = true;
      setStatus("saving");
      try {
        await saveState(pendingRef.current);
        pendingRef.current = null;
        setStatus("idle");
        setError(null);
      } catch (err) {
        setError(String(err));
        setStatus("error");
      } finally {
        savingRef.current = false;
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [state]);

  const updateState = useCallback(
    (updater: (prev: WeeklyState) => WeeklyState) => {
      setState((prev) => updater(prev));
    },
    [],
  );

  return { state, updateState, status, error };
}
