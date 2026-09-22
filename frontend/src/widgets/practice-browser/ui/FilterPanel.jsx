import { RotateCcw } from "lucide-react";
import { answerStatuses, difficulties, repeatOptions } from "@/entities/subject";
import { SegmentedControl } from "./SegmentedControl";

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
    <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Set Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          <RotateCcw className="h-4 w-4" />
          Reset Filters
        </button>
      </div>
      <div className="mt-5 grid gap-5 border-t border-slate-100 pt-5 sm:grid-cols-3">
        <SegmentedControl
          label="Difficulty"
          value={difficulty}
          options={difficulties}
          onChange={onDifficultyChange}
        />
        <SegmentedControl
          label="Answer Status"
          value={status}
          options={answerStatuses}
          onChange={onStatusChange}
        />
        <SegmentedControl
          label="Marked for Review"
          value={repeat}
          options={repeatOptions}
          onChange={onRepeatChange}
        />
      </div>
    </section>
  );
}
