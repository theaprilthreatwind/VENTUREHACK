"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  BookOpen,
  Layers,
  Sparkles,
  Flame,
  BarChart3,
  LifeBuoy,
  Settings,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { label: "Главная", href: "/dashboard", icon: Home },
  { label: "Практика", href: "/practice", icon: BookOpen },
  { label: "Банк вопросов", href: "/bank", icon: Layers, badge: "Бесплатно" },
  { label: "План подготовки", href: "/plan", icon: Sparkles, badge: "AI" },
];

const bottomItems = [
  { label: "Аналитика успеваемости", icon: BarChart3 },
  { label: "Поддержка", icon: LifeBuoy },
  { label: "Настройки", icon: Settings },
];

function SidebarLink({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href ?? "#"}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-slate-900 text-white"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <Icon className={`h-5 w-5 shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`} />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span
          className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
            item.badge === "AI"
              ? "bg-indigo-100 text-indigo-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}

function SidebarContent({ pathname, onNavigate }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-white">
      <div className="flex items-center justify-between px-6 pb-2 pt-6">
        <Link href="/dashboard" onClick={onNavigate} className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">ENTUZ</span>
          <span className="text-[10px] font-bold tracking-widest text-blue-600">/KZ</span>
        </Link>
        <button
          type="button"
          onClick={onNavigate}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden"
          aria-label="Закрыть меню"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4">
        <p className="px-3 pb-2 text-[11px] font-semibold tracking-widest text-slate-400">МЕНЮ</p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <SidebarLink
              key={item.label}
              item={item}
              active={pathname === item.href}
              onClick={onNavigate}
            />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100">
                <Flame className="h-5 w-5 text-orange-500" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">Ежедневная серия</p>
                <p className="text-xs text-slate-500">1 день</p>
              </div>
            </div>
            <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
              АКТИВНО
            </span>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">
                Активен сегодня{" "}
                <span className="text-emerald-600">
                  <svg
                    className="mr-0.5 inline h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  ✓
                </span>
              </span>
              <span className="text-slate-400">Еще 2 дня</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-1/3 rounded-full bg-orange-500" />
            </div>
          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Перейти на Pro
          </button>
        </div>
      </nav>

      <div className="border-t border-slate-200 px-4 py-4">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={onNavigate}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <Icon className="h-5 w-5 shrink-0 text-slate-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white lg:block">
        <SidebarContent pathname={pathname} />
      </aside>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        aria-label="Открыть меню"
      >
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 w-72 shadow-xl">
            <SidebarContent pathname={pathname} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}