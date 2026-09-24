"use client";

import { AlertCircle, RotateCcw } from "lucide-react";

import { useLang } from "@/shared/i18n";

export default function Error({ error, retry }) {
  const { t } = useLang();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 dark:bg-slate-950">
      <div
        role="alert"
        className="w-full max-w-md rounded-3xl border border-red-200 bg-red-50 p-8 text-center shadow-sm dark:border-red-700/60 dark:bg-red-950/40"
      >
        <AlertCircle className="mx-auto h-10 w-10 text-red-500" aria-hidden="true" />
        <h1 className="mt-4 text-lg font-semibold text-red-700 dark:text-red-400">
          {t("error.title")}
        </h1>
        <p className="mt-2 text-sm text-red-600 dark:text-red-300">
          {t("error.description")}
        </p>
        {error?.message && (
          <p className="mt-2 break-words text-xs text-red-400 dark:text-red-500/80">
            {error.message}
          </p>
        )}
        <button
          type="button"
          onClick={() => retry()}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {t("error.retry")}
        </button>
      </div>
    </div>
  );
}
