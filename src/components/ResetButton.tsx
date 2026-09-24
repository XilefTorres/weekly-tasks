interface Props {
  onReset: () => void;
  disabled?: boolean;
}

export default function ResetButton({ onReset, disabled }: Props) {
  const handleClick = () => {
    if (
      window.confirm(
        "¿Reiniciar la semana? Se borra quién hizo cada tarea, pero las tareas se quedan.",
      )
    ) {
      onReset();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="whitespace-nowrap rounded-lg border border-white/30 px-3 py-2 text-sm font-medium md:px-4 md:text-base text-stone-100 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      Reiniciar semana
    </button>
  );
}
