import { SubjectCard } from "./SubjectCard";

export function SubjectGroup({
  title,
  badge,
  hint,
  subjects,
  selectedTopics,
  isSubjectOpen,
  onToggleSubject,
  onToggleOpen,
  onToggleTopic,
  onQuickStart,
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {title}
          </h3>
          {badge && (
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
              {badge}
            </span>
          )}
        </div>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </div>

      <div className="space-y-4">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            selectedTopics={selectedTopics}
            open={isSubjectOpen(subject.id)}
            onToggleSubject={() => onToggleSubject(subject)}
            onToggleOpen={() => onToggleOpen(subject.id)}
            onToggleTopic={onToggleTopic}
            onQuickStart={onQuickStart}
          />
        ))}
      </div>
    </div>
  );
}
