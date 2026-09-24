"use client";

import { useMemo } from "react";

import { useSubjectsOverview } from "@/entities/subject";
import { useUserStats } from "@/entities/statistics";
import { useCurrentUser } from "@/entities/user";
import { parseLastResult } from "@/entities/session";
import { STORAGE_KEYS } from "@/shared/config";
import { useLocalStorage } from "@/shared/lib";
import { buildCoverage } from "./analytics.mjs";

/**
 * Собирает данные страницы аналитики из доступных эндпоинтов:
 * - `GET /api/dashboard/{userId}/stats` — общие KPI;
 * - `GET /api/subjects/overview` — знаменатель для покрытия банка заданий;
 * - localStorage — итог последней сессии.
 *
 * @returns {{
 *   user: { id: number, username: string, email: string } | null,
 *   stats: import("@/shared/api").UserStats | null,
 *   lastResult: import("@/entities/session").StoredResult | null,
 *   coverage: { solved: number, total: number, percent: number },
 *   isLoading: boolean,
 *   error: string,
 *   reload: () => void,
 * }}
 */
export function useAnalyticsOverview() {
  const { user } = useCurrentUser();
  const {
    stats,
    isLoading: isStatsLoading,
    error: statsError,
    reload,
  } = useUserStats(user?.id);
  const {
    subjects,
    isLoading: isSubjectsLoading,
    error: subjectsError,
  } = useSubjectsOverview();

  const rawResult = useLocalStorage(STORAGE_KEYS.result, "null");
  const lastResult = useMemo(() => parseLastResult(rawResult), [rawResult]);
  const coverage = useMemo(() => buildCoverage(stats, subjects), [stats, subjects]);

  return {
    user,
    stats,
    lastResult,
    coverage,
    isLoading: isStatsLoading || isSubjectsLoading,
    error: statsError || subjectsError?.message || "",
    reload,
  };
}
