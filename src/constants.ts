import type { Member } from "./types";

// Un gis de color por integrante, como en un pizarrón de cocina.
export const MEMBER_STYLES: Record<Member, { text: string; on: string }> = {
  Xochitl: { text: "text-red-400", on: "bg-red-400" },
  Moy: { text: "text-sky-300", on: "bg-sky-300" },
  Ana: { text: "text-amber-300", on: "bg-amber-300" },
  Xilef: { text: "text-violet-400", on: "bg-violet-400" },
};

// Rejilla compartida por el encabezado y las filas.
// Teléfono: 4 columnas (una por integrante). Pantalla grande: tarea + 4 integrantes + botón de quitar.
export const ROW_GRID =
  "grid grid-cols-4 gap-x-2 md:grid-cols-[26%_repeat(4,minmax(0,1fr))_3.5rem]";
