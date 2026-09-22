"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Play } from "lucide-react";
import { parsePracticeSession } from "@/entities/session";
import { useLocalStorage } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";

export function ActiveSessionPage() {
  const raw = useLocalStorage(STORAGE_KEYS.session, "null");
  const session = parsePracticeSession(raw);

  if (!session || !Array.isArray(session.topics)) {
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-lg">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-blue-100">
            <Play className="h-7 w-7 text-blue-600" />
          </span>
          <h1 className="mt-4 text-xl font-extrabold tracking-tight text-slate-900">
            Сессия создана
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {session.totalQuestions ?? 0} вопросов • создана{" "}
            {new Date(session.createdAt).toLocaleString("ru-RU")}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              Difficulty: {session.difficulty ?? "Any"}
            </span>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              Status: {session.status ?? "Any"}
            </span>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              Review: {session.repeat ?? "Any"}
            </span>
          </div>

          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#131926] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            <Play className="h-4 w-4" />
            Начать тест
          </button>
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
