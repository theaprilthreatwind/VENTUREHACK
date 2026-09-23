"use client";

import { useState } from "react";
import { ChevronDown, Lightbulb } from "lucide-react";

import { MathText } from "@/shared/ui";

/**
 * Пояснение к ответу: кнопка «Показать объяснение» и раскрывающийся текст.
 * До ответа на вопрос кнопка неактивна; при отсутствии пояснения — тоже.
 *
 * @param {{
 *   explanation?: string,
 *   isAnswered: boolean,
 * }} props
 */
export function ExplanationPanel({ explanation, isAnswered }) {
  const [isOpen, setOpen] = useState(false);
  const hasExplanation = Boolean(explanation && explanation.trim());
  const isDisabled = !isAnswered || !hasExplanation;

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((open) => !open)}
        disabled={isDisabled}
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <Lightbulb className="h-4 w-4" aria-hidden="true" />
        {isOpen ? "Скрыть объяснение" : "Показать объяснение"}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && hasExplanation && (
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-slate-700 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-slate-200">
          <MathText text={explanation} />
        </div>
      )}
    </div>
  );
}
