"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
  Users,
  Zap,
} from "lucide-react";

const CLASS_OPTIONS = ["10 класс", "11 класс", "Выпускник колледжа"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const isEmail = (value) => EMAIL_RE.test(value);

const digitsOnly = (value) => value.replace(/\D/g, "");

const formatKzPhone = (digits) => {
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

function simulateRequest() {
  return new Promise((resolve) => setTimeout(resolve, 1400));
}

function persistSession(userData) {
  const token = `entuz_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem("entuz_token", token);
  localStorage.setItem("entuz_user", JSON.stringify(userData));
  document.cookie = `entuz_token=${token}; path=/; max-age=2592000; SameSite=Lax`;
  return token;
}

function GoogleIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

function Field({ id, label, children, error }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl border bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

function TextInput({ id, type = "text", value, onChange, placeholder, error, leftIcon, rightSlot, ...rest }) {
  return (
    <div className="relative">
      {leftIcon && (
        <span
          className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 ${
            error ? "text-red-400" : "text-slate-400"
          }`}
        >
          {leftIcon}
        </span>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={`${inputBase} ${error ? "border-red-300" : "border-slate-200"}`}
        {...rest}
      />
      {rightSlot && <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>}
    </div>
  );
}

function Select({ id, value, onChange, error, options = [] }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
        <GraduationCap className="h-4 w-4" />
      </span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`${inputBase} appearance-none pr-10 ${
          value ? "text-slate-900" : "text-slate-400"
        } ${error ? "border-red-300" : "border-slate-200"}`}
      >
        <option value="" disabled>
          Выберите класс или статус
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-slate-900">
            {option}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

function PrimaryButton({ children, isLoading, disabled, type = "submit", onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
  );
}

function GoogleButton({ isLoading, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
      ) : (
        <GoogleIcon />
      )}
      Войти через Google
    </button>
  );
}

function BrandBanner() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="relative flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
          <Zap className="h-6 w-6 text-sky-300" />
        </span>
        <div>
          <p className="text-lg font-extrabold tracking-tight">ENTUZ /KZ</p>
          <p className="text-xs font-medium text-blue-100/70">Первая цифровая школа ЕНТ</p>
        </div>
      </div>

      <div className="relative max-w-xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-sky-200 ring-1 ring-white/15">
          <Sparkles className="h-3.5 w-3.5" />
          69 000+ часов практики уже пройдено
        </span>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.15] tracking-tight xl:text-5xl">
          Твой путь к{" "}
          <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
            140 баллам
          </span>{" "}
          на ЕНТ
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-blue-100/80">
          Присоединяйся к абитуриентам Казахстана: решай реальные задания, следи за
          прогрессом и поступай в вуз мечты.
        </p>

        <div className="mt-8 max-w-md rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-500 text-sm font-bold">
              А
            </span>
            <div>
              <p className="text-sm leading-relaxed text-white/90">
                «С 78 баллов на пробнике выросла до 132 за четыре месяца подготовки.
                Теперь ЕНТ — не страшно»
              </p>
              <p className="mt-2 text-xs font-semibold text-sky-200">
                Айгерим, 11 класс • Алматы
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
          <TrendingUp className="h-5 w-5 text-sky-300" />
          <p className="mt-3 text-2xl font-extrabold">94%</p>
          <p className="mt-1 text-xs text-blue-100/70">сдают на 100+ баллов</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
          <Users className="h-5 w-5 text-sky-300" />
          <p className="mt-3 text-2xl font-extrabold">26 000+</p>
          <p className="mt-1 text-xs text-blue-100/70">абитуриентов в проекте</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
          <ShieldCheck className="h-5 w-5 text-sky-300" />
          <p className="mt-3 text-2xl font-extrabold">7 000+</p>
          <p className="mt-1 text-xs text-blue-100/70">вопросов ЕНТ в базе</p>
        </div>
      </div>
    </div>
  );
}

function AuthTabs({ mode, onChange }) {
  const tabs = [
    { key: "login", label: "Войти" },
    { key: "register", label: "Регистрация" },
  ];
  return (
    <div role="tablist" className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
      {tabs.map((tab) => {
        const active = mode === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.key)}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
              active
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState("login");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [login, setLogin] = useState({ identifier: "", password: "", remember: true });
  const [signup, setSignup] = useState({
    fullName: "",
    email: "",
    phone: "",
    grade: "",
    password: "",
    confirmPassword: "",
  });

  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});

  const [isLoading, setLoading] = useState(false);
  const [isGoogleLoading, setGoogleLoading] = useState(false);

  const switchMode = (next) => {
    setMode(next);
    setLoginErrors({});
    setSignupErrors({});
  };

  const validateLogin = (values) => {
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
  };

  const validateSignup = (values) => {
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
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = validateLogin(login);
    setLoginErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    await simulateRequest();
    persistSession({
      method: "credentials",
      identifier: login.identifier.trim(),
      remember: login.remember,
    });
    router.push("/dashboard");
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSignup(signup);
    setSignupErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    await simulateRequest();
    persistSession({
      method: "signup",
      name: signup.fullName.trim(),
      email: signup.email.trim(),
      phone: `+7 ${formatKzPhone(signup.phone)}`,
      grade: signup.grade,
    });
    router.push("/dashboard");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await simulateRequest();
    persistSession({ method: "google", name: "Абитуриент" });
    router.push("/dashboard");
  };

  const handlePhoneChange = (value) => {
    let digits = digitsOnly(value);
    if (digits.startsWith("7")) digits = digits.slice(1);
    setSignup((prev) => ({ ...prev, phone: digits.slice(0, 10) }));
  };

  return (
    <div className="grid min-h-screen bg-app-bg lg:grid-cols-2">
      <BrandBanner />

      <main className="flex flex-col justify-center px-5 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
              <Zap className="h-5 w-5 text-sky-300" />
            </span>
            <p className="text-xl font-extrabold tracking-tight text-slate-900">ENTUZ /KZ</p>
          </div>

          <AuthTabs mode={mode} onChange={switchMode} />

          <div className="mt-8">
            {mode === "login" ? (
              <>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  С возвращением!
                </h1>
                <p className="mt-1.5 text-sm text-slate-500">
                  Войдите в аккаунт, чтобы продолжить подготовку к ЕНТ
                </p>

                <form onSubmit={handleLoginSubmit} noValidate className="mt-6 space-y-5">
                  <Field id="login-identifier" label="Email или телефон" error={loginErrors.identifier}>
                    <TextInput
                      id="login-identifier"
                      type="text"
                      value={login.identifier}
                      onChange={(value) =>
                        setLogin((prev) => ({ ...prev, identifier: value }))
                      }
                      placeholder="name@example.kz или +7 705 000 00 00"
                      leftIcon={<Mail className="h-4 w-4" />}
                      error={loginErrors.identifier}
                      autoComplete="username"
                    />
                  </Field>

                  <Field id="login-password" label="Пароль" error={loginErrors.password}>
                    <TextInput
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      value={login.password}
                      onChange={(value) => setLogin((prev) => ({ ...prev, password: value }))}
                      placeholder="Введите пароль"
                      leftIcon={<Lock className="h-4 w-4" />}
                      error={loginErrors.password}
                      autoComplete="current-password"
                      rightSlot={
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword((prev) => !prev)}
                          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                          aria-label={showLoginPassword ? "Скрыть пароль" : "Показать пароль"}
                        >
                          {showLoginPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      }
                    />
                  </Field>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex cursor-pointer select-none items-center gap-2 text-slate-600">
                      <input
                        type="checkbox"
                        checked={login.remember}
                        onChange={(e) =>
                          setLogin((prev) => ({ ...prev, remember: e.target.checked }))
                        }
                        className="h-4 w-4 rounded accent-blue-600"
                      />
                      Запомнить меня
                    </label>
                    <button
                      type="button"
                      className="font-semibold text-blue-700 transition-colors hover:text-blue-800"
                    >
                      Забыли пароль?
                    </button>
                  </div>

                  <PrimaryButton isLoading={isLoading}>
                    {isLoading ? "Входим..." : "Войти"}
                  </PrimaryButton>
                </form>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Создайте аккаунт
                </h1>
                <p className="mt-1.5 text-sm text-slate-500">
                  Начните подготовку к ЕНТ бесплатно — 2 минуты и вы в деле
                </p>

                <form onSubmit={handleSignupSubmit} noValidate className="mt-6 space-y-5">
                  <Field id="fullname" label="Полное имя" error={signupErrors.fullName}>
                    <TextInput
                      id="fullname"
                      type="text"
                      value={signup.fullName}
                      onChange={(value) => setSignup((prev) => ({ ...prev, fullName: value }))}
                      placeholder="Например, Бейбарыс"
                      leftIcon={<User className="h-4 w-4" />}
                      error={signupErrors.fullName}
                      autoComplete="name"
                    />
                  </Field>

                  <Field id="email" label="Email" error={signupErrors.email}>
                    <TextInput
                      id="email"
                      type="email"
                      value={signup.email}
                      onChange={(value) => setSignup((prev) => ({ ...prev, email: value }))}
                      placeholder="name@example.kz"
                      leftIcon={<Mail className="h-4 w-4" />}
                      error={signupErrors.email}
                      autoComplete="email"
                    />
                  </Field>

                  <Field id="phone" label="Телефон" error={signupErrors.phone}>
                    <TextInput
                      id="phone"
                      type="tel"
                      value={signup.phone ? `+7 ${formatKzPhone(signup.phone)}` : "+7 "}
                      onChange={handlePhoneChange}
                      placeholder="+7 (7XX) XXX-XX-XX"
                      leftIcon={<Phone className="h-4 w-4" />}
                      error={signupErrors.phone}
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </Field>

                  <Field id="grade" label="Класс / Статус" error={signupErrors.grade}>
                    <Select
                      id="grade"
                      value={signup.grade}
                      onChange={(value) => setSignup((prev) => ({ ...prev, grade: value }))}
                      error={signupErrors.grade}
                      options={CLASS_OPTIONS}
                    />
                  </Field>

                  <Field id="signup-password" label="Пароль" error={signupErrors.password}>
                    <TextInput
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={signup.password}
                      onChange={(value) => setSignup((prev) => ({ ...prev, password: value }))}
                      placeholder="Минимум 6 символов"
                      leftIcon={<Lock className="h-4 w-4" />}
                      error={signupErrors.password}
                      autoComplete="new-password"
                      rightSlot={
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                          aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      }
                    />
                  </Field>

                  <Field id="confirm-password" label="Повторите пароль" error={signupErrors.confirmPassword}>
                    <TextInput
                      id="confirm-password"
                      type={showConfirm ? "text" : "password"}
                      value={signup.confirmPassword}
                      onChange={(value) => setSignup((prev) => ({ ...prev, confirmPassword: value }))}
                      placeholder="Введите пароль ещё раз"
                      leftIcon={<CheckCircle2 className="h-4 w-4" />}
                      error={signupErrors.confirmPassword}
                      autoComplete="new-password"
                      rightSlot={
                        <button
                          type="button"
                          onClick={() => setShowConfirm((prev) => !prev)}
                          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                          aria-label={showConfirm ? "Скрыть пароль" : "Показать пароль"}
                        >
                          {showConfirm ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      }
                    />
                  </Field>

                  <PrimaryButton isLoading={isLoading}>
                    {isLoading ? (
                      "Создаём..."
                    ) : (
                      <>
                        Зарегистрироваться
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </PrimaryButton>
                </form>
              </>
            )}

            <div className="mt-6">
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium text-slate-400">или продолжить через</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="mt-5">
                <GoogleButton isLoading={isGoogleLoading} onClick={handleGoogle} />
              </div>
            </div>

            <p className="mt-8 text-center text-xs leading-relaxed text-slate-400">
              Продолжая, вы соглашаетесь с{" "}
              <a href="/terms" className="text-slate-500 underline-offset-2 hover:underline">
                условиями использования
              </a>{" "}
              и{" "}
              <a href="/privacy" className="text-slate-500 underline-offset-2 hover:underline">
                политикой конфиденциальности
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}