"use client";

import { useContext } from "react";

import { LanguageContext } from "./languageContext";

/**
 * Хук доступа к локализации: текущий язык, переключатель и функция перевода.
 *
 * @returns {{
 *   lang: "ru" | "kk",
 *   setLang: (lang: "ru" | "kk") => void,
 *   t: (key: string, vars?: Record<string, unknown>) => string,
 * }}
 */
export function useLang() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang должен использоваться внутри <LanguageProvider>");
  }
  return context;
}