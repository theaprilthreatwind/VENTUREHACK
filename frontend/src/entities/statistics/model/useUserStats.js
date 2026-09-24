"use client";

import { useCallback, useEffect, useState } from "react";

import { getDashboardStats } from "@/shared/api";
import { resolveText } from "@/shared/i18n";

/**
 * Общая статистика пользователя (`GET /api/dashboard/{userId}/stats`).
 * Backend отдаёт `UserStatsDto` с агрегатами по всем сессиям.
 *
 * Без `userId` (гость) запрос не выполняется, а наружу отдаётся пустое
 * состояние — без setState в теле эффекта.
 *
 * @param {number|string|null|undefined} userId
 * @returns {{
 *   stats: import("@/shared/api").UserStats | null,
 *   isLoading: boolean,
 *   error: string,
 *   reload: () => void,
 * }}
 */
export function useUserStats(userId) {
  const [stats, setStats] = useState(null);
  const [isLoading, setLoading] = useState(Boolean(userId));
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!userId) return undefined;

    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await getDashboardStats(userId, { signal: controller.signal });
        setStats(data ?? null);
      } catch (requestError) {
        if (controller.signal.aborted) return;
        setStats(null);
        setError(requestError?.message ?? resolveText("errors.loadStats"));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [userId, reloadKey]);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  const isEnabled = Boolean(userId);

  return {
    stats: isEnabled ? stats : null,
    // `!stats && !error` — ещё ни разу не загрузились (в т.ч. пока userId
    // восстанавливается из localStorage после гидрации): не мигаем нулями.
    isLoading: isEnabled ? isLoading || (!stats && !error) : false,
    error: isEnabled ? error : "",
    reload,
  };
}
