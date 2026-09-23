"use client";

import { useEffect, useState } from "react";
import { getUserByToken } from "@/shared/api";
import { useLocalStorage } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";

/**
 * Текущий пользователь, полученный по токену (`GET /api/users/token`).
 * Пока токена нет — возвращает `user: null`.
 */
export function useCurrentUser() {
  const token = useLocalStorage(STORAGE_KEYS.token, "");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    let isActive = true;
    getUserByToken(token)
      .then((data) => {
        if (isActive) {
          setUser(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isActive) {
          setUser(null);
          setError(err);
        }
      });

    return () => {
      isActive = false;
    };
  }, [token]);

  return { user: token ? user : null, error: token ? error : null };
}
