"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { startPractice } from "@/shared/api";
import { resolveText } from "@/shared/i18n";
import { useCurrentUser } from "@/entities/user";
import { saveSession } from "@/entities/session";

/**
 * Создаёт попытку на backend (`POST /api/practice-page/start`) и переходит
 * к прохождению. Без авторизованного пользователя отправляет на /auth.
 * Ошибки запроса не всплывают наружу — показываются через `error`,
 * чтобы пользователь видел понятное русское сообщение.
 */
export function useStartPracticeSession() {
  const router = useRouter();
  const { user } = useCurrentUser();
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState("");

  const start = async ({ topicIds, questionsCount, difficulties, answerStatus, isRepetition }) => {
    if (!user?.id) {
      router.push("/auth");
      return;
    }

    setPending(true);
    setError("");
    try {
      const { attemptId, questions } = await startPractice({
        userId: user.id,
        topicIds,
        questionsCount,
        difficulties,
        answerStatus,
        isRepetition,
      });

      saveSession({ attemptId, questions });
      router.push("/practice/question");
    } catch (cause) {
      setError(cause?.message ?? resolveText("errors.startSession"));
    } finally {
      setPending(false);
    }
  };

  return { start, isPending, error };
}
