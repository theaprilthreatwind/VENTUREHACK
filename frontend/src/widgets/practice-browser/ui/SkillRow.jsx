import { Play } from "lucide-react";

const difficultyChipStyles = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-600",
};

export function SkillRow({ skill, selected, onToggle, onQuickStart }) {
  const label = `select-${skill.id}`;
  return (
    <div className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white">
      <input
        id={label}
        type="checkbox"
        checked={selected}
        onChange={onToggle}
        className="h-4 w-4 shrink-0 rounded accent-blue-600"
      />
      <label htmlFor={label} className="flex min-w-0 flex-1 cursor-pointer items-center gap-2">
        <span className="truncate text-sm font-medium text-slate-700">{skill.name}</span>
        <span className="ml-auto shrink-0 text-xs tabular-nums text-slate-400">
          {skill.questions} Qs
        </span>
        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${
            difficultyChipStyles[skill.difficulty]
          }`}
        >
          {skill.difficulty}
        </span>
      </label>
      <button
        type="button"
        aria-label={`Быстрый старт: ${skill.name}`}
        onClick={onQuickStart}
        className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
      >
        <Play className="h-4 w-4" />
      </button>
    </div>
  );
}
