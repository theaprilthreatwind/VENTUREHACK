import { Play } from "lucide-react";

const difficultyLabels = { Easy: "Легко", Medium: "Средне", Hard: "Сложно" };

const difficultyChipStyles = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-600",
};

export function SkillRow({ skill, selected, onToggle, onQuickStart }) {
  return (
    <div className="flex items-center justify-between px-6 py-2.5 transition-colors hover:bg-white">
      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate font-medium text-slate-700">{skill.name}</span>
        <span className="shrink-0 text-[10px] text-slate-400">
          {skill.questions} вопросов
        </span>
        <span
          className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold ${
            difficultyChipStyles[skill.difficulty]
          }`}
        >
          {difficultyLabels[skill.difficulty] ?? skill.difficulty}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          aria-label={`Выбрать тему: ${skill.name}`}
          className="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-0"
        />
        <button
          type="button"
          onClick={onQuickStart}
          aria-label={`Быстрый запуск: ${skill.name}`}
          className="p-1 text-slate-400 transition-colors hover:text-slate-700"
        >
          <Play className="h-3 w-3 fill-current" />
        </button>
      </div>
    </div>
  );
}
