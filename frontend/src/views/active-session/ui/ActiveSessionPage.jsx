"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2, Play } from "lucide-react";
import { finishPractice } from "@/shared/api";
import { parseAttempt } from "@/entities/session";
import { useLocalStorage } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-10 w-10 text-slate-300" />
        <h1 className="mt-4 text-lg font-semibold text-slate-900">Сессия не найдена</h1>
        <p className="mt-2 text-sm text-slate-500">
          Сначала соберите набор вопросов в банке.
        </p>
        <Link
          href="/practice"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          К банку вопросов
        </Link>
      </div>
    </div>
  );
}

export function ActiveSessionPage() {
  const raw = useLocalStorage(STORAGE_KEYS.session, "null");
  const attempt = parseAttempt(raw);

  const [stats, setStats] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!attempt?.attemptId) {
    return <NotFound />;
  }

  const finish = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await finishPractice(attempt.attemptId);
      setStats(result);
    } catch (err) {
      setError(err.message ?? "Не удалось завершить тест");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-lg">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <Play className="h-7 w-7 text-blue-600" />
          </span>

          {stats ? (
            <>
              <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900">
                Тест завершён
              </h1>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Вопросов
                  </p>
                  <p className="mt-1 text-3xl font-black text-slate-900">
                    {stats.totalQuestions}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Верно
                  </p>
                  <p className="mt-1 text-3xl font-black text-emerald-600">
                    {stats.correctAnswers}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                {new Date(stats.startedAt).toLocaleString("ru-RU")} —{" "}
                {new Date(stats.finishedAt).toLocaleString("ru-RU")}
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900">
                Сессия создана
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Попытка #{attempt.attemptId} • создана{" "}
                {new Date(attempt.createdAt).toLocaleString("ru-RU")}
              </p>

              {error && (
                <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={finish}
                disabled={isLoading}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#131926] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                Завершить тест
              </button>
            </>
          )}

          <div className="mt-4">
            <Link href="/practice" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
              ← Изменить выбор
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
