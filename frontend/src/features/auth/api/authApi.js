import { loginUser, registerUser } from "@/shared/api";
import { STORAGE_KEYS } from "@/shared/config";

function persistAuth(user) {
  localStorage.setItem(STORAGE_KEYS.token, user.token);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
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
