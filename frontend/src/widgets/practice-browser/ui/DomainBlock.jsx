import { ChevronDown, Play } from "lucide-react";
import { CheckboxBox } from "./CheckboxBox";
import { SkillRow } from "./SkillRow";

export function DomainBlock({
  domain,
  selectedSkills,
  visibleSkills,
  open,
  onToggleOpen,
  onToggleDomain,
  onToggleSkill,
  onQuickStart,
}) {
  const selected = visibleSkills.filter((skill) => selectedSkills.has(skill.id));
  const state =
    visibleSkills.length === selected.length && visibleSkills.length > 0
      ? "checked"
      : selected.length > 0
        ? "partial"
        : "none";

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleDomain}
          aria-label="Выбрать раздел целиком"
          className="rounded-lg p-1 transition-colors hover:bg-white"
        >
          <CheckboxBox state={state} />
        </button>
        <button
          type="button"
          onClick={onToggleOpen}
          aria-expanded={open}
          className="flex flex-1 items-center gap-2 text-left"
        >
          <span className="text-sm font-semibold text-slate-800">{domain.name}</span>
          <span className="text-xs tabular-nums text-slate-400">{domain.questions} questions</span>
          <ChevronDown
            className={`ml-auto h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        <button
          type="button"
          aria-label={`Быстрый старт: ${domain.name}`}
          onClick={onQuickStart}
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
        >
          <Play className="h-4 w-4" />
        </button>
      </div>

      {open && (
        <div className="mt-1 space-y-0.5 border-t border-slate-100 pt-2">
          {visibleSkills.map((skill) => (
            <SkillRow
              key={skill.id}
              skill={skill}
              selected={selectedSkills.has(skill.id)}
              onToggle={() => onToggleSkill(skill.id)}
              onQuickStart={() => onQuickStart([skill.id])}
            />
          ))}
          {visibleSkills.length === 0 && (
            <p className="px-2 py-3 text-center text-xs text-slate-400">
              No topics match the current filters
            </p>
          )}
        </div>
      )}
    </div>
  );
}
