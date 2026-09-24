import { getQuestionById } from "@/shared/api";

/**
 * Нормализация вопроса из backend в форму, которую ждёт UI сессии.
 *
 * `POST /api/practice-page/start` возвращает только `questionIds`, поэтому
 * вопросы догружаются по одному через `GET /api/questions/{id}`. Серверные
 * DTO могут называть поля по-разному (`questionId`/`id`, `description`/`title`),
 * поэтому приводим их к единому виду.
 *
 * @typedef {Object} SessionQuestionOption
 * @property {number|string} id
 * @property {string} text
 * @property {boolean} correct
 *
 * @typedef {Object} SessionQuestion
 * @property {number|string} id
 * @property {string} title
 * @property {string} explanation
 * @property {string} type
 * @property {string} difficulty
 * @property {string} photoUrl
 * @property {SessionQuestionOption[]} options
 */

/**
 * @param {Object} raw
 * @returns {SessionQuestionOption}
 */
function normalizeOption(raw) {
  return {
    id: raw?.id ?? raw?.optionId,
    text: raw?.text ?? raw?.title ?? raw?.description ?? "",
    correct: Boolean(raw?.correct ?? raw?.isCorrect),
  };
}

/**
 * @param {Object} raw
 * @returns {SessionQuestion}
 */
export function normalizeQuestion(raw) {
  const rawOptions = raw?.options ?? raw?.optionDtos ?? [];

  return {
    id: raw?.id ?? raw?.questionId,
    title: raw?.title ?? raw?.description ?? "",
    explanation: raw?.explanation ?? "",
    type: raw?.type ?? "",
    difficulty: raw?.difficulty ?? "",
    photoUrl: raw?.photoUrl ?? "",
    options: Array.isArray(rawOptions) ? rawOptions.map(normalizeOption) : [],
  };
}

/**
 * Загружает вопросы сессии по идентификаторам из `start`.
 *
 * Порядок сохраняется как в `questionIds` (от него зависит нумерация в
 * навигаторе), дубликаты и пустые значения отбрасываются. Любая ошибка
 * запроса прерывает всю загрузку (`Promise.all`) — сессия не собирается
 * частично.
 *
 * @param {Array<number|string>} questionIds
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<SessionQuestion[]>}
 */
export async function loadSessionQuestions(questionIds, { signal } = {}) {
  const ids = [...new Set((questionIds ?? []).filter((id) => id != null))];
  const questions = await Promise.all(
    ids.map((id) => getQuestionById(id, { signal }))
  );

  return questions.map(normalizeQuestion);
}
