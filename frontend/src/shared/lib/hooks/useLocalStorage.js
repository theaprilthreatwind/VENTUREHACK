"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribe(key, callback) {
  const onStorage = (event) => {
    if (event.key === null || event.key === key) callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(`${key}:change`, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(`${key}:change`, callback);
  };
}

export function useLocalStorage(key, defaultValue) {
  const handleStoreChange = useCallback((callback) => subscribe(key, callback), [key]);
  const getSnapshot = useCallback(() => {
    const value = window.localStorage.getItem(key);
    return value ?? defaultValue;
  }, [key, defaultValue]);
  const getServerSnapshot = () => defaultValue;

  return useSyncExternalStore(handleStoreChange, getSnapshot, getServerSnapshot);
}

export function setLocalStorageItem(key, value) {
  window.localStorage.setItem(key, value);
  window.dispatchEvent(new Event(`${key}:change`));
}