import { API_BASE_URL } from "@/shared/config";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

/**
 * @typedef {"EASY" | "MEDIUM" | "HARD"} Difficulty
 * @typedef {"CORRECT" | "INCORRECT" | "NOT_ANSWERED"} AnswerStatus
 * @typedef {number | string} LongId
 */

/**
 * @typedef {Object} TopicOverview
 * @property {number} id
 * @property {string} title
 * @property {number} questionCount
 */

/**
 * @typedef {Object} SubjectOverview
 * @property {number} id
 * @property {string} title
 * @property {string} subject
 * @property {number} totalQuestions
 * @property {TopicOverview[]} topics
 */

/**
 * @typedef {Object} StartPracticePayload
 * @property {LongId} userId
 * @property {number[]} [topicIds]
 * @property {number} [questionsCount]
 * @property {Difficulty[]} [difficulties]
 * @property {AnswerStatus | string} [answerStatus]
 * @property {boolean} [isRepetition]
 */

/**
 * @typedef {Object} SaveAnswerPayload
 * @property {LongId} attemptId
 * @property {number} questionId
 * @property {number} optionId
 */

/**
 * @typedef {Object} FinishPracticeStats
 * @property {number} totalQuestions
 * @property {number} correctAnswers
 * @property {string} startedAt
 * @property {string} finishedAt
 */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} email
 * @property {string} password
 * @property {string} username
 * @property {string} token
 */

/**
 * @typedef {Object} UpdateTargetScorePayload
 * @property {LongId} userId
 * @property {LongId} topicId
 * @property {number} scoreGoal
 */

/* -------------------------------------------------------------------------- */
/*                                   Errors                                   */
/* -------------------------------------------------------------------------- */

export class ApiError extends Error {
  /**
   * @param {string} message
   * @param {{ status?: number, data?: unknown, url?: string, cause?: unknown }} [options]
   */
  constructor(message, { status, data, url, cause } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.url = url;
    this.cause = cause;
  }
}

/* -------------------------------------------------------------------------- */
/*                              Low-level request                             */
/* -------------------------------------------------------------------------- */

/**
 * @param {string} path
 * @param {Record<string, unknown>} [query]
 */
function buildUrl(path, query) {
  const base = API_BASE_URL.replace(/\/+$/, "");
  const searchParams = new URLSearchParams();

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) continue;
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  }

  const search = searchParams.toString();
  return `${base}${path}${search ? `?${search}` : ""}`;
}

/**
 * @param {Response} response
 * @returns {Promise<unknown>}
 */
async function parseBody(response) {
  if (response.status === 204) return null;

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/**
 * Универсальный HTTP-запрос к API.
 *
 * @template T
 * @param {string} path
 * @param {{
 *   method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
 *   body?: unknown,
 *   query?: Record<string, unknown>,
 *   signal?: AbortSignal,
 * }} [options]
 * @returns {Promise<T>}
 */
export async function request(path, { method = "GET", body, query, signal } = {}) {
  const url = buildUrl(path, query);
  const hasBody = body !== undefined;

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: hasBody ? { "Content-Type": "application/json" } : undefined,
      body: hasBody ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (cause) {
    throw new ApiError(`Не удалось выполнить запрос ${method} ${url}`, {
      url,
      cause,
    });
  }

  const data = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(
      `Запрос ${method} ${url} завершился со статусом ${response.status}`,
      { status: response.status, data, url }
    );
  }

  return /** @type {T} */ (data);
}

/* -------------------------------------------------------------------------- */
/*                                 Endpoints                                  */
/* -------------------------------------------------------------------------- */

/**
 * 1. Обзор предметов с темами и количеством вопросов.
 * `GET /api/subjects/overview`
 *
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<SubjectOverview[]>}
 */
export function getSubjectsOverview({ signal } = {}) {
  return request("/api/subjects/overview", { signal });
}

/**
 * 2. Старт практики.
 * `POST /api/practice_page?userId={userId}`
 *
 * @param {StartPracticePayload} payload
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<string>} attemptId
 */
export function startPractice(
  { userId, topicIds, questionsCount, difficulties, answerStatus, isRepetition },
  { signal } = {}
) {
  return request("/api/practice_page", {
    method: "POST",
    query: { userId },
    body: { topicIds, questionsCount, difficulties, answerStatus, isRepetition },
    signal,
  });
}

/**
 * 3. Сохранение ответа на вопрос.
 * `POST /api/practice_page/{attemptId}/answers`
 *
 * @param {SaveAnswerPayload} payload
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<null>}
 */
export function saveAnswer({ attemptId, questionId, optionId }, { signal } = {}) {
  return request(`/api/practice_page/${attemptId}/answers`, {
    method: "POST",
    body: { questionId, optionId },
    signal,
  });
}

/**
 * 4. Завершение попытки и получение статистики.
 * `POST /api/practice_page/{attemptId}/finish`
 *
 * @param {LongId} attemptId
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<FinishPracticeStats>}
 */
export function finishPractice(attemptId, { signal } = {}) {
  return request(`/api/practice_page/${attemptId}/finish`, {
    method: "POST",
    signal,
  });
}

/**
 * 5. Получение пользователя по токену авторизации.
 * `GET /api/users/token?token={token}`
 *
 * @param {string} token
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<User>}
 */
export function getUserByToken(token, { signal } = {}) {
  return request("/api/users/token", { query: { token }, signal });
}

/**
 * 6. Получение пользователя по id.
 * `GET /api/users/{userId}`
 *
 * @param {LongId} userId
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<User>}
 */
export function getUserById(userId, { signal } = {}) {
  return request(`/api/users/${userId}`, { signal });
}

/**
 * 7. Список всех зарегистрированных пользователей.
 * `GET /api/users`
 *
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<User[]>}
 */
export function getUsers({ signal } = {}) {
  return request("/api/users", { signal });
}

/**
 * 8. Обновление целевого балла пользователя по теме.
 * `PUT /api/dashboard/{userId}/topics/{topicId}/target-score`
 *
 * @param {UpdateTargetScorePayload} payload
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<null>}
 */
export function updateTargetScore({ userId, topicId, scoreGoal }, { signal } = {}) {
  return request(`/api/dashboard/${userId}/topics/${topicId}/target-score`, {
    method: "PUT",
    body: { scoreGoal },
    signal,
  });
}

/* -------------------------------------------------------------------------- */
/*                              Grouped service                               */
/* -------------------------------------------------------------------------- */

export const apiService = {
  subjects: {
    getOverview: getSubjectsOverview,
  },
  practice: {
    start: startPractice,
    saveAnswer,
    finish: finishPractice,
  },
  users: {
    getByToken: getUserByToken,
    getById: getUserById,
    getAll: getUsers,
  },
  dashboard: {
    updateTargetScore,
  },
};

export default apiService;
