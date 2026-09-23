import { STORAGE_KEYS } from "@/shared/config";
import { storageGet, storageSet, storageRemove } from "@/shared/lib";

/**
 * Локальное уведомление приложения. Backend-уведомлений нет, поэтому события
 * генерирует сам фронт (например, завершение сессии) и хранит их в браузере.
 *
 * @typedef {Object} AppNotification
 * @property {string} id — уникальный идентификатор (например, `result-{attemptId}`)
 * @property {"result"|"achievement"} type — тип события
 * @property {string} titleKey — i18n-ключ заголовка
 * @property {string} key — i18n-ключ текста
 * @property {Record<string, unknown>} [vars] — плейсхолдеры для текста
 * @property {string} createdAt — ISO-дата создания
 * @property {boolean} read — прочитано ли пользователем
 */

export const MAX_NOTIFICATIONS = 50;

const EMPTY = "[]";

/**
 * Безопасно разбирает сырое значение списка уведомлений.
 *
 * @param {string|null} raw
 * @returns {AppNotification[]}
 */
export function parseNotifications(raw) {
  if (!raw || raw === EMPTY) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Читает список уведомлений напрямую из localStorage.
 * На сервере localStorage недоступен — пустой список.
 *
 * @returns {AppNotification[]}
 */
export function readNotifications() {
  if (typeof window === "undefined") return [];
  return parseNotifications(window.localStorage.getItem(STORAGE_KEYS.notifications));
}

/**
 * @param {AppNotification[]} notifications
 */
function writeNotifications(notifications) {
  storageSet(STORAGE_KEYS.notifications, notifications.slice(0, MAX_NOTIFICATIONS));
}

/**
 * Уведомления добавляются только при включённых in-app оповещениях
 * (настройка `entuz_prefs.inAppAlerts`, по умолчанию включены).
 *
 * @returns {boolean}
 */
function isInAppAlertsEnabled() {
  const prefs = storageGet(STORAGE_KEYS.prefs, {}) ?? {};
  return prefs.inAppAlerts !== false;
}

/**
 * Добавляет уведомление в начало списка. Дубликаты по `id` игнорируются.
 * Реагирует на переключатель «Уведомления в приложении» в настройках.
 *
 * @param {{ id: string, type: AppNotification["type"], titleKey: string, key: string, vars?: Record<string, unknown> }} source
 */
export function addNotification(source) {
  if (typeof window === "undefined") return;
  if (!isInAppAlertsEnabled()) return;

  const list = readNotifications();
  if (list.some((item) => item.id === source.id)) return;

  /** @type {AppNotification} */
  const notification = {
    ...source,
    createdAt: new Date().toISOString(),
    read: false,
  };
  writeNotifications([notification, ...list]);
}

/**
 * Отмечает одно уведомление прочитанным.
 *
 * @param {string} id
 */
export function markNotificationRead(id) {
  const next = readNotifications().map((item) =>
    item.id === id ? { ...item, read: true } : item
  );
  writeNotifications(next);
}

/** Отмечает все уведомления прочитанными. */
export function markAllNotificationsRead() {
  const list = readNotifications();
  if (list.length === 0) return;
  writeNotifications(list.map((item) => ({ ...item, read: true })));
}

/** Очищает список уведомлений. */
export function clearNotifications() {
  storageRemove(STORAGE_KEYS.notifications);
}