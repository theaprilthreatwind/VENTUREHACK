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
 *
 * @returns {StoredSession|null}
 */
export function readSession() {
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
 * @param {StoredSession} session
 */
function writeSession(session) {
  setLocalStorageItem(STORAGE_KEYS.session, JSON.stringify(session));
}
