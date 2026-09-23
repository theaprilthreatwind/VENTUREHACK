"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell } from "lucide-react";
import { useCurrentUser } from "@/entities/user";
import { useLocalStorage } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";

const pageConfig = {
  "/dashboard": { title: "Дашборд" },
  "/practice": {
    title: "Создать сессию",
    subtitle: "Настройте фильтры, чтобы создать персонализированный тест.",
  },
};

export default function Header() {
  const pathname = usePathname();
  const token = useLocalStorage(STORAGE_KEYS.token, "");
  const { user } = useCurrentUser();

  const base =
    Object.entries(pageConfig).find(([route]) => pathname.startsWith(route))?.[1] ?? {
      title: "ЕНТdigit",
      subtitle: "Платформа подготовки к ЕНТ",
    };

  const subtitle =
    pathname.startsWith("/dashboard") && user
      ? `С возвращением, ${user.username}`
      : base.subtitle;

  return (
    <header className="px-4 pt-6 sm:px-6 lg:px-12 lg:pt-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {base.title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm font-medium text-slate-500">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!token && (
            <Link
              href="/auth"
              className="hidden rounded-xl bg-[#131926] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 sm:inline-flex"
            >
              Старт бесплатно
            </Link>
          )}
          <button
            type="button"
            className="relative rounded-full border border-transparent p-2.5 text-slate-500 transition-all hover:border-slate-200 hover:bg-white hover:text-slate-800"
            aria-label="Уведомления"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {user && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#131926] text-sm font-bold text-white">
              {user.username.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
