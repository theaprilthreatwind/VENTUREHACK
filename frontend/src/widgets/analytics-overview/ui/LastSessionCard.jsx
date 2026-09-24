"use client";

import Link from "next/link";
import { CheckCircle2, Clock, MinusCircle, Target, XCircle } from "lucide-react";

import { formatDuration, formatNumber } from "@/shared/lib";
import { useLang } from "@/shared/i18n";
import { toPercent } from "../model/analytics.mjs";

/**
 * Итог последней завершённой сессии из localStorage.
 *
 * @param {{ lastResult: import("@/entities/session").StoredResult | null }} props
 */
export function LastSessionCard({ lastResult }) {
  const { t } = useLang();

  if (!lastResult) {
    return (
      <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Target className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t("analytics.lastSessionTitle")}
          </h3>
        </div>
        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          {t("analytics.lastSessionEmpty")}
        </p>
        <Link
          href="/question-bank"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          {t("analytics.startPractice")}
        </Link>
      </article>
    );
  }

  const total = Number(lastResult.totalQuestions) || 0;
  const correct = Number(lastResult.correctAnswers) || 0;
  const incorrect = Number(lastResult.incorrectAnswers) || 0;
  const unanswered = Number(lastResult.unanswered) || 0;
  const percent = toPercent(correct, total);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Target className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t("analytics.lastSessionTitle")}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {t("analytics.lastSessionAttempt", { id: lastResult.attemptId })}
            </p>
          </div>
        </div>
        <p className="text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
          {percent}%
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <CheckCircle2 className="mx-auto h-4 w-4 text-emerald-600" aria-hidden="true" />
          <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {formatNumber(correct)}
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            {t("analytics.lastSessionCorrect")}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <XCircle className="mx-auto h-4 w-4 text-red-500" aria-hidden="true" />
          <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {formatNumber(incorrect)}
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            {t("analytics.lastSessionIncorrect")}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <MinusCircle className="mx-auto h-4 w-4 text-slate-400" aria-hidden="true" />
          <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {formatNumber(unanswered)}
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            {t("analytics.lastSessionUnanswered")}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
        <Clock className="h-4 w-4 text-slate-500" aria-hidden="true" />
        {t("analytics.lastSessionTime")}{" "}
        <span className="font-bold text-slate-900 dark:text-white">
          {formatDuration(lastResult.durationMs)}
        </span>
      </div>
    </article>
  );
}
