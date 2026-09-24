/**
 * Приводит значение к проценту 0–100 с защитой от нуля и отрицательных чисел.
 *
 * @param {number} value
 * @param {number} total
 * @returns {number}
 */
export function toPercent(value, total) {
  const safeValue = Number(value) || 0;
  const safeTotal = Number(total) || 0;
  if (safeTotal <= 0) return 0;
  return Math.min(Math.max(Math.round((safeValue / safeTotal) * 100), 0), 100);
}

/**
 * Покрытие банка заданий: сколько вопросов решено из общего числа.
 * Общее число берётся из каталога предметов (`GET /api/subjects/overview`),
 * решённые — из статистики пользователя (`GET /api/dashboard/{id}/stats`).
 *
 * @param {{ totalQuestionsSolved?: number } | null} stats
 * @param {Array<{ totalQuestions?: number }>} subjects
 * @returns {{ solved: number, total: number, percent: number }}
 */
export function buildCoverage(stats, subjects) {
  const total = (subjects ?? []).reduce(
    (sum, subject) => sum + (Number(subject?.totalQuestions) || 0),
    0
  );
  const solved = Number(stats?.totalQuestionsSolved) || 0;

  return { solved, total, percent: toPercent(solved, total) };
}
