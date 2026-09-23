"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startPractice } from "@/shared/api";
import { useCurrentUser } from "@/entities/user";
import { saveAttempt } from "@/entities/session";

/**
 * Создаёт попытку на backend и переходит к прохождению.
 * Возвращает { start, isPending, error } для отображения статуса в UI.
 */
export function useStartPracticeSession() {
  const router = useRouter();
  const { user } = useCurrentUser();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const start = async ({ topicIds, questionsCount, difficulties, answerStatus, isRepetition }) => {
    if (!user?.id) {
      router.push("/auth");
      return;
    }

    setError(null);
    setIsPending(true);

    try {
      // startPractice теперь возвращает { attemptId, questions: [...] }
      const session = await startPractice({
        userId: user.id,
        topicIds,
        questionsCount,
        difficulties,
        answerStatus,
        isRepetition,
      });

      // Сохраняем полную сессию вместе с вопросами
      saveAttempt(session);
      router.push("/practice/question");
    } catch (err) {
      setError(err?.message ?? "Не удалось создать сессию. Попробуйте снова.");
    } finally {
      setIsPending(false);
    }
  };

  return { start, isPending, error };
}
