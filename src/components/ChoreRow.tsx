import { MEMBERS, type Chore, type Counts, type Member } from "../types";
import { ROW_GRID } from "../constants";
import CheckCell from "./CheckCell";

interface Props {
  chore: Chore;
  counts: Counts;
  onAddCheck: (id: string, member: Member) => void;
  onRemoveCheck: (id: string, member: Member) => void;
  onRemoveChore: (id: string) => void;
}

export default function ChoreRow({
  chore,
  counts,
  onAddCheck,
  onRemoveCheck,
  onRemoveChore,
}: Props) {
  return (
    <div
      className={`items-center gap-y-3 border-t border-white/10 px-3 py-4 hover:bg-white/[0.03] md:gap-y-0 md:px-6 md:py-3 ${ROW_GRID}`}
    >
      {/* Teléfono: nombre arriba (3 columnas) + ✕ (1 columna), y abajo los 4 integrantes */}
      <div className="order-1 col-span-3 min-w-0 break-words text-lg text-stone-100 md:col-span-1">
        {chore.name}
      </div>

      <button
        onClick={() => {
          if (window.confirm(`¿Quitar "${chore.name}" de la lista?`))
            onRemoveChore(chore.id);
        }}
        aria-label={`Quitar ${chore.name}`}
        className="order-2 justify-self-end rounded-md px-3 py-1 text-stone-500 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-white md:order-last md:justify-self-center"
      >
        ✕
      </button>

      {MEMBERS.map((m) => (
        <div key={m} className="order-3">
          <CheckCell
            member={m}
            choreName={chore.name}
            count={counts[m] ?? 0}
            onAdd={() => onAddCheck(chore.id, m)}
            onRemove={() => onRemoveCheck(chore.id, m)}
          />
        </div>
      ))}
    </div>
  );
}
