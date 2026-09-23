import { API_BASE_URL } from "@/shared/config";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

/**
 * @typedef {"EASY" | "MEDIUM" | "HARD"} Difficulty
 * @typedef {"CORRECT" | "INCORRECT" | "NOT_ANSWERED"} AnswerStatus
 * @typedef {"ALL" | "CORRECT" | "INCORRECT" | "NOT_ANSWERED"} AnswerStatusFilter
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
 * @property {AnswerStatusFilter | string} [answerStatus]
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
 * @typedef {Object} AuthUser
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} token
 */

/**
 * @typedef {Object} RegisterPayload
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} LoginPayload
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} UpdateTargetScorePayload
 * @property {LongId} userId
 * @property {LongId} topicId
 * @property {number} scoreGoal
 */

/**
 * @typedef {Object} QuestionQuery
 * @property {LongId} [subjectId]
 * @property {number[]} [topicIds]
 * @property {Difficulty} [difficulty]
 * @property {number} [page]
 * @property {number} [size]
 */

/**
 * @typedef {Object} QuestionResponse
 * @property {number} questionId
 * @property {string} description
 * @property {string} explanation
 * @property {string} type
 * @property {Difficulty} difficulty
 * @property {number[]} optionIds
 */

/**
 * @typedef {"NEW" | "IN_PROGRESS" | "DONE"} TestAttemptStatus
 */

/**
 * @typedef {Object} TestAttempt
 * @property {number} id
 * @property {number} [duration]
 * @property {string} [startedAt]
 * @property {string} [finishedAt]
 * @property {TestAttemptStatus} status
 * @property {User} [user]
 */

/**
 * @typedef {Object} UpdateTestStatusPayload
 * @property {LongId} id
 * @property {TestAttemptStatus} status
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
      headers: {
        "ngrok-skip-browser-warning": "true",
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
      },
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
 * `POST /api/practice-page/start?userId={userId}`
 * Backend возвращает `{ attemptId, questions }`.
 *
 * @param {StartPracticePayload} payload
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<{ attemptId: LongId, questions: Array<Object> }>}
 */
export function startPractice(
  { userId, topicIds, questionsCount, difficulties, answerStatus, isRepetition },
  { signal } = {}
) {
  return request("/api/practice-page/start", {
    method: "POST",
    query: { userId },
    body: { topicIds, questionsCount, difficulties, answerStatus, isRepetition },
    signal,
  });
}

/**
 * 3. Сохранение ответа на вопрос.
 * `POST /api/practice-page/{attemptId}/answers`
 *
 * Backend может вернуть DTO `{ correct, explanation }`, сущность `UserAnswer`
 * с `question.explanation` (актуальная схема) или с `option.explanation`
 * (старая схема) — приводим ответ к общему виду.
 *
 * @param {SaveAnswerPayload} payload
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<{ correct: boolean, explanation: string }>}
 */
export async function saveAnswer({ attemptId, questionId, optionId }, { signal } = {}) {
  const answer = await request(`/api/practice-page/${attemptId}/answers`, {
    method: "POST",
    body: { questionId, optionId },
    signal,
  });

  return {
    correct: Boolean(answer?.correct),
    explanation:
      answer?.explanation ?? answer?.question?.explanation ?? answer?.option?.explanation ?? "",
  };
}

/**
 * 4. Завершение попытки и получение статистики.
 * `POST /api/practice-page/{attemptId}/finish`
 *
 * @param {LongId} attemptId
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<FinishPracticeStats>}
 */
export function finishPractice(attemptId, { signal } = {}) {
  return request(`/api/practice-page/${attemptId}/finish`, {
    method: "POST",
    signal,
  });
}

/**
 * 5. Регистрация нового пользователя.
 * `POST /api/users/register`
 *
 * Backend регистрирует пользователя, но токен в ответе не приходит.
 * Чтобы соединение было рабочим, после регистрации выполняем login
 * и возвращаем пользователя вместе с токеном.
 *
 * @param {RegisterPayload} payload
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<AuthUser>}
 */
export async function registerUser({ username, email, password }, { signal } = {}) {
  await request("/api/users/register", {
    method: "POST",
    body: { username, email, password },
    signal,
  });

  const token = await request("/api/users/login", {
    method: "POST",
    body: { username, email, password },
    signal,
  });

  const user = await getUserByToken(token, { signal });
  return { ...withoutPassword(user), token };
}

/**
 * 6. Аутентификация и получение токена.
 * `POST /api/users/login`
 *
 * Backend отвечает строкой-токеном: получаем пользователя по токену
 * и возвращаем AuthUser. `username` добавляем в тело, чтобы проходила
 * валидация на развёрнутом backend (он ожидает полную сущность User).
 *
 * @param {LoginPayload} payload
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<AuthUser>}
 */
export async function loginUser({ email, password }, { signal } = {}) {
  const token = await request("/api/users/login", {
    method: "POST",
    body: { username: email, email, password },
    signal,
  });

  const user = await getUserByToken(token, { signal });
  return { ...withoutPassword(user), token };
}

/** Убирает пароль из сущности User, оставляя публичные поля. */
function withoutPassword(user) {
  const { id, username, email, token } = user ?? {};
  return { id, username, email, token };
}

/**
 * 7. Получение пользователя по токену авторизации.
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
 * 8. Получение пользователя по id.
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
 * 9. Список всех зарегистрированных пользователей.
 * `GET /api/users`
 *
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<User[]>}
 */
export function getUsers({ signal } = {}) {
  return request("/api/users", { signal });
}

/**
 * 10. Обновление целевого балла пользователя по теме.
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

/**
 * 11. Банк заданий с фильтрами и пагинацией.
 * `GET /api/questions?subjectId={subjectId}&topicIds={topicIds}&difficulty={difficulty}&page={page}&size={size}`
 * `topicIds` уходит повторяющимся параметром: `?topicIds=1&topicIds=2`.
 *
 * @param {QuestionQuery} [query]
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<QuestionResponse[]>}
 */
export function getQuestions(
  { subjectId, topicIds, difficulty, page, size } = {},
  { signal } = {}
) {
  return request("/api/questions", {
    query: { subjectId, topicIds, difficulty, page, size },
    signal,
  });
}

/**
 * 12. Смена статуса попытки прохождения.
 * `PATCH /api/practice-page/{id}/status?status={status}`
 *
 * @param {UpdateTestStatusPayload} payload
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<TestAttempt>}
 */
export function updateTestStatus({ id, status }, { signal } = {}) {
  return request(`/api/practice-page/${id}/status`, {
    method: "PATCH",
    query: { status },
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
  questions: {
    getAll: getQuestions,
  },
  practice: {
    start: startPractice,
    saveAnswer,
    finish: finishPractice,
    updateStatus: updateTestStatus,
  },
  users: {
    register: registerUser,
    login: loginUser,
    getByToken: getUserByToken,
    getById: getUserById,
    getAll: getUsers,
  },
  dashboard: {
    updateTargetScore,
  },
};

export default apiService;
