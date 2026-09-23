"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Field, TextInput } from "@/shared/ui";
import { useLang } from "@/shared/i18n";
import { validateLogin } from "../model/validation";
import { PrimaryButton } from "./PrimaryButton";

export function LoginForm({ isLoading, onSubmit }) {
  const { t } = useLang();
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
        {t("auth.loginTitle")}
      </h1>
      <p className="mt-1.5 text-sm text-slate-500">{t("auth.loginSubtitle")}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <Field
          id="login-email"
          label="Email"
          error={errors.email ? t(errors.email) : undefined}
        >
          <TextInput
            id="login-email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="name@example.kz"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email ? t(errors.email) : undefined}
            autoComplete="username"
          />
        </Field>

        <Field
          id="login-password"
          label={t("auth.password")}
          error={errors.password ? t(errors.password) : undefined}
        >
          <TextInput
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            placeholder={t("auth.passwordPlaceholder")}
            leftIcon={<Lock className="h-4 w-4" />}
            error={errors.password ? t(errors.password) : undefined}
            autoComplete="current-password"
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label={
                  showPassword ? t("auth.hidePassword") : t("auth.showPassword")
                }
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
        </Field>

        <PrimaryButton isLoading={isLoading}>
          {isLoading ? t("auth.loginPending") : t("auth.loginBtn")}
        </PrimaryButton>
      </form>
    </>
  );
}