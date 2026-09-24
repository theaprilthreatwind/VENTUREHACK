"use client";

import Link from "next/link";
import { AlertCircle, Loader2, RotateCcw } from "lucide-react";

import { useLang } from "@/shared/i18n";
import { useAnalyticsOverview } from "../model/useAnalyticsOverview";
import { CoverageCard } from "./CoverageCard";
import { KpiGrid } from "./KpiGrid";
import { LastSessionCard } from "./LastSessionCard";

/**
 * Сводка успеваемости: KPI, покрытие банка заданий и последняя сессия.
 * Все состояния (загрузка, ошибка, гость, пусто, успех) обрабатываются здесь.
 */
export function AnalyticsOverview() {
  const { user, stats, lastResult, coverage, isLoading, error, reload } =
    useAnalyticsOverview();
  const { t } = useLang();

  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white p-10 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
      >
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        {t("analytics.loading")}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t("analytics.guest")}
        </p>
        <Link
          href="/auth"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          {t("analytics.signIn")}
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center shadow-sm dark:border-red-700/60 dark:bg-red-950/40"
      >
        <AlertCircle className="mx-auto h-8 w-8 text-red-500" aria-hidden="true" />
        <p className="mt-2 text-sm font-semibold text-red-700 dark:text-red-400">
          {error}
        </p>
        <button
          type="button"
          onClick={reload}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#131926] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {t("analytics.retry")}
        </button>
      </div>
    );
  }

  const isStatsEmpty =
    !stats ||
    ((Number(stats.totalQuestionsSolved) || 0) === 0 &&
      (Number(stats.totalTestsSolved) || 0) === 0 &&
      !lastResult);

  return (
    <div className="space-y-6">
      <KpiGrid stats={stats} />

      {isStatsEmpty && (
        <p className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          {t("analytics.empty")}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CoverageCard coverage={coverage} />
        <LastSessionCard lastResult={lastResult} />
      </div>
    </div>
  );
}
