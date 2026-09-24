export const MEMBERS = ["Xochitl", "Moy", "Ana", "Xilef"] as const;

export type Member = (typeof MEMBERS)[number];

export interface Chore {
  id: string;
  name: string;
}

/** Veces que cada integrante hizo una tarea esta semana */
export type Counts = Partial<Record<Member, number>>;

/** id de la tarea -> conteos por integrante */
export type Done = Record<string, Counts>;
