import { ApiError } from "./apiService";
import { subjectsOverview, users } from "./mock/fixtures";

/* -------------------------------------------------------------------------- */
/*                                   Utils                                    */
/* -------------------------------------------------------------------------- */

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const clone = (value) => JSON.parse(JSON.stringify(value));

/**
 * Хранилище созданных попыток, чтобы finishPractice мог вернуть статистику.
 * @type {Map<string, { questionsCount: number, startedAt: string }>}
 */
const attempts = new Map();
let attemptCounter = 0;

/* -------------------------------------------------------------------------- */
/*                                 Endpoints                                  */
/* -------------------------------------------------------------------------- */

/** `GET /api/subjects/overview` */
export async function getSubjectsOverview() {
  await delay();
  return clone(subjectsOverview);
}

/** `POST /api/practice_page?userId={userId}` */
export async function startPractice({ userId, questionsCount = 0 } = {}) {
  await delay();
  if (userId === undefined || userId === null) {
    throw new ApiError("Не передан обязательный параметр userId", { status: 400 });
  }

  const attemptId = String(++attemptCounter);
  attempts.set(attemptId, {
    questionsCount,
    startedAt: new Date().toISOString(),
  });
  return attemptId;
}

/** `POST /api/practice_page/{attemptId}/answers` */
export async function saveAnswer() {
  await delay(150);
  return null;
}

/** `POST /api/practice_page/{attemptId}/finish` */
export async function finishPractice(attemptId) {
  await delay();
  const attempt = attempts.get(String(attemptId));

  const totalQuestions = attempt?.questionsCount ?? 0;
  return {
    totalQuestions,
    correctAnswers: Math.round(totalQuestions * 0.7),
    startedAt: attempt?.startedAt ?? new Date().toISOString(),
    finishedAt: new Date().toISOString(),
  };
}

/** `GET /api/users/token?token={token}` */
export async function getUserByToken(token) {
  await delay();
  const user = users.find((item) => item.token === token);
  if (!user) {
    throw new ApiError("Пользователь с таким токеном не найден", { status: 404 });
  }
  return clone(user);
}

/** `GET /api/users/{userId}` */
export async function getUserById(userId) {
  await delay();
  const user = users.find((item) => String(item.id) === String(userId));
  if (!user) {
    throw new ApiError("Пользователь не найден", { status: 404 });
  }
  return clone(user);
}

/** `GET /api/users` */
export async function getUsers() {
  await delay();
  return clone(users);
}

/** `PUT /api/dashboard/{userId}/topics/{topicId}/target-score` */
export async function updateTargetScore({ scoreGoal } = {}) {
  await delay();
  if (typeof scoreGoal !== "number") {
    throw new ApiError("scoreGoal должен быть числом", { status: 400 });
  }
  return null;
}

/* -------------------------------------------------------------------------- */
/*                              Grouped service                               */
/* -------------------------------------------------------------------------- */

export const apiService = {
  subjects: { getOverview: getSubjectsOverview },
  practice: { start: startPractice, saveAnswer, finish: finishPractice },
  users: { getByToken: getUserByToken, getById: getUserById, getAll: getUsers },
  dashboard: { updateTargetScore },
};

export default apiService;
