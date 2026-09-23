"use client";

import { useEffect, useState } from "react";
import { getSubjectsOverview } from "@/shared/api";

/**
 * Каталог предметов с темами (`GET /api/subjects/overview`).
 * В development данные приходят из mockApiService, в production — с backend.
 */
export function useSubjectsOverview() {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    getSubjectsOverview()
      .then((data) => {
        if (isActive) {
          setSubjects(data ?? []);
          setError(null);
        }
      })
      .catch((err) => {
        if (isActive) setError(err);
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return { subjects, isLoading, error };
}
