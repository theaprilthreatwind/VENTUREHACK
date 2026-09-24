"use client";

import { BookOpen } from "lucide-react";

import { formatNumber } from "@/shared/lib";
import { useLang } from "@/shared/i18n";

/**
 * Покрытие банка заданий: решено / всего + прогресс-бар.
 *
 * @param {{ coverage: { solved: number, total: number, percent: number } }} props
 */
export function CoverageCard({ coverage }) {
  const { t } = useLang();
  const { solved, total, percent } = coverage;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
          <BookOpen className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {t("analytics.coverageTitle")}
        </h3>
      </div>

      <p className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
        {formatNumber(solved)}
        <span className="text-2xl font-bold text-slate-400 dark:text-slate-500">
          {" / "}
          {total > 0 ? formatNumber(total) : "—"}
        </span>
      </p>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={t("analytics.coverageTitle")}
        className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
      >
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{t("analytics.coverageHint")}</span>
        <span className="font-bold text-slate-900 dark:text-white">{percent}%</span>
      </div>
    </article>
  );
}
