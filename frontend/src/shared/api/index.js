/**
 * Единая точка входа в API.
 *
 * Все запросы идут напрямую в backend по `API_BASE_URL`
 * (см. `shared/config/api.js`). Mock-реализация удалена — источник данных
 * только реальный backend.
 */
export * from "./apiService";
export { default } from "./apiService";
