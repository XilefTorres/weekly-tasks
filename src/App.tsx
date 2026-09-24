import { useChores } from "./hooks/useChores";
import AddChoreForm from "./components/AddChoreForm";
import ChoreTable from "./components/ChoreTable";
import ResetButton from "./components/ResetButton";

export default function App() {
  const {
    chores,
    done,
    totals,
    hasProgress,
    addChore,
    removeChore,
    addCheck,
    removeCheck,
    resetWeek,
  } = useChores();

  return (
    <div className="flex h-dvh flex-col bg-[#1f2d28] text-stone-100">
      <header className="flex flex-wrap items-center gap-3 border-b border-white/10 px-4 py-3 md:gap-4 md:px-6 md:py-4">
        <h1 className="mr-auto text-xl font-semibold tracking-tight md:text-3xl">
          Tareas de la semana
        </h1>
        {/* Teléfono: el formulario baja a su propia fila; pantalla grande: queda en línea */}
        <div className="order-last w-full md:order-none md:w-auto">
          <AddChoreForm onAdd={addChore} />
        </div>
        <ResetButton onReset={resetWeek} disabled={!hasProgress} />
      </header>
      <main className="flex-1 overflow-auto">
        <ChoreTable
          chores={chores}
          done={done}
          totals={totals}
          onAddCheck={addCheck}
          onRemoveCheck={removeCheck}
          onRemoveChore={removeChore}
        />
      </main>
    </div>
  );
}
