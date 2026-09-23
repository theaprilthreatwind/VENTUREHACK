"use client";

import { useCallback, useMemo, useState } from "react";

import { saveAnswer } from "@/shared/api";
import { parseSession, saveSessionAnswer } from "@/entities/session";
import { useLocalStorage } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";

/**
 * Логика экрана прохождения сессии: текущий вопрос, выбор варианта,
 * отправка ответа на backend и навигация N/M.
 *
 * @returns {{
 *   session: import("@/entities/session").StoredSession | null,
 *   currentQuestion: Object | null,
 *   currentAnswer: import("@/entities/session").StoredAnswer | null,
 *   currentIndex: number,
 *   total: number,
 *   selectedOptionId: number|string|null,
 *   setSelectedOptionId: (id: number|string|null) => void,
 *   isSubmitting: boolean,
 *   error: string,
 *   submitAnswer: () => Promise<void>,
 *   goNext: () => void,
 *   goPrev: () => void,
 *   isFirst: boolean,
 *   isLast: boolean,
 * }}
 */
export function usePracticeSession() {
  const raw = useLocalStorage(STORAGE_KEYS.session, "null");
  const session = useMemo(() => parseSession(raw), [raw]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  const goNext = useCallback(() => {
    setError("");
    setSelectedOptionId(null);
    setCurrentIndex((index) => Math.min(index + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setError("");
    setSelectedOptionId(null);
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);

  return {
    session,
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
    isFirst: currentIndex === 0,
    isLast: total > 0 && currentIndex === total - 1,
  };
}
