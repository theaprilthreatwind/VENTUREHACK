/**
 * Прогресс прохождения: «Вопрос N из M» и полоса заполнения.
 *
 * @param {{ current: number, total: number }} props
 */
export function SessionProgress({ current, total }) {
  const position = total > 0 ? current + 1 : 0;
  const percent = total > 0 ? Math.round((position / total) * 100) : 0;

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>
          Вопрос {position} из {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Прогресс прохождения"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={position}
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100"
      >
        <div
          className="h-full rounded-full bg-[#131926] transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
