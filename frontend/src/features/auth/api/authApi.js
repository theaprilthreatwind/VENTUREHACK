import { loginUser, registerUser } from "@/shared/api";
import { storageSet, storageSetRaw } from "@/shared/lib/storage";
import { STORAGE_KEYS } from "@/shared/config";

/**
 * Сохраняет данные авторизованного пользователя.
 *
 * Токен хранится отдельно как plain string (без JSON-сериализации, чтобы
 * `useLocalStorage` читал его напрямую и `apiService` подставлял в
 * `Authorization: Bearer`). В объекте пользователя токена НЕТ: он лежит
 * в localStorage в одном месте и не дублируется.
 *
 * Cookie не выставляем: прокси не пробрасывает cookie на backend, а
 * JS-cookie без HttpOnly только расширяет поверхность атаки при XSS.
 *
 * @param {{ id: number, username: string, email: string, token: string }} user
 */
function persistAuth(user) {
  const { id, username, email, token } = user ?? {};
  storageSetRaw(STORAGE_KEYS.token, token); // plain string, без JSON.stringify
  storageSet(STORAGE_KEYS.user, { id, username, email });
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
