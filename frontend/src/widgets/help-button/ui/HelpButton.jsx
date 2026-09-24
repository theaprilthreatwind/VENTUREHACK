"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

import { useLang } from "@/shared/i18n";

/**
 * Плавающая кнопка «Справочник и материалы» в правом нижнем углу.
 * Ведёт в банк вопросов — единственный публичный раздел с материалами.
 */
export function HelpButton() {
  const { t } = useLang();

  return (
    <Link
      href="/question-bank"
      aria-label={t("app.materials")}
      title={t("app.materials")}
      className="fixed bottom-7 right-7 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#131926] text-white shadow-xl transition-transform hover:scale-105 hover:bg-slate-800 active:scale-95"
    >
      <BookOpen className="h-5 w-5" aria-hidden="true" />
    </Link>
  );
}
