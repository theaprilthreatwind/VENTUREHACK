import { getQuestionById, getQuestionOption } from "@/shared/api";

/**
 * Сборка полного вопроса для экрана сессии из двух источников backend:
 * `GET /api/questions/{id}` отдаёт вопрос и список id вариантов (`option`),
 * а `GET /api/questions/{id}/{optionId}` — текст и правильность варианта.
 *
 * Серверные DTO могут называть поля по-разному (`questionId`/`id`,
 * `description`/`title`), поэтому приводим их к единому виду.
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
 * Варианты из ответа вопроса могут прийти двумя способами:
 * - массив объектов `{ id, text, correct }` — используем как есть;
 * - массив идентификаторов (поле `option`/`optionIds`) — их нужно догрузить.
 *
 * @param {Object} raw
 * @returns {{ objects: Object[], ids: Array<number|string> }}
 */
function extractOptions(raw) {
  const candidate =
    raw?.options ?? raw?.option ?? raw?.optionIds ?? raw?.optionDtos ?? [];

  if (!Array.isArray(candidate)) return { objects: [], ids: [] };

  const objects = [];
  const ids = [];

  for (const item of candidate) {
    if (item == null) continue;
    if (typeof item === "object") objects.push(item);
    else ids.push(item);
  }

  return { objects, ids };
}

/**
 * @param {Object} raw
 * @param {SessionQuestionOption[]} [options]
 * @returns {SessionQuestion}
 */
export function normalizeQuestion(raw, options = []) {
  return {
    id: raw?.id ?? raw?.questionId,
    title: raw?.title ?? raw?.description ?? "",
    explanation: raw?.explanation ?? "",
    type: raw?.type ?? "",
    difficulty: raw?.difficulty ?? "",
    photoUrl: raw?.photoUrl ?? "",
    options,
  };
}

/**
 * Загружает один вопрос вместе с его вариантами ответа.
 *
 * @param {number|string} id
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<SessionQuestion>}
 */
async function loadQuestion(id, { signal } = {}) {
  const raw = await getQuestionById(id, { signal });
  const { objects, ids } = extractOptions(raw);

  if (objects.length > 0) {
    return normalizeQuestion(raw, objects.map(normalizeOption));
  }

  const optionResponses = await Promise.all(
    ids.map((optionId) => getQuestionOption(id, optionId, { signal }))
  );

  return normalizeQuestion(raw, optionResponses.map(normalizeOption));
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

  return Promise.all(ids.map((id) => loadQuestion(id, { signal })));
}
