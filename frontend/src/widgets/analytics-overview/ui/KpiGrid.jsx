"use client";

import { BarChart3, CheckCircle2, ListChecks, Trophy } from "lucide-react";

import { formatNumber } from "@/shared/lib";
import { useLang } from "@/shared/i18n";

/**
 * Четыре KPI-карточки из общей статистики пользователя.
 *
 * @param {{ stats: import("@/shared/api").UserStats | null }} props
 */
export function KpiGrid({ stats }) {
  const { t } = useLang();
  const success = Math.round(Number(stats?.overallSuccessRate) || 0);

  const items = [
    {
      key: "tests",
      icon: BarChart3,
      label: t("analytics.kpiTests"),
      value: formatNumber(Number(stats?.totalTestsSolved) || 0),
    },
    {
      key: "solved",
      icon: ListChecks,
      label: t("analytics.kpiSolved"),
      value: formatNumber(Number(stats?.totalQuestionsSolved) || 0),
    },
    {
      key: "correct",
      icon: CheckCircle2,
      label: t("analytics.kpiCorrect"),
      value: formatNumber(Number(stats?.correctAnswers) || 0),
    },
    {
      key: "success",
      icon: Trophy,
      label: t("analytics.kpiSuccess"),
      value: `${success}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article
            key={item.key}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {item.value}
            </p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {item.label}
            </p>
          </article>
        );
      })}
    </div>
  );
}
