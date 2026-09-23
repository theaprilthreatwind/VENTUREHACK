"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Field, TextInput } from "@/shared/ui";
import { useLang } from "@/shared/i18n";
import { validateSignup } from "../model/validation";
import { PrimaryButton } from "./PrimaryButton";

export function SignupForm({ isLoading, onSubmit }) {
  const { t } = useLang();
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
        {t("auth.signupTitle")}
      </h1>
      <p className="mt-1.5 text-sm text-slate-500">{t("auth.signupSubtitle")}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <Field
          id="username"
          label={t("auth.usernameLabel")}
          error={errors.username ? t(errors.username) : undefined}
        >
          <TextInput
            id="username"
            type="text"
            value={username}
            onChange={setUsername}
            placeholder={t("auth.usernamePlaceholder")}
            leftIcon={<User className="h-4 w-4" />}
            error={errors.username ? t(errors.username) : undefined}
            autoComplete="username"
          />
        </Field>

        <Field
          id="email"
          label="Email"
          error={errors.email ? t(errors.email) : undefined}
        >
          <TextInput
            id="email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="name@example.kz"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email ? t(errors.email) : undefined}
            autoComplete="email"
          />
        </Field>

        <Field
          id="signup-password"
          label={t("auth.password")}
          error={errors.password ? t(errors.password) : undefined}
        >
          <TextInput
            id="signup-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            placeholder={t("auth.passwordMinPlaceholder")}
            leftIcon={<Lock className="h-4 w-4" />}
            error={errors.password ? t(errors.password) : undefined}
            autoComplete="new-password"
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

        <Field
          id="confirm-password"
          label={t("auth.confirmLabel")}
          error={errors.confirmPassword ? t(errors.confirmPassword) : undefined}
        >
          <TextInput
            id="confirm-password"
            type={showConfirm ? "text" : "password"}
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder={t("auth.confirmPlaceholder")}
            leftIcon={<CheckCircle2 className="h-4 w-4" />}
            error={errors.confirmPassword ? t(errors.confirmPassword) : undefined}
            autoComplete="new-password"
            rightSlot={
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                aria-label={
                  showConfirm ? t("auth.hidePassword") : t("auth.showPassword")
                }
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
          />
        </Field>

        <PrimaryButton isLoading={isLoading}>
          {isLoading ? (
            t("auth.signupPending")
          ) : (
            <>
              {t("auth.signupBtn")}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </PrimaryButton>
      </form>
    </>
  );
}