import { ChevronDown, LayoutGrid, Play } from "lucide-react";
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
    <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm">
      <div className="flex items-center justify-between p-3 transition-colors hover:bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">{domain.name}</h4>
            <p className="text-[11px] text-slate-400">{domain.questions} вопросов</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleOpen}
            aria-expanded={open}
            aria-label="Свернуть или развернуть раздел"
            className="p-1 text-slate-400 transition-colors hover:text-slate-600"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={onToggleDomain}
            aria-label="Выбрать раздел целиком"
            className="flex items-center rounded-lg p-0.5 transition-colors hover:bg-slate-100"
          >
            <CheckboxBox state={state} />
          </button>
          <button
            type="button"
            onClick={() => onQuickStart(domain.skills.map((skill) => skill.id))}
            aria-label={`Быстрый запуск: ${domain.name}`}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100"
          >
            <Play className="h-3 w-3 fill-current" />
          </button>
        </div>
      </div>

      {open && (
        <div className="divide-y divide-slate-100 border-t border-slate-100 bg-slate-50/40 text-xs">
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
            <p className="px-6 py-3 text-center text-[11px] text-slate-400">
              Нет тем по заданным фильтрам
            </p>
          )}
        </div>
      )}
    </div>
  );
}
