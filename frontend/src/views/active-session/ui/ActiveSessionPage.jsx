"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import {
  AnswerOptions,
  QuestionCard,
  SessionProgress,
  VerdictPanel,
  usePracticeSession,
} from "@/features/practice-session";

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
  const {
    currentQuestion,
    currentAnswer,
    currentIndex,
    total,
    selectedOptionId,
    setSelectedOptionId,
    isSubmitting,
    error,
    submitAnswer,
    goNext,
    goPrev,
    isFirst,
    isLast,
  } = usePracticeSession();

  if (!currentQuestion || total === 0) {
    return <NotFound />;
  }

  const answeredId = currentAnswer?.optionId ?? null;
  const correctOptionId =
    currentQuestion.options?.find((option) => option.correct)?.id ?? null;
  const canAnswer = selectedOptionId != null && !isSubmitting && !currentAnswer;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <SessionProgress current={currentIndex} total={total} />

      <QuestionCard question={currentQuestion} />

      <AnswerOptions
        options={currentQuestion.options ?? []}
        selectedId={selectedOptionId}
        answeredId={answeredId}
        correctOptionId={correctOptionId}
        isDisabled={Boolean(currentAnswer) || isSubmitting}
        onSelect={setSelectedOptionId}
      />

      {currentAnswer && (
        <VerdictPanel
          correct={currentAnswer.correct}
          explanation={currentAnswer.explanation}
        />
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Назад
        </button>

        {currentAnswer ? (
          <button
            type="button"
            onClick={goNext}
            disabled={isLast}
            className="inline-flex items-center gap-2 rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Следующий вопрос
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submitAnswer}
            disabled={!canAnswer}
            className="inline-flex items-center gap-2 rounded-xl bg-[#131926] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {isSubmitting ? "Отправляем…" : "Ответить"}
          </button>
        )}
      </div>
    </div>
  );
}
