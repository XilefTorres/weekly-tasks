import { useLocalStorage } from "./useLocalStorage";
import { MEMBERS, type Chore, type Done, type Member } from "../types";

const newId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export function useChores() {
  const [chores, setChores] = useLocalStorage<Chore[]>("hogar:tareas", []);
  const [done, setDone] = useLocalStorage<Done>("hogar:conteos", {});

  const addChore = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    setChores((prev) => [...prev, { id: newId(), name: clean }]);
  };

  const removeChore = (id: string) => {
    setChores((prev) => prev.filter((c) => c.id !== id));
    setDone((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const changeCount = (id: string, member: Member, delta: 1 | -1) =>
    setDone((prev) => {
      const current = prev[id]?.[member] ?? 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: { ...prev[id], [member]: next } };
    });

  const addCheck = (id: string, member: Member) => changeCount(id, member, 1);
  const removeCheck = (id: string, member: Member) =>
    changeCount(id, member, -1);

  const resetWeek = () => setDone({});

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
  };
}
