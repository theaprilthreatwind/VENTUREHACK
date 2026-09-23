"use client";

import { useRouter } from "next/navigation";
import { startPractice } from "@/shared/api";
import { useCurrentUser } from "@/entities/user";
import { saveSession } from "@/entities/session";

/**
 * Создаёт попытку на backend (`POST /api/practice-page/start`) и переходит
 * к прохождению. Без авторизованного пользователя отправляет на /auth.
 */
export function useStartPracticeSession() {
  const router = useRouter();
  const { user } = useCurrentUser();

  return async ({ topicIds, questionsCount, difficulties, answerStatus, isRepetition }) => {
    if (!user?.id) {
      router.push("/auth");
      return;
    }

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
  };
}
