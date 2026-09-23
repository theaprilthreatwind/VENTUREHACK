"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2 } from "lucide-react";

import {
  AnswerOptions,
  QuestionCard,
  QuestionNavigator,
  VerdictPanel,
  usePracticeSession,
} from "@/features/practice-session";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-10 w-10 text-slate-300" aria-hidden="true" />
        <h1 className="mt-4 text-lg font-semibold text-slate-900">Сессия не найдена</h1>
        <p className="mt-2 text-sm text-slate-500">
          Сначала соберите набор вопросов в банке.
        </p>
        <Link
          href="/practice"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          К банку вопросов
        </Link>
      </div>
    </div>
  );
}

export function ActiveSessionPage() {
  const {
    session,
    currentQuestion,
    currentAnswer,
    currentIndex,
    total,
    selectedOptionId,
    isSubmitting,
    error,
    submitAnswer,
    goNext,
    goPrev,
    goTo,
    isFirst,
    isLast,
    selectOption,
    isFlagged,
    toggleFlag,
  } = usePracticeSession();

  if (!currentQuestion || total === 0) {
    return <NotFound />;
  }

  const answeredId = currentAnswer?.optionId ?? null;
  const correctOptionId =
    currentQuestion.options?.find((option) => option.correct)?.id ?? null;
  const canAnswer = selectedOptionId != null && !isSubmitting && !currentAnswer;
  const answeredQuestionIds = new Set(Object.keys(session?.answers ?? {}));

  return (
    <div className="mx-auto w-full max-w-3xl">
      <QuestionCard
        number={currentIndex + 1}
        question={currentQuestion}
        isFlagged={isFlagged}
        onToggleFlag={toggleFlag}
      />

      <AnswerOptions
        options={currentQuestion.options ?? []}
        selectedId={selectedOptionId}
        answeredId={answeredId}
        correctOptionId={correctOptionId}
        isDisabled={Boolean(currentAnswer) || isSubmitting}
        onSelect={selectOption}
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

      <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Назад
        </button>

        <QuestionNavigator
          currentIndex={currentIndex}
          questions={session?.questions ?? []}
          answeredQuestionIds={answeredQuestionIds}
          onSelect={goTo}
        />

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <button
            type="button"
            onClick={submitAnswer}
            disabled={!canAnswer}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Check className="h-4 w-4" aria-hidden="true" />
            )}
            {isSubmitting ? "Проверяем…" : "Проверить"}
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={isLast}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-6 py-2.5 text-sm font-bold text-slate-900 transition-all hover:bg-slate-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-900 sm:flex-none"
          >
            Далее
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
