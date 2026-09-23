"use client";

import { useLang } from "@/shared/i18n";

const TABS = [
  { key: "login", labelKey: "auth.tabLogin" },
  { key: "register", labelKey: "auth.tabRegister" },
];

export function AuthTabs({ mode, onChange }) {
  const { t } = useLang();

  return (
    <div role="tablist" className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
      {TABS.map((tab) => {
        const active = mode === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.key)}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
              active
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t(tab.labelKey)}
          </button>
        );
      })}
    </div>
  );
}