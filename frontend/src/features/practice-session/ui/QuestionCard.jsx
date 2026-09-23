const DIFFICULTY_LABELS = {
  EASY: "Лёгкий",
  MEDIUM: "Средний",
  HARD: "Сложный",
};

/**
 * Текст вопроса с темой и сложностью.
 *
 * @param {{ question: { title: string, difficulty?: string, topic?: { title?: string } } | null }} props
 */
export function QuestionCard({ question }) {
  if (!question) return null;

  const topicTitle = question.topic?.title;
  const difficulty = DIFFICULTY_LABELS[question.difficulty] ?? question.difficulty;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      {(topicTitle || difficulty) && (
        <div className="flex flex-wrap items-center gap-2">
          {topicTitle && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
              {topicTitle}
            </span>
          )}
          {difficulty && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600">
              {difficulty}
            </span>
          )}
        </div>
      )}

      <h2 className="mt-4 text-lg font-bold leading-relaxed text-slate-900">
        {question.title}
      </h2>
    </article>
  );
}
