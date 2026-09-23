"use client";

import { useCallback, useEffect, useMemo } from "react";

import { STORAGE_KEYS } from "@/shared/config";
import { setLocalStorageItem, useLocalStorage } from "@/shared/lib";
import { translateText } from "../config/translations";
import { LanguageContext } from "./languageContext";

const DEFAULT_LANG = "ru";

/**
 * Провайдер локализации интерфейса (RU/KK).
 *
 * Язык хранится в localStorage (ключ `entuz_lang`) и читается реактивно через
 * `useLocalStorage`: при SSR/гидрации отдаёт язык по умолчанию (`ru`), а после
 * монтирования подхватывает сохранённый. Смена языка через `setLang`
 * (storageSetRaw) оповещает все вкладки и перерендеривает подписчиков.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function LanguageProvider({ children }) {
  const stored = useLocalStorage(STORAGE_KEYS.lang, DEFAULT_LANG);
  const lang = stored === "kk" ? "kk" : DEFAULT_LANG;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key, vars) => translateText(lang, key, vars),
    [lang]
  );

  const setLang = useCallback((next) => {
    setLocalStorageItem(STORAGE_KEYS.lang, next === "kk" ? "kk" : "ru");
  }, []);

  const contextValue = useMemo(
    () => ({ lang, setLang, t }),
    [lang, setLang, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}