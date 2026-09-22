export function SegmentedControl({ label, value, options, onChange }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <div className="flex rounded-xl bg-slate-100 p-1">
        {options.map((option) => {
          const active = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(active ? null : option)}
              aria-pressed={active}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                active ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
