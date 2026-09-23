/**
 * Признак production-сборки.
 *
 * `process.env.NODE_ENV` инлайнится Next.js на этапе сборки, поэтому значение
 * одинаково на клиенте и на сервере.
 */
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
