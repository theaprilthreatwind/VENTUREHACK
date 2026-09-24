"use client";

import { useEffect, useState } from "react";
import { getSubjectsOverview } from "@/shared/api";

/**
 * Каталог предметов с темами (`GET /api/subjects/overview`).
 * Данные приходят с backend через `@/shared/api`.
 * Запрос отменяется при размонтировании (`AbortController`).
 */
export function useSubjectsOverview() {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    getSubjectsOverview({ signal: controller.signal })
      .then((data) => {
        if (controller.signal.aborted) return;
        setSubjects(data ?? []);
        setError(null);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { subjects, isLoading, error };
}
