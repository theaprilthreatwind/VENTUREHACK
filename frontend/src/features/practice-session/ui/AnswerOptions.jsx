import { Check, X } from "lucide-react";

import { MathText } from "@/shared/ui";

const LETTERS = "ABCDEFGH";

/**
 * Варианты ответа с radio-семантикой и буквенными бейджами (A/B/C/D).
 * Показывает верный и ошибочный выбор.
 *
 * @param {{
 *   options: Array<{ id: number|string, text: string }>,
 *   selectedId: number|string|null,
 *   answeredId: number|string|null,
 *   correctOptionId: number|string|null,
 *   isDisabled: boolean,
 *   onSelect: (id: number|string) => void,
 * }} props
 */
export function AnswerOptions({
  options,
  selectedId,
  answeredId,
  correctOptionId,
  isDisabled,
  onSelect,
}) {
  const isAnswered = answeredId != null;

  return (
    <div role="radiogroup" aria-label="Варианты ответа" className="mt-8 flex flex-col gap-3">
      {options.map((option, index) => {
        const isChosen = isAnswered ? answeredId === option.id : selectedId === option.id;
        const isCorrect = isAnswered && option.id === correctOptionId;
        const isWrongChoice = isAnswered && isChosen && !isCorrect;

        let stateClass = "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50";
        if (isCorrect) {
          stateClass = "border-emerald-400 bg-emerald-50";
        } else if (isWrongChoice) {
          stateClass = "border-red-400 bg-red-50";
        } else if (!isAnswered && isChosen) {
          stateClass = "border-slate-900 bg-slate-50";
        }

        let badgeClass = "border-slate-900 text-slate-900";
        if (isCorrect) {
          badgeClass = "border-emerald-600 bg-emerald-600 text-white";
        } else if (isWrongChoice) {
          badgeClass = "border-red-600 bg-red-600 text-white";
        } else if (!isAnswered && isChosen) {
          badgeClass = "border-slate-900 bg-slate-900 text-white";
        }

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isChosen}
            disabled={isDisabled}
            onClick={() => onSelect(option.id)}
            className={`group flex w-full items-center gap-4 rounded-xl border p-4 text-left shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-slate-900/10 disabled:cursor-not-allowed ${stateClass}`}
          >
            <span
              aria-hidden="true"
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${badgeClass}`}
            >
              {LETTERS[index] ?? index + 1}
            </span>
            <span className="flex-1 text-base font-medium text-slate-900">
              <MathText text={option.text} />
            </span>
            {isCorrect && (
              <Check className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
            )}
            {isWrongChoice && <X className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}
