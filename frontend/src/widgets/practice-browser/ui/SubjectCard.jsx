import { ChevronDown, Play } from "lucide-react";
import { matches } from "@/entities/subject";
import { formatNumber } from "@/shared/lib";
import { CheckboxBox } from "./CheckboxBox";
import { DomainBlock } from "./DomainBlock";
import { SubjectIcon } from "./SubjectIcon";

export function SubjectCard({
  subject,
  selectedSkills,
  difficulty,
  status,
  repeat,
  openSubjects,
  openDomains,
  onToggleSubject,
  onToggleSubjectOpen,
  onToggleDomain,
  onToggleDomainOpen,
  onToggleSkill,
  onQuickStart,
}) {
  const allSkillIds = subject.domains.flatMap((domain) =>
    domain.skills.map((skill) => skill.id)
  );
  const visibleSkillIds = subject.domains.flatMap((domain) =>
    domain.skills
      .filter((skill) => matches(skill, difficulty, status, repeat))
      .map((skill) => skill.id)
  );
  const selectedVisible = visibleSkillIds.filter((id) => selectedSkills.has(id));
  const open = openSubjects.has(subject.id);

  const state =
    visibleSkillIds.length > 0 && visibleSkillIds.every((id) => selectedSkills.has(id))
      ? "checked"
      : selectedVisible.length > 0
        ? "partial"
        : "none";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
      <div
        className={`flex items-center justify-between p-4 transition-colors hover:bg-slate-50/70 ${
          open ? "border-b border-slate-100" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <SubjectIcon name={subject.icon} className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{subject.name}</h3>
            <p className="text-xs text-slate-400">
              {formatNumber(subject.totalQuestions)} вопросов
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSubjectOpen}
            aria-expanded={open}
            aria-label="Свернуть или развернуть предмет"
            className="p-1.5 text-slate-400 transition-colors hover:text-slate-600"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={onToggleSubject}
            aria-label="Выбрать предмет целиком"
            className="flex items-center rounded-lg p-0.5 transition-colors hover:bg-slate-100"
          >
            <CheckboxBox state={state} />
          </button>
          <button
            type="button"
            onClick={() => onQuickStart(allSkillIds)}
            aria-label={`Быстрый запуск: ${subject.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-2 bg-slate-50/60 p-3">
          {subject.domains.map((domain) => (
            <DomainBlock
              key={domain.id}
              domain={domain}
              selectedSkills={selectedSkills}
              visibleSkills={domain.skills.filter((skill) =>
                matches(skill, difficulty, status, repeat)
              )}
              open={openDomains.has(domain.id)}
              onToggleOpen={() => onToggleDomainOpen(domain.id)}
              onToggleDomain={() => onToggleDomain(domain)}
              onToggleSkill={onToggleSkill}
              onQuickStart={onQuickStart}
            />
          ))}
        </div>
      )}
    </section>
  );
}
