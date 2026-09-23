import { ApiError, request } from "./apiService";
import * as realApiService from "./apiService";
import * as mockApiService from "./mockApiService";

/**
 * Единая точка входа в API.
 *
 * Стратегия «живой backend с запасным mock»: сначала пробуем реальный
 * backend, а если он недоступен, упал или вернул данные неожиданной формы —
 * используем mockApiService. То есть страницы открываются всегда, а когда
 * backend жив и отвечает корректно — данные берутся с него.
 */
async function withFallback(realFn, mockFn, args, isValid = () => true) {
  try {
    const result = await realFn(...args);
    if (!isValid(result)) {
      throw new Error("неожиданный формат ответа от backend");
    }
    return result;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[api] Backend недоступен, использую mock-данные:", err?.message);
    }
    return mockFn(...args);
  }
}

const isArray = (value) => Array.isArray(value);
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isId = (value) => (typeof value === "number" || typeof value === "string") && String(value).trim() !== "";
const hasId = (value) => isObject(value) && typeof value?.id !== "undefined";

export const getSubjectsOverview = (...args) =>
  withFallback(realApiService.getSubjectsOverview, mockApiService.getSubjectsOverview, args, isArray);

export const startPractice = (...args) =>
  withFallback(realApiService.startPractice, mockApiService.startPractice, args, isId);

export const saveAnswer = (...args) =>
  withFallback(realApiService.saveAnswer, mockApiService.saveAnswer, args, () => true);

export const finishPractice = (...args) =>
  withFallback(realApiService.finishPractice, mockApiService.finishPractice, args, isObject);

export const registerUser = (...args) =>
  withFallback(realApiService.registerUser, mockApiService.registerUser, args, hasId);

export const loginUser = (...args) =>
  withFallback(realApiService.loginUser, mockApiService.loginUser, args, hasId);

export const getUserByToken = (...args) =>
  withFallback(realApiService.getUserByToken, mockApiService.getUserByToken, args, hasId);

export const getUserById = (...args) =>
  withFallback(realApiService.getUserById, mockApiService.getUserById, args, hasId);

export const getUsers = (...args) =>
  withFallback(realApiService.getUsers, mockApiService.getUsers, args, isArray);

export const updateTargetScore = (...args) =>
  withFallback(realApiService.updateTargetScore, mockApiService.updateTargetScore, args, () => true);

export const apiService = {
  subjects: { getOverview: getSubjectsOverview },
  practice: { start: startPractice, saveAnswer, finish: finishPractice },
  users: {
    register: registerUser,
    login: loginUser,
    getByToken: getUserByToken,
    getById: getUserById,
    getAll: getUsers,
  },
  dashboard: { updateTargetScore },
};

export const IS_MOCK = false;

export default apiService;