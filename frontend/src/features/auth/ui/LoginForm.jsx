"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Field, TextInput } from "@/shared/ui";
import { validateLogin } from "../model/validation";
import { PrimaryButton } from "./PrimaryButton";

export function LoginForm({ isLoading, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = { email, password };
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    await onSubmit(values);
  };

  return (
    <>
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
        С возвращением!
      </h1>
      <p className="mt-1.5 text-sm text-slate-500">
        Войдите в аккаунт, чтобы продолжить подготовку к ЕНТ
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <Field id="login-email" label="Email" error={errors.email}>
          <TextInput
            id="login-email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="name@example.kz"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email}
            autoComplete="username"
          />
        </Field>

        <Field id="login-password" label="Пароль" error={errors.password}>
          <TextInput
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            placeholder="Введите пароль"
            leftIcon={<Lock className="h-4 w-4" />}
            error={errors.password}
            autoComplete="current-password"
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

        <PrimaryButton isLoading={isLoading}>
          {isLoading ? "Входим..." : "Войти"}
        </PrimaryButton>
      </form>
    </>
  );
}
