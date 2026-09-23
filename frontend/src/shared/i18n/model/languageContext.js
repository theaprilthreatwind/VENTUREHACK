"use client";

import { createContext } from "react";

/**
 * Контекст локализации. Продерживается языковой провайдер
 * `LanguageProvider`, значение — `{ lang, setLang, t }`.
 */
export const LanguageContext = createContext(null);