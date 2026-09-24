"use client";

import { useState } from "react";
import { ChevronDown, Lightbulb, Loader2 } from "lucide-react";

import { MathText } from "@/shared/ui";
import { useLang } from "@/shared/i18n";

/**
 * Пояснение к ответу.
 * До ответа кнопка неактивна. Если пояснение уже есть — раскрывает/скрывает
 * текст; если его нет и ответ неверный — генерирует через AI (`onExplain`).
 *
 * @param {{
 *   explanation?: string,
 *   isAnswered: boolean,
 *   canGenerate?: boolean,
 *   isLoading?: boolean,
 *   error?: string,
 *   onExplain?: () => void,
 * }} props
 */
export function ExplanationPanel({
  explanation,
  isAnswered,
  canGenerate = false,
  isLoading = false,
  error = "",
  onExplain,
}) {
  const [isOpen, setOpen] = useState(false);
  const { t } = useLang();
  const hasExplanation = Boolean(explanation && explanation.trim());
  const isDisabled = !isAnswered || isLoading || (!hasExplanation && !canGenerate);

  const handleClick = () => {
    if (hasExplanation) {
      setOpen((open) => !open);
      return;
    }

    // Открываем сразу: текст появится после генерации.
    setOpen(true);
    onExplain?.();
  };

  let label = t("session.showExplanation");
  if (!hasExplanation) {
    label = isLoading ? t("session.explaining") : t("session.explainMistake");
  } else if (isOpen) {
    label = t("session.hideExplanation");
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Lightbulb className="h-4 w-4" aria-hidden="true" />
        )}
        {label}
        {hasExplanation && (
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        )}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-700/60 dark:bg-red-950/40 dark:text-red-400"
        >
          {error}{" "}
          {canGenerate && onExplain && (
            <button
              type="button"
              onClick={onExplain}
              className="font-semibold underline underline-offset-2"
            >
              {t("session.explainRetry")}
            </button>
          )}
        </p>
      )}

      {isOpen && hasExplanation && (
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-slate-700 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-slate-200">
          <MathText text={explanation} />
        </div>
      )}
    </div>
  );
}
