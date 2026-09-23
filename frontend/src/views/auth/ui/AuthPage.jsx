"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import {
  AuthTabs,
  BrandBanner,
  LoginForm,
  SignupForm,
  login,
  register,
} from "@/features/auth";
import { LanguageSwitcher, useLang } from "@/shared/i18n";

function ServerError({ message }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
      {message}
    </p>
  );
}

export function AuthPage() {
  const router = useRouter();
  const { t } = useLang();

  const [mode, setMode] = useState("login");
  const [isLoading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleLogin = async (values) => {
    setServerError("");
    setLoading(true);
    try {
      await login(values);
      router.push("/dashboard");
    } catch (error) {
      setServerError(error.message ?? t("auth.loginFailed"));
      setLoading(false);
    }
  };

  const handleSignup = async (values) => {
    setServerError("");
    setLoading(true);
    try {
      await register(values);
      router.push("/dashboard");
    } catch (error) {
      setServerError(error.message ?? t("auth.signupFailed"));
      setLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-screen bg-app-bg lg:grid-cols-2">
      <div className="fixed right-4 top-4 z-50">
        <LanguageSwitcher />
      </div>

      <BrandBanner />

      <main className="flex flex-col justify-center px-5 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900">
              <Zap className="h-5 w-5 text-sky-300" />
            </span>
            <p className="text-xl font-extrabold tracking-tight text-slate-900">ЕНТdigit</p>
          </div>

          <AuthTabs mode={mode} onChange={setMode} />

          <div className="mt-8">
            <div className={mode === "login" ? undefined : "hidden"}>
              <LoginForm isLoading={isLoading} onSubmit={handleLogin} />
            </div>
            <div className={mode === "register" ? undefined : "hidden"}>
              <SignupForm isLoading={isLoading} onSubmit={handleSignup} />
            </div>

            <ServerError message={serverError} />

            <p className="mt-8 text-center text-xs leading-relaxed text-slate-400">
              {t("auth.agreePrefix")}{" "}
              <a href="/terms" className="text-slate-500 underline-offset-2 hover:underline">
                {t("auth.agreeTerms")}
              </a>{" "}
              {t("auth.agreeAnd")}{" "}
              <a href="/privacy" className="text-slate-500 underline-offset-2 hover:underline">
                {t("auth.agreePrivacy")}
              </a>{" "}
              {t("auth.agreeSuffix")}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
