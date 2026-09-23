"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Field, TextInput } from "@/shared/ui";
import { validateSignup } from "../model/validation";
import { PrimaryButton } from "./PrimaryButton";

export function SignupForm({ isLoading, onSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = { username, email, password, confirmPassword };
    const nextErrors = validateSignup(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    await onSubmit(values);
  };

  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
        Создайте аккаунт
      </h1>
      <p className="mt-1.5 text-sm text-slate-500">
        Начните подготовку к ЕНТ бесплатно — 2 минуты и вы в деле
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <Field id="username" label="Имя пользователя" error={errors.username}>
          <TextInput
            id="username"
            type="text"
            value={username}
            onChange={setUsername}
            placeholder="Например, alex_dev"
            leftIcon={<User className="h-4 w-4" />}
            error={errors.username}
            autoComplete="username"
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <TextInput
            id="email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="name@example.kz"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email}
            autoComplete="email"
          />
        </Field>

        <Field id="signup-password" label="Пароль" error={errors.password}>
          <TextInput
            id="signup-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            placeholder="Минимум 6 символов"
            leftIcon={<Lock className="h-4 w-4" />}
            error={errors.password}
            autoComplete="new-password"
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
        </Field>

        <Field id="confirm-password" label="Повторите пароль" error={errors.confirmPassword}>
          <TextInput
            id="confirm-password"
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Введите пароль ещё раз"
            leftIcon={<CheckCircle2 className="h-4 w-4" />}
            error={errors.confirmPassword}
            autoComplete="new-password"
            rightSlot={
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label={showConfirm ? "Скрыть пароль" : "Показать пароль"}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
  );
}
