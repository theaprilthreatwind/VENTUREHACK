import { STORAGE_KEYS } from "@/shared/config";

export function simulateRequest() {
  return new Promise((resolve) => setTimeout(resolve, 1400));
}

export function persistSession(userData) {
  const token = `entuz_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem(STORAGE_KEYS.token, token);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
  document.cookie = `${STORAGE_KEYS.token}=${token}; path=/; max-age=2592000; SameSite=Lax`;
  return token;
}
