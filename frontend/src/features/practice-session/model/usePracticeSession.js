"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import { finishPractice, generateQuestionExplanation, saveAnswer } from "@/shared/api";
import { addNotification } from "@/entities/notification";
import {
  parseSession,
  readLastResult,
  saveLastResult,
  saveSessionAnswer,
} from "@/entities/session";
import { resolveText } from "@/shared/i18n";
import { useLocalStorage } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";

/**
 * Логика экрана прохождения сессии: текущий вопрос, выбор варианта,
 * отправка ответа на backend, отметка «на проверку», навигация N/M
 * и завершение сессии с локальным расчётом итога.
 *
 * @returns {{
 *   session: import("@/entities/session").StoredSession | null,
 *   currentQuestion: Object | null,
 *   currentAnswer: import("@/entities/session").StoredAnswer | null,
 *   currentIndex: number,
 *   total: number,
 *   answeredCount: number,
 *   selectedOptionId: number|string|null,
 *   isSubmitting: boolean,
 *   isFinishing: boolean,
 *   isFinished: boolean,
 *   isExplaining: boolean,
 *   explainError: string,
 *   error: string,
 *   submitAnswer: () => Promise<void>,
 *   explainMistake: () => Promise<void>,
 *   finishAttempt: () => Promise<import("@/entities/session").StoredResult | null>,
 *   goNext: () => void,
 *   goPrev: () => void,
 *   goTo: (index: number) => void,
 *   isFirst: boolean,
 *   isLast: boolean,
 *   selectOption: (id: number|string) => void,
 *   isFlagged: boolean,
 *   toggleFlag: () => void,
 * }}
 */
export function usePracticeSession() {
  const raw = useLocalStorage(STORAGE_KEYS.session, "null");
  const session = useMemo(() => parseSession(raw), [raw]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isFinishing, setFinishing] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [isExplaining, setExplaining] = useState(false);
  const [explainError, setExplainError] = useState("");
  const [error, setError] = useState("");
  const [flaggedQuestionIds, setFlaggedQuestionIds] = useState(() => new Set());
  // Синхронная защита от параллельных вызовов finish/submit (двойной клик).
  const finishingRef = useRef(false);
  const submittingRef = useRef(false);

  const questions = session?.questions ?? [];
  const total = questions.length;
  const currentQuestion = questions[currentIndex] ?? null;
  const currentAnswer = currentQuestion
    ? session?.answers?.[String(currentQuestion.id)] ?? null
    : null;
  const answeredCount = session?.answers ? Object.keys(session.answers).length : 0;

  const submitAnswer = useCallback(async () => {
    if (!session || !currentQuestion || currentAnswer || selectedOptionId == null) {
      return;
    }
    if (submittingRef.current) return;

    submittingRef.current = true;
    setError("");
    setSubmitting(true);
    try {
      const result = await saveAnswer({
        attemptId: session.attemptId,
        questionId: currentQuestion.id,
        optionId: selectedOptionId,
      });

      saveSessionAnswer(currentQuestion.id, {
        optionId: selectedOptionId,
        correct: result.correct,
        explanation: result.explanation,
      });
    } catch (requestError) {
      setError(requestError.message ?? resolveText("errors.submitAnswer"));
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }, [session, currentQuestion, currentAnswer, selectedOptionId]);

  const explainMistake = useCallback(async () => {
    if (!session || !currentQuestion || !currentAnswer || isExplaining) return;

    setExplainError("");
    setExplaining(true);
    try {
      const question = await generateQuestionExplanation({
        questionId: currentQuestion.id,
        optionId: currentAnswer.optionId,
      });
      const explanation = question?.explanation?.trim();
      if (!explanation) {
        throw new Error(resolveText("errors.explainEmpty"));
      }

      saveSessionAnswer(currentQuestion.id, { ...currentAnswer, explanation });
    } catch (requestError) {
      setExplainError(requestError.message ?? resolveText("errors.explainFailed"));
    } finally {
      setExplaining(false);
    }
  }, [session, currentQuestion, currentAnswer, isExplaining]);

  const finishAttempt = useCallback(async () => {
    if (!session || finishingRef.current) return null;

    const existing = readLastResult();
    if (existing && String(existing.attemptId) === String(session.attemptId)) {
      setFinished(true);
      return existing;
    }

    // Снапшот конца берём до запроса finish — длительность без времени сети.
    const finishedAt = new Date().toISOString();
    const answers = session.answers ?? {};
    const answered = Object.keys(answers).length;
    const correctAnswers = Object.values(answers).filter((answer) => answer.correct).length;
    const durationMs = Math.max(
      new Date(finishedAt).getTime() - new Date(session.startedAt).getTime(),
      0
    );

    finishingRef.current = true;
    setError("");
    setFinishing(true);
    try {
      const server = await finishPractice(session.attemptId);
      const result = saveLastResult({
        attemptId: session.attemptId,
        startedAt: session.startedAt,
        finishedAt,
        durationMs,
        totalQuestions: total,
        answered,
        correctAnswers,
        incorrectAnswers: answered - correctAnswers,
        unanswered: Math.max(total - answered, 0),
        serverStartedAt: server?.startedAt,
        serverFinishedAt: server?.finishedAt,
      });
      addNotification({
        id: `result-${session.attemptId}`,
        type: "result",
        titleKey: "notifications.resultTitle",
        key: "notifications.resultText",
        vars: {
          correct: correctAnswers,
          total,
          percent: total > 0 ? Math.round((correctAnswers / total) * 100) : 0,
        },
      });
      if (total > 0 && correctAnswers === total) {
        addNotification({
          id: `perfect-${session.attemptId}`,
          type: "achievement",
          titleKey: "notifications.perfectTitle",
          key: "notifications.perfectText",
          vars: { total },
        });
      }
      setFinished(true);
      return result;
    } catch (requestError) {
      setError(requestError.message ?? resolveText("errors.finishSession"));
      return null;
    } finally {
      finishingRef.current = false;
      setFinishing(false);
    }
  }, [session, total]);

  const resetTransient = useCallback(() => {
    setError("");
    setSelectedOptionId(null);
  }, []);

  const goNext = useCallback(() => {
    resetTransient();
    setCurrentIndex((index) => Math.min(index + 1, total - 1));
  }, [resetTransient, total]);

  const goPrev = useCallback(() => {
    resetTransient();
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, [resetTransient]);

  const goTo = useCallback(
    (index) => {
      if (total === 0) return;
      resetTransient();
      setCurrentIndex(Math.min(Math.max(index, 0), total - 1));
    },
    [resetTransient, total]
  );

  const selectOption = useCallback(
    (optionId) => {
      if (currentAnswer) return;
      setSelectedOptionId(optionId);
    },
    [currentAnswer]
  );

  const toggleFlag = useCallback(() => {
    if (!currentQuestion) return;
    setFlaggedQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) next.delete(currentQuestion.id);
      else next.add(currentQuestion.id);
      return next;
    });
  }, [currentQuestion]);

  return {
    session,
    currentQuestion,
    currentAnswer,
    currentIndex,
    total,
    answeredCount,
    selectedOptionId,
    isSubmitting,
    isFinishing,
    isFinished,
    isExplaining,
    explainError,
    error,
    submitAnswer,
    explainMistake,
    finishAttempt,
    goNext,
    goPrev,
    goTo,
    isFirst: currentIndex === 0,
    isLast: total > 0 && currentIndex === total - 1,
    selectOption,
    isFlagged: currentQuestion ? flaggedQuestionIds.has(currentQuestion.id) : false,
    toggleFlag,
  };
}
