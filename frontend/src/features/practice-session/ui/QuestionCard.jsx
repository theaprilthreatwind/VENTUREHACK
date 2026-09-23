"use client";

import { Bookmark } from "lucide-react";

import { MathText } from "@/shared/ui";
import { useLang } from "@/shared/i18n";

/**
 * Карточка задания: панель с номером вопроса и иконкой «Отметить для проверки»,
 * затем текст вопроса. Стиль повторяет макет DSATUZ — «Решение задания».
 *
 * @param {{
 *   number: number,
 *   question: { title: string } | null,
 *   isFlagged: boolean,
 *   onToggleFlag: () => void,
 * }} props
 */
export function QuestionCard({ number, question, isFlagged, onToggleFlag }) {
  const { t } = useLang();

  if (!question) return null;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900 md:p-10">
      <div className="flex items-center justify-between rounded-xl border border-slate-900 bg-white dark:border-slate-700 dark:bg-slate-800">
        <div className="flex min-w-[48px] items-center justify-center bg-black px-4 py-2.5 text-base font-bold text-white">
          {number}
        </div>
        <button
          type="button"
          onClick={onToggleFlag}
          aria-pressed={isFlagged}
          aria-label={isFlagged ? t("session.flagOn") : t("session.flagOff")}
          title={t("session.flagTitle")}
          className={`mr-2 flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 ${
            isFlagged ? "text-amber-500" : "text-slate-500 dark:text-slate-400"
          }`}
        >
          <Bookmark
            className={`h-5 w-5 ${isFlagged ? "fill-amber-500" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <h2 className="mt-8 text-xl font-normal leading-relaxed text-slate-900 dark:text-white md:text-2xl">
        <MathText text={question.title} />
      </h2>
    </div>
  );
}
