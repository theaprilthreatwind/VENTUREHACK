const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isEmail = (value) => EMAIL_RE.test(value);

/**
 * Валидация возвращает КЛЮЧИ словаря i18n (а не готовый текст),
 * чтобы сообщения отображались на текущем языке интерфейса.
 */
export function validateLogin(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = "validation.emailRequired";
  } else if (!isEmail(values.email.trim())) {
    errors.email = "validation.emailInvalid";
  }

  if (!values.password) {
    errors.password = "validation.passwordRequired";
  } else if (values.password.length < 6) {
    errors.password = "validation.passwordMin";
  }

  return errors;
}

export function validateSignup(values) {
  const errors = {};

  if (values.username.trim().length < 2) {
    errors.username = "validation.usernameMin";
  }

  if (!values.email.trim()) {
    errors.email = "validation.emailRequired";
  } else if (!isEmail(values.email.trim())) {
    errors.email = "validation.emailInvalid";
  }

  if (!values.password) {
    errors.password = "validation.passwordRequired";
  } else if (values.password.length < 6) {
    errors.password = "validation.passwordMin";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "validation.confirmRequired";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "validation.confirmMismatch";
  }

  return errors;
}