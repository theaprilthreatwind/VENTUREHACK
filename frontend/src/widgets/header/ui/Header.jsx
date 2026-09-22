"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell } from "lucide-react";
import { userProfile } from "@/entities/user";
import { useLocalStorage } from "@/shared/lib";
import { STORAGE_KEYS } from "@/shared/config";

const pageConfig = {
  "/dashboard": {
    title: "Дашборд",
    subtitle: `С возвращением, ${userProfile.name}`,
  },
  "/practice": {
    title: "Практика",
    subtitle: "Создайте новую сессию по интересующим вас темам",
  },
};

export default function Header() {
  const pathname = usePathname();
  const token = useLocalStorage(STORAGE_KEYS.token, "");
  const config =
    Object.entries(pageConfig).find(([route]) => pathname.startsWith(route))?.[1] ?? {
      title: "ENTUZ",
      subtitle: "Платформа подготовки к ЕНТ",
    };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-4 pl-14 sm:px-6 lg:pl-10">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {config.title}
          </h1>
          <p className="mt-0.5 hidden text-sm text-slate-500 sm:block">{config.subtitle}</p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {!token && (
            <>
              <Link
                href="/auth"
                className="hidden rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:inline-flex"
              >
                Старт бесплатно
              </Link>
              <Link
                href="/auth"
                className="rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 sm:hidden"
              >
                Войти
              </Link>
            </>
          )}
          <button
            type="button"
            className="relative rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Уведомления"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {userProfile.name.slice(0, 1)}
          </div>
        </div>
      </div>
    </header>
  );
}