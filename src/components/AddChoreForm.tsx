import { useState } from "react";

interface Props {
  onAdd: (name: string) => void;
}

export default function AddChoreForm({ onAdd }: Props) {
  const [name, setName] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(name);
    setName("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nueva tarea, ej. sacar la basura"
        className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-stone-100 placeholder:text-stone-400 focus-visible:outline-2 focus-visible:outline-white md:w-72 md:flex-none"
      />
      <button
        type="submit"
        className="whitespace-nowrap rounded-lg bg-stone-100 px-4 py-2 font-medium text-stone-900 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Agregar tarea
      </button>
    </form>
  );
}
