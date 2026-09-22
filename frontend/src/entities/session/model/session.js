import { STORAGE_KEYS } from "@/shared/config";

/**
 * Локальная запись о созданной попытке. Сам `attemptId` приходит с backend
 * (`POST /api/practice_page/start`), здесь только сохраняем его для страницы
 * прохождения.
 */
export function saveAttempt(attemptId) {
  window.localStorage.setItem(
    STORAGE_KEYS.session,
    JSON.stringify({ attemptId, createdAt: new Date().toISOString() })
  );
}

export function parseAttempt(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
