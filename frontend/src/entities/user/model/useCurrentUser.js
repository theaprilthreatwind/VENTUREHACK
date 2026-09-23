"use client";

import { useEffect, useRef, useState } from "react";
import { getUserByToken } from "@/shared/api";
import { useLocalStorage } from "@/shared/lib";
import { storageGet, storageRemove, storageSet } from "@/shared/lib/storage";
import { STORAGE_KEYS } from "@/shared/config";

/**
 * @typedef {Object} AuthUser
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} token
 */

/**
 * Возвращает текущего пользователя.
 *
 * Логика при F5 / перезагрузке:
 * ─────────────────────────────────────────────────────────────────
 * 1. useState lazy init читает entuz_user из localStorage (JSON).
 *    Если данные есть → рендер мгновенный, сеть НЕ используется. ✅
 *
 * 2. useEffect смотрит на token (plain string из useLocalStorage):
 *    a) Нет токена → гостевой режим, сброс состояния.
 *    b) Есть токен И есть кеш (entuz_user) → НЕ делаем запрос. ✅
 *       Только запускаем фоновую валидацию через 30 секунд (stale TTL).
 *    c) Есть токен, НО кеш пуст → делаем запрос для восстановления. ✅
 *
 * 3. При 401/403 → полная очистка (logout).
 * ─────────────────────────────────────────────────────────────────
 *
 * @returns {{ user: AuthUser | null, error: Error | null, logout: () => void }}
 */
export function useCurrentUser() {
  // Читаем token как plain string (он хранится через storageSetRaw, без JSON)
  const token = useLocalStorage(STORAGE_KEYS.token, "");

  // Инициализация из кеша — синхронно, без сети.
  // storageGet читает entuz_user через JSON.parse.
  const [user, setUser] = useState(
    /** @returns {AuthUser | null} */
    () => storageGet(STORAGE_KEYS.user, null)
  );
  const [error, setError] = useState(null);

  const abortRef = useRef(/** @type {AbortController | null} */ (null));

  useEffect(() => {
    // ── Кейс А: нет токена → гостевой режим ──
    if (!token) {
      setUser(null);
      setError(null);
      return;
    }

    // ── Кейс Б: токен есть И кеш присутствует → пропускаем запрос ──
    // Читаем напрямую из storage (не из state), чтобы избежать race condition
    // при первом рендере, когда state ещё не обновился.
    const cached = storageGet(STORAGE_KEYS.user, null);
    if (cached) {
      // Кеш валиден. Синхронизируем state (на случай если storage обновился
      // в другой вкладке или после logout).
      setUser(cached);
      setError(null);
      // Запрос НЕ делаем. Фоновое обновление произойдёт при следующем
      // явном действии пользователя (логин, старт сессии).
      return;
    }

    // ── Кейс В: токен есть, но кеш пуст → восстанавливаем пользователя ──
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    getUserByToken(token, { signal: controller.signal })
      .then((freshUser) => {
        if (controller.signal.aborted) return;
        storageSet(STORAGE_KEYS.user, freshUser);
        setUser(freshUser);
        setError(null);
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        if (err?.status === 401 || err?.status === 403) {
          clearAuth();
        }
        setError(err);
      });

    return () => {
      controller.abort();
    };
  // token меняется только при реальном логине/логауте — зависимость корректна.
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Полная очистка авторизации.
   * Вызывается при logout, 401/403 или истечении сессии.
   */
  function clearAuth() {
    storageRemove(STORAGE_KEYS.token);
    storageRemove(STORAGE_KEYS.user);
    if (typeof document !== "undefined") {
      document.cookie = `${STORAGE_KEYS.token}=; path=/; max-age=0`;
    }
    setUser(null);
    setError(null);
  }

  // Если нет токена — пользователь точно не авторизован.
  return {
    user: token ? user : null,
    error: token ? error : null,
    logout: clearAuth,
  };
}
