import { IS_MOCK_ENABLED } from "@/shared/config";
import * as realApiService from "./apiService";
import * as mockApiService from "./mockApiService";

/**
 * Единая точка входа в API.
 *
 * В development подставляется mockApiService, в production — реальный
 * apiService. Переключается флагом NEXT_PUBLIC_USE_MOCKS (см. shared/config/env.js).
 * Компоненты и хуки импортируют методы отсюда и не знают, откуда пришли данные.
 */
const impl = IS_MOCK_ENABLED ? mockApiService : realApiService;

export { ApiError, request } from "./apiService";

export const getSubjectsOverview = impl.getSubjectsOverview;
export const startPractice = impl.startPractice;
export const saveAnswer = impl.saveAnswer;
export const finishPractice = impl.finishPractice;
export const registerUser = impl.registerUser;
export const loginUser = impl.loginUser;
export const getUserByToken = impl.getUserByToken;
export const getUserById = impl.getUserById;
export const getUsers = impl.getUsers;
export const updateTargetScore = impl.updateTargetScore;

export const apiService = impl.apiService;
export const IS_MOCK = IS_MOCK_ENABLED;

export default apiService;
