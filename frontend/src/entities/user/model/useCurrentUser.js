"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { getUserByToken } from "@/shared/api";
import { useLocalStorage } from "@/shared/lib";
import { storageRemove, storageSet } from "@/shared/lib/storage";
import { STORAGE_KEYS } from "@/shared/config";

/**
 * @typedef {Object} AuthUser
 * @property {number} id
 * @property {string} username
 * @property {string} email
 * @property {string} token
 */

/** Подписка на изменения кеша пользователя и токена в localStorage. */
function subscribeUser(onStoreChange) {
  const handle = () => onStoreChange();
  window.addEventListener("storage", handle);
  window.addEventListener(`${STORAGE_KEYS.user}:change`, handle);
  window.addEventListener(`${STORAGE_KEYS.token}:change`, handle);
  return () => {
    window.removeEventListener("storage", handle);
    window.removeEventListener(`${STORAGE_KEYS.user}:change`, handle);
    window.removeEventListener(`${STORAGE_KEYS.token}:change`, handle);
  };
}

/**
 * Возвращает текущего пользователя.
 *
 * Логика при F5 / перезагрузке:
 * ─────────────────────────────────────────────────────────────────
 * 1. token читается через useLocalStorage (реактивно, plain string).
 *    cachedUser — через useSyncExternalStore: кеш entuz_user читается
 *    реактивно, при logout/401/403 обнуляется сам, без setState в effect. ✅
 *
 * 2. useEffect смотрит на token:
 *     - нет токена → гость; пользователь выводится как null по деривации. ✅
 *     - есть токен И кеш есть → НЕ делаем запрос. ✅
 *     - есть токен, но кеш пуст → запрос для восстановления. ✅
 *
 * 3. При 401/403 → полная очистка (logout).
 * ─────────────────────────────────────────────────────────────────
 *
 * @returns {{ user: AuthUser | null, error: Error | null, logout: () => void }}
 */
export function useCurrentUser() {
  // Читаем token как plain string (он хранится через storageSetRaw, без JSON)
  const token = useLocalStorage(STORAGE_KEYS.token, "");

  // Реактивный кеш пользователя из localStorage.
  // Подписываемся на РАВ-строку (примитив — снимок стабилен и кешируется
  // через Object.is), а JSON-объект достаём useMemo. Иначе getSnapshot
  // каждый раз возвращал бы новый объект (JSON.parse) → бесконечный ререндер.
  const rawUser = useSyncExternalStore(
    subscribeUser,
    () => window.localStorage.getItem(STORAGE_KEYS.user),
    () => null
  );

  const cachedUser = useMemo(() => {
    if (!rawUser) return null;
    try {
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  }, [rawUser]);

  const [error, setError] = useState(null);

  const abortRef = useRef(/** @type {AbortController | null} */ (null));

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
    setError(null);
  }

  useEffect(() => {
    // ── Кейс Б: токен есть И кеш присутствует → пропускаем запрос ──
    // Кеш уже реактивно прочитан в cachedUser выше, запрос сети не нужен.
    if (!token || cachedUser) return;

    // ── Кейс В: токен есть, но кеш пуст → восстанавливаем пользователя ──
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    getUserByToken(token, { signal: controller.signal })
      .then((freshUser) => {
        if (controller.signal.aborted) return;
        storageSet(STORAGE_KEYS.user, freshUser);
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
    // token и cachedUser меняются только при реальном логине/логауте/401 —
    // зависимость корректна.
  }, [token, cachedUser]);

  // Если нет токена — пользователь точно не авторизован;
  // иначе берём реактивный кеш. Очистка стоража после logout обновляет оба.
  return {
    user: token ? cachedUser : null,
    error: token ? error : null,
    logout: clearAuth,
  };
}