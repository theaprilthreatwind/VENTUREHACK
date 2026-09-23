import { storageSet } from "@/shared/lib/storage";
import { STORAGE_KEYS } from "@/shared/config";

/**
 * Сохраняет полную сессию (attemptId + вопросы) в localStorage.
 *
 * @param {{ attemptId: number|string, questions: import("@/shared/api").Question[] }} session
 */
export function saveAttempt(session) {
  storageSet(STORAGE_KEYS.session, {
    attemptId: session.attemptId,
    questions: session.questions ?? [],
    createdAt: new Date().toISOString(),
  });
}

/**
 * @param {string | null} raw
 * @returns {{ attemptId: number|string, questions: any[], createdAt: string } | null}
 */
export function parseAttempt(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
