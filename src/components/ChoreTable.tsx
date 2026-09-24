import { MEMBERS, type Chore, type Done, type Member } from "../types";
import { MEMBER_STYLES, ROW_GRID } from "../constants";
import ChoreRow from "./ChoreRow";

interface Props {
  chores: Chore[];
  done: Done;
  totals: Record<Member, number>;
  onAddCheck: (id: string, member: Member) => void;
  onRemoveCheck: (id: string, member: Member) => void;
  onRemoveChore: (id: string) => void;
}

export default function ChoreTable({
  chores,
  done,
  totals,
  onAddCheck,
  onRemoveCheck,
  onRemoveChore,
}: Props) {
  if (chores.length === 0) {
    return (
      <div className="grid h-full place-items-center px-6 text-center text-lg text-stone-400">
        Todavía no hay tareas. Escribe la primera arriba y presiona Agregar
        tarea.
      </div>
    );
  }

  return (
    <div>
      <div
        className={`sticky top-0 z-10 bg-[#1f2d28] px-3 py-3 md:px-6 md:py-4 ${ROW_GRID}`}
      >
        <div className="hidden text-base font-medium text-stone-400 md:block">
          Tarea
        </div>
        {MEMBERS.map((m) => (
          <div key={m} className="min-w-0 text-center">
            <div
              className={`truncate text-base font-semibold md:text-2xl ${MEMBER_STYLES[m].text}`}
            >
              {m}
            </div>
            <div className="text-xs text-stone-400 md:text-sm">
              {totals[m]} {totals[m] === 1 ? "hecha" : "hechas"}
            </div>
          </div>
        ))}
        <div className="hidden md:block" />
      </div>

      {chores.map((chore) => (
        <ChoreRow
          key={chore.id}
          chore={chore}
          counts={done[chore.id] ?? {}}
          onAddCheck={onAddCheck}
          onRemoveCheck={onRemoveCheck}
          onRemoveChore={onRemoveChore}
        />
      ))}
    </div>
  );
}
