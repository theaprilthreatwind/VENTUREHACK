const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isEmail = (value) => EMAIL_RE.test(value);

export const digitsOnly = (value) => value.replace(/\D/g, "");

export const formatKzPhone = (digits) => {
  const d = digitsOnly(digits ?? "").slice(0, 10);
  if (!d) return "";
  const area = d.slice(0, 3);
  const rest = d.slice(3);
  if (rest.length > 6) {
    return `(${area}) ${rest.slice(0, 3)}-${rest.slice(3, 5)}-${rest.slice(5)}`;
  }
  if (rest.length > 3) {
    return `(${area}) ${rest.slice(0, 3)}-${rest.slice(3)}`;
  }
  return `(${area}`;
};

export function validateLogin(values) {
  const errors = {};
  const identifier = values.identifier.trim();

  if (!identifier) {
    errors.identifier = "Введите email или номер телефона";
  } else if (identifier.includes("@")) {
    if (!isEmail(identifier)) {
      errors.identifier = "Введите корректный email";
    }
  } else if (digitsOnly(identifier).length < 10) {
    errors.identifier = "Введите корректный номер телефона";
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

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Введите имя (минимум 2 символа)";
  }

  if (!values.email.trim()) {
    errors.email = "Введите email";
  } else if (!isEmail(values.email.trim())) {
    errors.email = "Введите корректный email";
  }

  if (digitsOnly(values.phone).length < 10) {
    errors.phone = "Введите корректный номер телефона";
  }

  if (!values.grade) {
    errors.grade = "Выберите класс или статус";
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
