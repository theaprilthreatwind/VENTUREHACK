"use client";

import Link from "next/link";
import { Home, SearchX } from "lucide-react";

import { useLang } from "@/shared/i18n";

export default function NotFound() {
  const { t } = useLang();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <SearchX className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" aria-hidden="true" />
        <h1 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
          {t("notFound.title")}
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {t("notFound.description")}
        </p>
        <Link
          href="/question-bank"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          {t("notFound.home")}
        </Link>
      </div>
    </div>
  );
}
