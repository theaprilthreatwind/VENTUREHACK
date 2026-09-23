"use client";

import { useEffect } from "react";

import { STORAGE_KEYS } from "@/shared/config";
import { storageGet } from "@/shared/lib/storage";

/**
 * Применяет тему оформления (light/dark) к документу.
 *
 * Читает предпочтения из localStorage (ключ `entuz_prefs.theme`) и:
 *  - вешает/снимает класс `.dark` на <html> (от него зависят утилиты dark:*);
 *  - выставляет `color-scheme`, чтобы нативные контролы (range, date, checkbox)
 *    тоже переключались на тёмную тему.
 *
 * Реагирует на изменения ключа через событие `entuz_prefs:change`, которое
 * диспатчит storageSet при каждом обновлении настроек.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function ThemeProvider({ children }) {
  useEffect(() => {
    function applyTheme() {
      const prefs = storageGet(STORAGE_KEYS.prefs, null) ?? {};
      const isDark = prefs.theme === "dark";
      const root = document.documentElement;
      root.classList.toggle("dark", isDark);
      root.style.colorScheme = isDark ? "dark" : "light";
    }

    applyTheme();
    window.addEventListener(`${STORAGE_KEYS.prefs}:change`, applyTheme);
    return () => {
      window.removeEventListener(`${STORAGE_KEYS.prefs}:change`, applyTheme);
    };
  }, []);

  return children;
}