import { Play } from "lucide-react";

export function TopicRow({ topic, selected, onToggle, onQuickStart }) {
  return (
    <div className="flex items-center justify-between px-6 py-2.5 transition-colors hover:bg-white">
      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate font-medium text-slate-700">{topic.title}</span>
        <span className="shrink-0 text-[10px] text-slate-400">
          {topic.questionCount} вопросов
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          aria-label={`Выбрать тему: ${topic.title}`}
          className="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-0"
        />
        <button
          type="button"
          onClick={onQuickStart}
          aria-label={`Быстрый запуск: ${topic.title}`}
          className="p-1 text-slate-400 transition-colors hover:text-slate-700"
        >
          <Play className="h-3 w-3 fill-current" />
        </button>
      </div>
    </div>
  );
}
