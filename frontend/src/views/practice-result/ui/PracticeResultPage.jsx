"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { parseLastResult } from "@/entities/session";
import { useLocalStorage } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";

export function PracticeResultPage() {
  const raw = useLocalStorage(STORAGE_KEYS.result, "null");
  const result = parseLastResult(raw);

  if (!result) {
    return (
      <div className="mx-auto w-full max-w-lg py-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto h-10 w-10 text-slate-300" aria-hidden="true" />
          <h1 className="mt-4 text-lg font-semibold text-slate-900">Результат недоступен</h1>
          <p className="mt-2 text-sm text-slate-500">
            Данных о последней сессии нет. Пройдите новый тест.
          </p>
          <Link
            href="/practice"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Новая сессия
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
          Сессия завершена
        </h1>
        <p className="mt-1 text-sm text-slate-500">Попытка #{result.attemptId}</p>

        <p className="mt-6 text-sm text-slate-600">
          Верно: <span className="font-bold text-slate-900">{result.correctAnswers}</span> из{" "}
          <span className="font-bold text-slate-900">{result.totalQuestions}</span>
        </p>
      </article>
    </div>
  );
}
