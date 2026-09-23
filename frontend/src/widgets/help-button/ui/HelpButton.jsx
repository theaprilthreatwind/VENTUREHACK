"use client";

import { BookOpen } from "lucide-react";

import { useLang } from "@/shared/i18n";

/**
 * Плавающая кнопка «Справочник и материалы» в правом нижнем углу.
 * Вынесена в клиентский компонент, чтобы aria-label реагировал на язык.
 */
export function HelpButton() {
  const { t } = useLang();

  return (
    <button
      type="button"
      aria-label={t("app.materials")}
      className="fixed bottom-7 right-7 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#131926] text-white shadow-xl transition-transform hover:scale-105 hover:bg-slate-800 active:scale-95"
    >
      <BookOpen className="h-5 w-5" />
    </button>
  );
}