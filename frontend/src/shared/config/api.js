/**
 * Базовый адрес backend API.
 * Переопределяется через переменную окружения NEXT_PUBLIC_API_URL.
 * Spring Boot по умолчанию слушает порт 8080.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
