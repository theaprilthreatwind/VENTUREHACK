/**
 * Базовый адрес backend API.
 *
 * Используем same-origin: браузер ходит на /api/* того же хоста, что и
 * фронт, а Next.js проксирует эти запросы на реальный backend через
 * rewrites в next.config.mjs. Адрес самого backend задаётся переменной
 * NEXT_PUBLIC_API_URL (см. .env.local). Так обходится CORS, и страницы
 * работают как с backend, так и без него (через mock-fallback в shared/api).
 */
export const API_BASE_URL = "";