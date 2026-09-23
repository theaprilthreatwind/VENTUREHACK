/**
 * Варианты ответа с radio-семантикой. После ответа показывает, какой вариант
 * был выбран и какой был верным.
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
    <div role="radiogroup" aria-label="Варианты ответа" className="mt-5 space-y-3">
      {options.map((option, index) => {
        const isChosen = isAnswered ? answeredId === option.id : selectedId === option.id;
        const isCorrect = isAnswered && option.id === correctOptionId;

        let stateClass = "border-slate-200 bg-white hover:border-slate-300";
        if (isAnswered && isCorrect) {
          stateClass = "border-emerald-300 bg-emerald-50";
        } else if (isAnswered && isChosen) {
          stateClass = "border-red-300 bg-red-50";
        } else if (!isAnswered && isChosen) {
          stateClass = "border-[#131926] bg-slate-50";
        }

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isChosen}
            disabled={isDisabled}
            onClick={() => onSelect(option.id)}
            className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors disabled:cursor-not-allowed ${stateClass}`}
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
              {index + 1}
            </span>
            <span className="text-sm font-medium leading-relaxed text-slate-800">
              {option.text}
            </span>
          </button>
        );
      })}
    </div>
  );
}
