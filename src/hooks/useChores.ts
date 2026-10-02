import { useGitHubStorage } from "./useGitHubStorage";
import { MEMBERS, type Member } from "../types";

const newId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export function useChores() {
  const { state, updateState, status, error } = useGitHubStorage();
  const { chores, done } = state;

  const addChore = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    updateState((prev) => ({
      ...prev,
      chores: [...prev.chores, { id: newId(), name: clean }],
    }));
  };

  const removeChore = (id: string) => {
    updateState((prev) => {
      const next = { ...prev.done };
      delete next[id];
      return { chores: prev.chores.filter((c) => c.id !== id), done: next };
    });
  };

  const changeCount = (id: string, member: Member, delta: 1 | -1) =>
    updateState((prev) => {
      const current = prev.done[id]?.[member] ?? 0;
      const next = Math.max(0, current + delta);
      return {
        ...prev,
        done: { ...prev.done, [id]: { ...prev.done[id], [member]: next } },
      };
    });

  const addCheck = (id: string, member: Member) => changeCount(id, member, 1);
  const removeCheck = (id: string, member: Member) =>
    changeCount(id, member, -1);

  // Reset: borra solo los conteos, mantiene la lista de tareas
  const resetWeek = () =>
    updateState((prev) => ({ ...prev, done: {} }));

  const totals = Object.fromEntries(
    MEMBERS.map((m) => [
      m,
      chores.reduce((sum, c) => sum + (done[c.id]?.[m] ?? 0), 0),
    ]),
  ) as Record<Member, number>;

  const hasProgress = MEMBERS.some((m) => totals[m] > 0);

  return {
    chores,
    done,
    totals,
    hasProgress,
    addChore,
    removeChore,
    addCheck,
    removeCheck,
    resetWeek,
    syncStatus: status,
    syncError: error,
  };
}
