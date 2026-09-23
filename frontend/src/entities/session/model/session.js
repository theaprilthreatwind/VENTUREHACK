import { STORAGE_KEYS } from "@/shared/config";
import { setLocalStorageItem } from "@/shared/lib";

/**
 * Ответ пользователя по одному вопросу, сохранённый локально.
 *
 * @typedef {Object} StoredAnswer
 * @property {number|string} optionId
 * @property {boolean} correct
 * @property {string} [explanation]
 */

/**
 * Локальная запись о сессии. Backend не персистит состав сессии (FR-3.8),
 * поэтому вопросы, выбранные ответы и время старта хранит браузер.
 *
 * @typedef {Object} StoredSession
 * @property {number|string} attemptId
 * @property {string} startedAt
 * @property {Array<Object>} questions
 * @property {Record<string, StoredAnswer>} answers
 */

const EMPTY = "null";

/**
 * Безопасно разбирает сырое значение сессии из localStorage.
 *
 * @param {string|null} raw
 * @returns {StoredSession|null}
 */
export function parseSession(raw) {
  if (!raw || raw === EMPTY) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Читает текущую сессию напрямую из localStorage.
 * На сервере (во время пререндера) localStorage недоступен — возвращаем null.
 *
 * @returns {StoredSession|null}
 */
export function readSession() {
  if (typeof window === "undefined") return null;
  return parseSession(window.localStorage.getItem(STORAGE_KEYS.session));
}

/**
 * Создаёт новую сессию: сохраняет вопросы, время старта и пустой список ответов.
 *
 * @param {{ attemptId: number|string, questions?: Array<Object>, startedAt?: string }} session
 * @returns {StoredSession}
 */
export function saveSession({ attemptId, questions = [], startedAt }) {
  /** @type {StoredSession} */
  const session = {
    attemptId,
    startedAt: startedAt ?? new Date().toISOString(),
    questions,
    answers: {},
  };
  writeSession(session);
  return session;
}

/**
 * Дописывает ответ на вопрос в текущую сессию.
 *
 * @param {number|string} questionId
 * @param {StoredAnswer} answer
 * @returns {StoredSession|null}
 */
export function saveSessionAnswer(questionId, answer) {
  const session = readSession();
  if (!session) return null;

  const next = {
    ...session,
    answers: { ...session.answers, [String(questionId)]: answer },
  };
  writeSession(next);
  return next;
}

/** Удаляет сессию и уведомляет подписчиков `useLocalStorage`. */
export function clearSession() {
  window.localStorage.removeItem(STORAGE_KEYS.session);
  window.dispatchEvent(new Event(`${STORAGE_KEYS.session}:change`));
}

/**
 * Итог завершённой сессии, сохранённый локально. Backend не хранит состав
 * попытки и не отдаёт разбор, поэтому агрегаты считает и хранит браузер.
 *
 * @typedef {Object} StoredResult
 * @property {number|string} attemptId
 * @property {string} startedAt
 * @property {string} finishedAt
 * @property {number} durationMs
 * @property {number} totalQuestions
 * @property {number} answered
 * @property {number} correctAnswers
 * @property {number} incorrectAnswers
 * @property {number} unanswered
 * @property {string} [serverStartedAt]
 * @property {string} [serverFinishedAt]
 */

/**
 * Безопасно разбирает сырой итог из localStorage.
 *
 * @param {string|null} raw
 * @returns {StoredResult|null}
 */
export function parseLastResult(raw) {
  if (!raw || raw === EMPTY) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Читает итог последней сессии. На сервере localStorage недоступен — null.
 *
 * @returns {StoredResult|null}
 */
export function readLastResult() {
  if (typeof window === "undefined") return null;
  return parseLastResult(window.localStorage.getItem(STORAGE_KEYS.result));
}

/**
 * Сохраняет итог завершённой сессии.
 *
 * @param {StoredResult} result
 * @returns {StoredResult}
 */
export function saveLastResult(result) {
  setLocalStorageItem(STORAGE_KEYS.result, JSON.stringify(result));
  return result;
}

/** Удаляет сохранённый итог и уведомляет подписчиков `useLocalStorage`. */
export function clearLastResult() {
  window.localStorage.removeItem(STORAGE_KEYS.result);
  window.dispatchEvent(new Event(`${STORAGE_KEYS.result}:change`));
}

/**
 * @param {StoredSession} session
 */
function writeSession(session) {
  setLocalStorageItem(STORAGE_KEYS.session, JSON.stringify(session));
}
