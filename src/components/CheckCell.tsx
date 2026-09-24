import type { Member } from "../types";
import { MEMBER_STYLES } from "../constants";

interface Props {
  member: Member;
  choreName: string;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
}

// 1 a 3 veces se ven como checks sueltos; a partir de 4 se resume como ✓×4
const label = (count: number) =>
  count === 0 ? "" : count <= 3 ? "✓".repeat(count) : `✓×${count}`;

export default function CheckCell({
  member,
  choreName,
  count,
  onAdd,
  onRemove,
}: Props) {
  const active = count > 0;

  return (
    <div className="relative w-full md:mx-auto md:max-w-44">
      <button
        onClick={onAdd}
        aria-label={`Sumar un check de ${member} en ${choreName}`}
        className={`h-12 w-full touch-manipulation select-none rounded-xl border text-xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-2xl ${
          active
            ? `${MEMBER_STYLES[member].on} border-transparent text-stone-900`
            : "border-white/15 hover:border-white/40"
        }`}
      >
        {label(count)}
      </button>
      {active && (
        <button
          onClick={onRemove}
          aria-label={`Quitar un check de ${member} en ${choreName}`}
          className="absolute -right-1.5 -top-2.5 grid h-7 w-7 touch-manipulation place-items-center rounded-full border border-white/30 bg-[#1f2d28] text-base leading-none text-stone-100 hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-white"
        >
          −
        </button>
      )}
    </div>
  );
}
