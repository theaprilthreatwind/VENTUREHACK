"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  Home,
  Layers,
  LifeBuoy,
  Menu,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { useLang } from "@/shared/i18n";

const menuItems = [
  { labelKey: "sidebar.home", href: "/dashboard", icon: Home },
  { labelKey: "sidebar.practice", href: "/practice", icon: BookOpen },
  { labelKey: "sidebar.questionBank", href: "/question-bank", icon: Layers, badgeKey: "sidebar.free" },
  { labelKey: "sidebar.plan", href: "/plan", icon: Sparkles, badge: "AI" },
];

const bottomItems = [
  { labelKey: "sidebar.analytics", icon: BarChart3 },
  { labelKey: "sidebar.support", icon: LifeBuoy },
  { labelKey: "sidebar.settings", icon: Settings, href: "/settings" },
];

function Brand() {
  return (
    <span className="text-2xl font-black italic tracking-tight text-slate-900 dark:text-white">
      ЕНТdigit
    </span>
  );
}

function SidebarLink({ item, active, onClick }) {
  const Icon = item.icon;
  const { t } = useLang();
  return (
    <Link
      href={item.href ?? "#"}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
        active
          ? "bg-[#131926] text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-white"
      }`}
    >
      <Icon
        className={`h-5 w-5 shrink-0 ${
          active
            ? "text-white"
            : "text-slate-400 group-hover:text-slate-800 dark:text-slate-500 dark:group-hover:text-slate-200"
        }`}
      />
      <span className="flex-1">{t(item.labelKey)}</span>
      {item.badge && (
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
          {item.badge}
        </span>
      )}
      {item.badgeKey && (
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
          {t(item.badgeKey)}
        </span>
      )}
    </Link>
  );
}

function SidebarContent({ pathname, onNavigate }) {
  const { t } = useLang();
  return (
    <div className="flex h-full flex-col justify-between overflow-y-auto bg-white px-5 py-6 dark:bg-slate-950">
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <Link href="/dashboard" onClick={onNavigate}>
            <Brand />
          </Link>
          <button
            type="button"
            onClick={onNavigate}
            aria-label={t("sidebar.collapse")}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <p className="mb-3 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {t("sidebar.menu")}
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <SidebarLink
                key={item.labelKey}
                item={item}
                active={pathname === item.href}
                onClick={onNavigate}
              />
            ))}
          </nav>
        </div>
      </div>

      <div className="space-y-1 border-t border-slate-100 pt-4 dark:border-slate-800">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          if (item.href) {
            return (
              <Link
                key={item.labelKey}
                href={item.href}
                onClick={onNavigate}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-slate-50 hover:text-slate-800 dark:hover:bg-slate-800/60 dark:hover:text-white ${
                  pathname === item.href
                    ? "bg-[#131926] text-white hover:bg-slate-800"
                    : "text-slate-500"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    pathname === item.href ? "text-white" : "text-slate-400"
                  }`}
                />
                <span>{t(item.labelKey)}</span>
              </Link>
            );
          }
          return (
            <button
              key={item.labelKey}
              type="button"
              onClick={onNavigate}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800 dark:hover:bg-slate-800/60 dark:hover:text-white"
            >
              <Icon className="h-4 w-4 shrink-0 text-slate-400" />
              <span>{t(item.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 bg-white lg:block dark:border-slate-800">
        <SidebarContent pathname={pathname} />
      </aside>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
        aria-label={t("sidebar.open")}
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
