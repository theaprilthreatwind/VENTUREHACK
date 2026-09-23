"use client";

import { Loader2, Play } from "lucide-react";

import { countWord, useLang } from "@/shared/i18n";

export function SessionActionBar({ topics, questions, canStart, onStart, isPending, error }) {
  const { t, lang } = useLang();

  const topicsLabel = `${topics} ${countWord(lang, "themes", topics)}`;
  const questionsLabel = `${questions} ${countWord(lang, "questions", questions)}`;

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">
      {error && (
        <div className="pointer-events-auto rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 shadow-md dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}
      <div className="pointer-events-auto flex items-center gap-5 rounded-full border border-slate-300/80 bg-white/95 px-6 py-2.5 shadow-xl backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-tight text-slate-800 dark:text-slate-200">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span>
            {t("practice.selectedLabel", { topics: topicsLabel, questions: questionsLabel })}
          </span>
        </div>
        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />
        <button
          type="button"
          onClick={onStart}
          disabled={!canStart || isPending}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2 text-xs font-bold tracking-tight text-white shadow-md transition-all hover:bg-black hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Play className="h-3.5 w-3.5 fill-current" />
          )}
          <span>{isPending ? t("practice.pending") : t("practice.startSession")}</span>
        </button>
      </div>
    </div>
  );
}
