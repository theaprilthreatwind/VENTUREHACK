import { API_BASE_URL, STORAGE_KEYS } from "@/shared/config";
import { resolveText } from "@/shared/i18n";
import { storageRemove } from "@/shared/lib/storage";

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
 * @property {string} photoUrl
 * @property {number[]} optionIds
 */

/**
 * Вопрос без текстов вариантов: `GET /api/questions/{id}` отдаёт только
 * идентификаторы ответов (`option`), которые догружаются отдельно.
 *
 * @typedef {Object} QuestionDetail
 * @property {number} questionId
 * @property {string} title
 * @property {string} explanation
 * @property {string} type
 * @property {Difficulty} difficulty
 * @property {string} photoUrl
 * @property {number[]} option
 */

/**
 * Вариант ответа: `GET /api/questions/{id}/{optionId}`.
 *
 * @typedef {Object} OptionDetail
 * @property {number} id
 * @property {string} text
 * @property {boolean} correct
 */

/**
 * @typedef {"NEW" | "IN_PROGRESS" | "SUBMITTED" | "CANCELLED"} TestAttemptStatus
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

/**
 * Глобальная статистика пользователя (дашборд).
 * `GET /api/dashboard/{userId}/stats`
 *
 * @typedef {Object} UserStats
 * @property {number} id
 * @property {User} [user]
 * @property {number} totalTestsSolved
 * @property {number} totalQuestionsSolved
 * @property {number} correctAnswers
 * @property {number} overallSuccessRate
 */

/**
 * @typedef {Object} GenerateExplanationPayload
 * @property {LongId} questionId
 * @property {LongId} optionId
 */

/**
 * @typedef {Object} UpdateQuestionPhotoUrlPayload
 * @property {LongId} questionId
 * @property {string} photoUrl
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

/** Таймаут запроса: защищает UI от «зависшего» backend. */
const REQUEST_TIMEOUT_MS = 20000;

/** AI-эндпоинты ходят к внешней модели — им нужен запас по времени. */
const AI_REQUEST_TIMEOUT_MS = 90000;

/** Читает токен авторизации напрямую (plain string в localStorage). */
function getStoredToken() {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(STORAGE_KEYS.token) ?? "";
  } catch {
    return "";
  }
}

/**
 * Сбрасывает авторизацию при 401/403. Удаление ключа токена запускает
 * событие `entuz_token:change`, на которое подписан `useCurrentUser`,
 * поэтому UI сам выходит из протухшей сессии.
 */
function clearAuthAfterUnauthorized() {
  storageRemove(STORAGE_KEYS.token);
  storageRemove(STORAGE_KEYS.user);
  if (typeof document !== "undefined") {
    document.cookie = `${STORAGE_KEYS.token}=; path=/; max-age=0`;
  }
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
    // Не-JSON на успешном ответе — валидный кейс (например, токен строкой).
    // Не-JSON на ошибке (HTML-страница шлюза) в UI не тащим.
    return response.ok ? text : null;
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
 *   timeoutMs?: number,
 * }} [options]
 * @returns {Promise<T>}
 */
export async function request(
  path,
  { method = "GET", body, query, signal, timeoutMs = REQUEST_TIMEOUT_MS } = {}
) {
  const url = buildUrl(path, query);
  const hasBody = body !== undefined;
  const token = getStoredToken();

  // Таймаут не заменяет пользовательский AbortSignal, а комбинируется с ним.
  const timeoutSignal =
    typeof AbortSignal?.timeout === "function" && timeoutMs > 0
      ? AbortSignal.timeout(timeoutMs)
      : null;
  const requestSignal =
    signal && timeoutSignal && typeof AbortSignal?.any === "function"
      ? AbortSignal.any([signal, timeoutSignal])
      : (signal ?? timeoutSignal ?? undefined);

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: {
        "ngrok-skip-browser-warning": "true",
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: hasBody ? JSON.stringify(body) : undefined,
      signal: requestSignal,
    });
  } catch (cause) {
    // Превышение таймаута показываем отдельно: «повторить» здесь осмысленно.
    const isTimeout = cause?.name === "TimeoutError";
    throw new ApiError(
      resolveText(isTimeout ? "errors.requestTimeout" : "errors.requestFailed", {
        method,
        url,
      }),
      { url, cause }
    );
  }

  const data = await parseBody(response);

  if (!response.ok) {
    if ((response.status === 401 || response.status === 403) && token) {
      clearAuthAfterUnauthorized();
    }
    throw new ApiError(
      resolveText("errors.requestStatus", { method, url, status: response.status }),
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
 * Backend возвращает `{ attemptId, questionIds }`; сами вопросы догружаются
 * по `GET /api/questions/{id}` (см. `getQuestionById`).
 *
 * @param {StartPracticePayload} payload
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<{ attemptId: LongId, questionIds: number[] }>}
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
 * 11.1. Один вопрос (без текстов вариантов).
 * `GET /api/questions/{id}`
 *
 * Используется после `startPractice`, который возвращает только `questionIds`.
 * В ответе приходит список id вариантов (`option`), сами варианты догружаются
 * через `getQuestionOption`.
 *
 * @param {LongId} id
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<QuestionDetail>}
 */
export function getQuestionById(id, { signal } = {}) {
  return request(`/api/questions/${id}`, { signal });
}

/**
 * 11.2. Один вариант ответа с текстом и признаком правильности.
 * `GET /api/questions/{id}/{optionId}`
 *
 * @param {LongId} id — идентификатор вопроса
 * @param {LongId} optionId — идентификатор варианта ответа
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<OptionDetail>}
 */
export function getQuestionOption(id, optionId, { signal } = {}) {
  return request(`/api/questions/${id}/${optionId}`, { signal });
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

/**
 * 13. Статистика пользователя для дашборда.
 * `GET /api/dashboard/{userId}/stats`
 *
 * @param {LongId} userId
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<UserStats>}
 */
export function getDashboardStats(userId, { signal } = {}) {
  return request(`/api/dashboard/${userId}/stats`, { signal });
}

/**
 * 14. Адаптивный старт: сессия по слабым темам пользователя.
 * `POST /api/practice-page/start/adaptive?userId={userId}`
 *
 * @param {LongId} userId
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<{ attemptId: LongId, questionIds: number[] }>}
 */
export function startAdaptivePractice(userId, { signal } = {}) {
  return request("/api/practice-page/start/adaptive", {
    method: "POST",
    query: { userId },
    signal,
  });
}

/**
 * 15. AI-пояснение к заданию по ошибочному варианту.
 * `PATCH /api/questions/{id}/explanation?optionId={optionId}`
 *
 * @param {GenerateExplanationPayload} payload
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<QuestionResponse>}
 */
export function generateQuestionExplanation(
  { questionId, optionId },
  { signal, timeoutMs = AI_REQUEST_TIMEOUT_MS } = {}
) {
  return request(`/api/questions/${questionId}/explanation`, {
    method: "PATCH",
    query: { optionId },
    signal,
    timeoutMs,
  });
}

/**
 * 16. Обновление картинки задания.
 * `PATCH /api/questions/{id}/photo-url`
 *
 * @param {UpdateQuestionPhotoUrlPayload} payload
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<QuestionResponse>}
 */
export function updateQuestionPhotoUrl({ questionId, photoUrl }, { signal } = {}) {
  return request(`/api/questions/${questionId}/photo-url`, {
    method: "PATCH",
    body: { photoUrl },
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
    getById: getQuestionById,
    getOption: getQuestionOption,
    generateExplanation: generateQuestionExplanation,
    updatePhotoUrl: updateQuestionPhotoUrl,
  },
  practice: {
    start: startPractice,
    startAdaptive: startAdaptivePractice,
    saveAnswer,
    finish: finishPractice,
    updateStatus: updateTestStatus,
  },
  users: {
    register: registerUser,
    login: loginUser,
    getByToken: getUserByToken,
  },
  dashboard: {
    updateTargetScore,
    getStats: getDashboardStats,
  },
};

export default apiService;
