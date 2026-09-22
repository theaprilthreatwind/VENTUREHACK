import { STORAGE_KEYS } from "@/shared/config";

export function createPracticeSession({ topics, difficulty, status, repeat, totalQuestions }) {
  return {
    topics,
    difficulty,
    status,
    repeat,
    totalQuestions,
    createdAt: new Date().toISOString(),
  };
}

export function savePracticeSession(payload) {
  const session = createPracticeSession(payload);
  window.localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
  return session;
}

export function parsePracticeSession(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
