"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import {
  AuthTabs,
  BrandBanner,
  GoogleButton,
  LoginForm,
  SignupForm,
  formatKzPhone,
  persistSession,
  simulateRequest,
} from "@/features/auth";

export function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState("login");
  const [isLoading, setLoading] = useState(false);
  const [isGoogleLoading, setGoogleLoading] = useState(false);

  const handleLoginSubmit = async (values) => {
    setLoading(true);
    await simulateRequest();
    persistSession({
      method: "credentials",
      identifier: values.identifier.trim(),
      remember: values.remember,
    });
    router.push("/dashboard");
  };

  const handleSignupSubmit = async (values) => {
    setLoading(true);
    await simulateRequest();
    persistSession({
      method: "signup",
      name: values.fullName.trim(),
      email: values.email.trim(),
      phone: `+7 ${formatKzPhone(values.phone)}`,
      grade: values.grade,
    });
    router.push("/dashboard");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await simulateRequest();
    persistSession({ method: "google", name: "Абитуриент" });
    router.push("/dashboard");
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
            <p className="text-xl font-extrabold tracking-tight text-slate-900">ЕНТdigit</p>
          </div>

          <AuthTabs mode={mode} onChange={setMode} />

          <div className="mt-8">
            <div className={mode === "login" ? undefined : "hidden"}>
              <LoginForm isLoading={isLoading} onSubmit={handleLoginSubmit} />
            </div>
            <div className={mode === "register" ? undefined : "hidden"}>
              <SignupForm isLoading={isLoading} onSubmit={handleSignupSubmit} />
            </div>

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
