"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, BellOff, CheckCheck, Trash2 } from "lucide-react";

import { useNotifications } from "@/entities/notification";
import { useLang } from "@/shared/i18n";
import { pluralRu } from "@/shared/i18n/config/translations";

/**
 * Форматирует относительное время уведомления.
 *
 * @param {"ru"|"kk"} lang
 * @param {(key: string, vars?: Record<string, unknown>) => string} t
 * @param {string} isoDate
 * @returns {string}
 */
function formatRelativeTime(lang, t, isoDate) {
  const minutes = Math.max(Math.floor((Date.now() - new Date(isoDate).getTime()) / 60000), 0);
  if (minutes < 1) return t("notifications.timeNow");

  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const amount = minutes < 60 ? minutes : hours < 24 ? hours : days;
  const unit = minutes < 60 ? "timeMinutes" : hours < 24 ? "timeHours" : "timeDays";
  const suffix = lang === "kk" ? t(`notifications.${unit}`) : pluralRu(amount, t(`notifications.${unit}`));
  return `${amount} ${suffix}`;
}

/**
 * Кнопка-колокольчик с выпадающим списком локальных уведомлений:
 * бейдж непрочитанных, отметка «прочитано», чтение всех и очистка.
 * Учитывает переключатель «Уведомления в приложении» (entities/notification).
 */
export function NotificationsBell() {
  const { notifications, unreadCount, markRead, markAllRead, clearAll } = useNotifications();
  const { lang, t } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleNotificationClick = (notification) => {
    if (!notification.read) markRead(notification.id);
    if (notification.type === "result") router.push("/practice/result");
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t("header.notifications")}
        className="relative rounded-full border border-transparent p-2.5 text-slate-500 transition-all hover:border-slate-200 hover:bg-white hover:text-slate-800 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-950" />
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("notifications.title")}
          className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {t("notifications.title")}
              {unreadCount > 0 && (
                <span className="ml-1.5 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {unreadCount}
                </span>
              )}
            </span>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  title={t("notifications.markAllRead")}
                  aria-label={t("notifications.markAllRead")}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                >
                  <CheckCheck className="h-4 w-4" />
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  title={t("notifications.clearAll")}
                  aria-label={t("notifications.clearAll")}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-80 divide-y divide-slate-100 overflow-y-auto border-t border-slate-100 dark:divide-slate-800 dark:border-slate-800">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                <BellOff className="h-6 w-6 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                <p className="text-sm text-slate-500 dark:text-slate-400">{t("notifications.empty")}</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  type="button"
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`block w-full px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                    notification.read ? "opacity-70" : "bg-blue-50/50 dark:bg-blue-950/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {t(notification.titleKey)}
                    </span>
                    <span className="shrink-0 text-[11px] text-slate-400">
                      {formatRelativeTime(lang, t, notification.createdAt)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {t(notification.key, notification.vars)}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}