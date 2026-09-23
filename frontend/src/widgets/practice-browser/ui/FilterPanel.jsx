import { BarChart2, CheckCheck, Flag, RotateCcw } from "lucide-react";
import {
  answerStatusOptions,
  difficultyOptions,
  repeatOptions,
} from "@/entities/subject";

function FilterCard({ icon: Icon, label, options, value, onChange, columns = 3 }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
      <div className="mb-3.5 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        <Icon className="h-3.5 w-3.5 text-slate-500" />
        <span>{label}</span>
      </div>
      <div className={`grid gap-2 ${columns === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(active ? null : option.value)}
              aria-pressed={active}
              className={`w-full rounded-xl border px-2 py-2 text-center text-xs font-medium transition-colors ${
                active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function FilterPanel({
  difficulty,
  status,
  repeat,
  onDifficultyChange,
  onStatusChange,
  onRepeatChange,
  onReset,
}) {
  return (
    <section className="mb-10 w-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Общие фильтры
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
          <span>Сбросить фильтры</span>
        </button>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        <FilterCard
          icon={BarChart2}
          label="СЛОЖНОСТЬ"
          options={difficultyOptions}
          value={difficulty}
          onChange={onDifficultyChange}
        />
        <FilterCard
          icon={CheckCheck}
          label="СТАТУС ОТВЕТА"
          options={answerStatusOptions}
          value={status}
          onChange={onStatusChange}
        />
        <FilterCard
          icon={Flag}
          label="НА ПОВТОРЕНИЕ"
          options={repeatOptions}
          value={repeat}
          onChange={onRepeatChange}
          columns={2}
        />
      </div>
    </section>
  );
}
