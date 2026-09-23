"use client";

import { useCallback, useMemo, useState } from "react";

import { saveAnswer } from "@/shared/api";
import { parseSession, saveSessionAnswer } from "@/entities/session";
import { useLocalStorage } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";

/**
 * Логика экрана прохождения сессии: текущий вопрос, выбор варианта,
 * отправка ответа на backend, отметка «на проверку» и навигация N/M.
 *
 * @returns {{
 *   session: import("@/entities/session").StoredSession | null,
 *   currentQuestion: Object | null,
 *   currentAnswer: import("@/entities/session").StoredAnswer | null,
 *   currentIndex: number,
 *   total: number,
 *   selectedOptionId: number|string|null,
 *   isSubmitting: boolean,
 *   error: string,
 *   submitAnswer: () => Promise<void>,
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
  const [error, setError] = useState("");
  const [flaggedQuestionIds, setFlaggedQuestionIds] = useState(() => new Set());

  const questions = session?.questions ?? [];
  const total = questions.length;
  const currentQuestion = questions[currentIndex] ?? null;
  const currentAnswer = currentQuestion
    ? session?.answers?.[String(currentQuestion.id)] ?? null
    : null;

  const submitAnswer = useCallback(async () => {
    if (!session || !currentQuestion || currentAnswer || selectedOptionId == null) {
      return;
    }

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
      setError(requestError.message ?? "Не удалось отправить ответ");
    } finally {
      setSubmitting(false);
    }
  }, [session, currentQuestion, currentAnswer, selectedOptionId]);

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
    selectedOptionId,
    isSubmitting,
    error,
    submitAnswer,
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
