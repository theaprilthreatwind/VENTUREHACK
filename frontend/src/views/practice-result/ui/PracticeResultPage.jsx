"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  LayoutDashboard,
  MinusCircle,
  RotateCcw,
  Target,
  XCircle,
} from "lucide-react";

import { parseLastResult } from "@/entities/session";
import { formatDuration, formatNumber, useLocalStorage } from "@/shared/lib";
import { useLang } from "@/shared/i18n";
import { STORAGE_KEYS } from "@/shared/config";

export function PracticeResultPage() {
  const raw = useLocalStorage(STORAGE_KEYS.result, "null");
  const result = parseLastResult(raw);
  const { t } = useLang();

  if (!result) {
    return (
      <div className="mx-auto w-full max-w-lg py-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto h-10 w-10 text-slate-300" aria-hidden="true" />
          <h1 className="mt-4 text-lg font-semibold text-slate-900">{t("result.unavailableTitle")}</h1>
          <p className="mt-2 text-sm text-slate-500">
            {t("result.unavailableDesc")}
          </p>
          <Link
            href="/practice"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t("result.newSession")}
          </Link>
        </div>
      </div>
    );
  }

  const total = result.totalQuestions ?? 0;
  const correct = result.correctAnswers ?? 0;
  const incorrect = result.incorrectAnswers ?? Math.max(total - correct, 0);
  const unanswered = result.unanswered ?? Math.max(total - correct - incorrect, 0);
  const correctPercent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const incorrectPercent = total > 0 ? 100 - correctPercent : 0;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Target className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              {t("result.title")}
            </h1>
            <p className="text-xs text-slate-400">{t("result.attempt", { id: result.attemptId })}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-emerald-50 p-4 text-center">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
              {t("result.correctLabel")}
            </p>
            <p className="mt-1 text-3xl font-black text-emerald-700">{correctPercent}%</p>
            <p className="mt-1 text-xs text-emerald-700">
              {t("result.ofTotal", { count: formatNumber(correct), total: formatNumber(total) })}
            </p>
          </div>
          <div className="rounded-2xl bg-red-50 p-4 text-center">
            <p className="text-[11px] font-bold uppercase tracking-wider text-red-600">
              {t("result.incorrectLabel")}
            </p>
            <p className="mt-1 text-3xl font-black text-red-700">{incorrectPercent}%</p>
            <p className="mt-1 text-xs text-red-700">
              {t("result.ofTotal", { count: formatNumber(incorrect), total: formatNumber(total) })}
            </p>
          </div>
        </div>

        <div
          role="img"
          aria-label={t("result.chartAria", { correct: correctPercent, incorrect: incorrectPercent })}
          className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-slate-100"
        >
          <div className="h-full bg-emerald-500" style={{ width: `${correctPercent}%` }} />
          <div className="h-full bg-red-400" style={{ width: `${incorrectPercent}%` }} />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl border border-slate-200 p-3">
            <CheckCircle2 className="mx-auto h-4 w-4 text-emerald-600" aria-hidden="true" />
            <p className="mt-1 text-lg font-bold text-slate-900">{formatNumber(correct)}</p>
            <p className="text-[11px] text-slate-400">{t("result.correct")}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-3">
            <XCircle className="mx-auto h-4 w-4 text-red-500" aria-hidden="true" />
            <p className="mt-1 text-lg font-bold text-slate-900">{formatNumber(incorrect)}</p>
            <p className="text-[11px] text-slate-400">{t("result.incorrect")}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-3">
            <MinusCircle className="mx-auto h-4 w-4 text-slate-400" aria-hidden="true" />
            <p className="mt-1 text-lg font-bold text-slate-900">{formatNumber(unanswered)}</p>
            <p className="text-[11px] text-slate-400">{t("result.unanswered")}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <Clock className="h-4 w-4 text-slate-500" aria-hidden="true" />
          {t("result.time")} <span className="font-bold text-slate-900">{formatDuration(result.durationMs)}</span>
        </div>
      </article>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/practice"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition-all hover:bg-slate-900 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {t("result.newSession")}
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-slate-800"
        >
          <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
          {t("result.toDashboard")}
        </Link>
      </div>
    </div>
  );
}
