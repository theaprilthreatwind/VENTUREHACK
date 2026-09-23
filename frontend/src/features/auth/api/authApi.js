import { loginUser, registerUser } from "@/shared/api";
import { storageSet, storageSetRaw } from "@/shared/lib/storage";
import { STORAGE_KEYS } from "@/shared/config";

/**
 * Сохраняет данные авторизованного пользователя в localStorage и cookie.
 *
 * ВАЖНО: токен хранится как plain string (без JSON-сериализации),
 * чтобы useLocalStorage мог читать его напрямую через getItem().
 * Объект пользователя хранится как JSON через storageSet.
 *
 * @param {{ id: number, username: string, email: string, token: string }} user
 */
function persistAuth(user) {
  storageSetRaw(STORAGE_KEYS.token, user.token); // plain string, без JSON.stringify
  storageSet(STORAGE_KEYS.user, user);            // JSON-объект
  document.cookie = `${STORAGE_KEYS.token}=${user.token}; path=/; max-age=2592000; SameSite=Lax`;
}

export async function login({ email, password }) {
  const user = await loginUser({ email: email.trim(), password });
  persistAuth(user);
  return user;
}

export async function register({ username, email, password }) {
  const user = await registerUser({
    username: username.trim(),
    email: email.trim(),
    password,
  });
  persistAuth(user);
  return user;
}
