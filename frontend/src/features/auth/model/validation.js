const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isEmail = (value) => EMAIL_RE.test(value);

export function validateLogin(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = "Введите email";
  } else if (!isEmail(values.email.trim())) {
    errors.email = "Введите корректный email";
  }

  if (!values.password) {
    errors.password = "Введите пароль";
  } else if (values.password.length < 6) {
    errors.password = "Пароль должен содержать не менее 6 символов";
  }

  return errors;
}

export function validateSignup(values) {
  const errors = {};

  if (values.username.trim().length < 2) {
    errors.username = "Введите имя (минимум 2 символа)";
  }

  if (!values.email.trim()) {
    errors.email = "Введите email";
  } else if (!isEmail(values.email.trim())) {
    errors.email = "Введите корректный email";
  }

  if (!values.password) {
    errors.password = "Введите пароль";
  } else if (values.password.length < 6) {
    errors.password = "Пароль должен содержать не менее 6 символов";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Повторите пароль";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Пароли не совпадают";
  }

  return errors;
}
