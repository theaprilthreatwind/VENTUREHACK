/**
 * Безопасный хелпер для работы с localStorage.
 *
 * Защищён от ошибок SSR/Next.js (нет window на сервере),
 * от невалидного JSON при десериализации и от SecurityError
 * в режиме incognito/iframe с заблокированным хранилищем.
 *
 * ВАЖНО: разделяем два типа хранения:
 *  - storageSet    — JSON.stringify (для объектов и чисел)
 *  - storageSetRaw — plain string   (для токенов, которые читаются через useLocalStorage)
 *
 * useLocalStorage использует getItem() без JSON.parse, поэтому токены
 * должны лежать как plain strings, иначе бэкенд получит '"token"' с кавычками.
 */

const isBrowser = () => typeof window !== "undefined";

/**
 * Сохраняет значение в localStorage как JSON-строку.
 * Используй для объектов, массивов, чисел и булевых.
 *
 * @template T
 * @param {string} key
 * @param {T} value
 * @returns {boolean} true — успешно, false — ошибка
 */
export function storageSet(key, value) {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(`${key}:change`));
    return true;
  } catch {
    return false;
  }
}

/**
 * Сохраняет строку в localStorage AS-IS (без JSON.stringify).
 * Используй для токенов и других plain-string значений,
 * которые читаются через useLocalStorage (он использует getItem без parse).
 *
 * @param {string} key
 * @param {string} value
 * @returns {boolean} true — успешно, false — ошибка
 */
export function storageSetRaw(key, value) {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, value);
    window.dispatchEvent(new Event(`${key}:change`));
    return true;
  } catch {
    return false;
  }
}

/**
 * Читает и десериализует JSON-значение из localStorage.
 * Возвращает defaultValue при отсутствии ключа или невалидном JSON.
 * Используй в паре с storageSet (для объектов).
 *
 * @template T
 * @param {string} key
 * @param {T} [defaultValue]
 * @returns {T | undefined}
 */
export function storageGet(key, defaultValue) {
  if (!isBrowser()) return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return /** @type {T} */ (JSON.parse(raw));
  } catch {
    return defaultValue;
  }
}

/**
 * Удаляет ключ из localStorage и оповещает подписчиков.
 *
 * @param {string} key
 * @returns {boolean} true — успешно, false — ошибка
 */
export function storageRemove(key) {
  if (!isBrowser()) return false;
  try {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new Event(`${key}:change`));
    return true;
  } catch {
    return false;
  }
}
