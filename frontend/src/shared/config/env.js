/**
 * Признак использования mock-данных вместо реального backend.
 *
 * Приоритет:
 * 1. Явная переменная NEXT_PUBLIC_USE_MOCKS ("true" / "false").
 * 2. Иначе — автоматически: mock включён в development, выключен в production.
 *
 * `process.env.NEXT_PUBLIC_*` и `process.env.NODE_ENV` инлайнятся Next.js
 * на этапе сборки, поэтому значение одинаково на клиенте и на сервере.
 */
const rawUseMocks = process.env.NEXT_PUBLIC_USE_MOCKS;

export const IS_MOCK_ENABLED =
  rawUseMocks === undefined || rawUseMocks === ""
    ? process.env.NODE_ENV !== "production"
    : rawUseMocks === "true";

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
