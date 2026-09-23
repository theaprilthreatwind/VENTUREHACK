import { BookOpen, ChevronDown, Play } from "lucide-react";
import { formatNumber } from "@/shared/lib";
import { getSubjectState } from "../model/selection.mjs";
import { CheckboxBox } from "./CheckboxBox";
import { TopicRow } from "./TopicRow";

export function SubjectCard({
  subject,
  selectedTopics,
  open,
  onToggleSubject,
  onToggleOpen,
  onToggleTopic,
  onQuickStart,
}) {
  const state = getSubjectState(subject, selectedTopics);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div
        className={`flex items-center justify-between p-4 transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/50 ${
          open ? "border-b border-slate-100 dark:border-slate-800" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{subject.title}</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {formatNumber(subject.totalQuestions)} вопросов
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleOpen}
            aria-expanded={open}
            aria-label="Свернуть или развернуть предмет"
            className="p-1.5 text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
          <button
            type="button"
            onClick={onToggleSubject}
            aria-label="Выбрать предмет целиком"
            className="flex items-center rounded-lg p-0.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <CheckboxBox state={state} />
          </button>
          <button
            type="button"
            onClick={() => onQuickStart(subject.topics.map((topic) => topic.id))}
            aria-label={`Быстрый запуск: ${subject.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
          </button>
        </div>
      </div>

      {open && (
        <div className="divide-y divide-slate-100 bg-slate-50/60 text-xs dark:divide-slate-800 dark:bg-slate-950/40">
          {subject.topics.map((topic) => (
            <TopicRow
              key={topic.id}
              topic={topic}
              selected={selectedTopics.has(topic.id)}
              onToggle={() => onToggleTopic(topic.id)}
              onQuickStart={() => onQuickStart([topic.id])}
            />
          ))}
          {subject.topics.length === 0 && (
            <p className="px-6 py-3 text-center text-[11px] text-slate-400 dark:text-slate-500">
              В предмете пока нет тем
            </p>
          )}
        </div>
      )}
    </section>
  );
}
