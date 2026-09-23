"use client";

import { useLang } from "../model/useLang";

const OPTIONS = [
  { code: "ru", label: "RU" },
  { code: "kk", label: "KZ" },
];

/**
 * Компактный переключатель языка интерфейса (RU | KZ).
 * Пилюля для угла шапки / страницы авторизации.
 */
export function LanguageSwitcher() {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t("lang.switchLabel")}
      className="flex items-center rounded-full border border-slate-200 bg-white p-0.5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      {OPTIONS.map((option) => {
        const active = lang === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide transition-colors ${
              active
                ? "bg-[#131926] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}