"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Кнопка «Вопрос N из M», открывающая вверх панель с сеткой номеров
 * вопросов для свободного перехода к любому заданию.
 *
 * @param {{
 *   currentIndex: number,
 *   questions: Array<{ id: number|string }>,
 *   answeredQuestionIds: Set<string>,
 *   onSelect: (index: number) => void,
 * }} props
 */
export function QuestionNavigator({
  currentIndex,
  questions,
  answeredQuestionIds,
  onSelect,
}) {
  const [isOpen, setOpen] = useState(false);
  const total = questions.length;

  const handleSelect = (index) => {
    onSelect(index);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-6 py-2 text-sm font-bold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-400 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
      >
        Вопрос {currentIndex + 1} из {total}
        <ChevronDown
          className={`h-4 w-4 text-slate-800 dark:text-slate-300 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Закрыть список вопросов"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            role="dialog"
            aria-label="Список вопросов"
            className="absolute bottom-full left-1/2 z-50 mb-3 w-[min(24rem,90vw)] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Перейти к вопросу
            </p>
            <div className="grid max-h-64 grid-cols-6 gap-2 overflow-y-auto">
              {questions.map((question, index) => {
                const isCurrent = index === currentIndex;
                const isAnswered = answeredQuestionIds.has(String(question.id));

                let stateClass =
                  "border border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-700";
                if (isAnswered) {
                  stateClass =
                    "border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 dark:hover:bg-emerald-900/60";
                }
                if (isCurrent) {
                  stateClass = "border-2 border-slate-900 bg-slate-900 text-white";
                }

                return (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => handleSelect(index)}
                    aria-current={isCurrent ? "true" : undefined}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${stateClass}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
