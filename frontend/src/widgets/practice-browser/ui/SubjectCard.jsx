import { ChevronDown, Play } from "lucide-react";
import { matches } from "@/entities/subject";
import { formatNumberEn } from "@/shared/lib";
import { CheckboxBox } from "./CheckboxBox";
import { DomainBlock } from "./DomainBlock";

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
  const allSkillIds = subject.domains.flatMap((domain) => domain.skills.map((skill) => skill.id));
  const visibleSkillIds = subject.domains.flatMap((domain) =>
    domain.skills
      .filter((skill) => matches(skill, difficulty, status, repeat))
      .map((skill) => skill.id)
  );
  const selectedVisible = visibleSkillIds.filter((id) => selectedSkills.has(id));

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 p-4 sm:p-5">
        <button
          type="button"
          onClick={onToggleSubject}
          aria-label="Выбрать предмет целиком"
          className="shrink-0 rounded-lg p-1 transition-colors hover:bg-slate-100"
        >
          <CheckboxBox
            state={
              visibleSkillIds.length > 0 && visibleSkillIds.every((id) => selectedSkills.has(id))
                ? "checked"
                : selectedVisible.length > 0
                  ? "partial"
                  : "none"
            }
          />
        </button>
        <button
          type="button"
          onClick={onToggleSubjectOpen}
          aria-expanded={openSubjects.has(subject.id)}
          className="flex flex-1 items-center gap-3 text-left"
        >
          <span className="min-w-0">
            <p className="truncate text-base font-semibold text-slate-900">{subject.name}</p>
            <p className="mt-0.5 text-xs text-slate-400">
              {subject.shortName} • {formatNumberEn(subject.totalQuestions)} questions
            </p>
          </span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
              openSubjects.has(subject.id) ? "rotate-180" : ""
            }`}
          />
        </button>
        <button
          type="button"
          aria-label={`Быстрый старт: ${subject.name}`}
          onClick={() => onQuickStart(allSkillIds)}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <Play className="h-4 w-4" />
          Start
        </button>
      </div>

      {openSubjects.has(subject.id) && (
        <div className="space-y-3 border-t border-slate-100 p-3 sm:p-4">
          {subject.domains.map((domain) => {
            const visibleSkills = domain.skills.filter((skill) =>
              matches(skill, difficulty, status, repeat)
            );
            return (
              <DomainBlock
                key={domain.id}
                domain={domain}
                selectedSkills={selectedSkills}
                visibleSkills={visibleSkills}
                open={openDomains.has(domain.id)}
                onToggleOpen={() => onToggleDomainOpen(domain.id)}
                onToggleDomain={() => onToggleDomain(domain)}
                onToggleSkill={onToggleSkill}
                onQuickStart={() => onQuickStart(domain.skills.map((skill) => skill.id))}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
