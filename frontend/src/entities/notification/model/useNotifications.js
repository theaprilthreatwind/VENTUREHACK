"use client";

import { useMemo } from "react";

import { STORAGE_KEYS } from "@/shared/config";
import { useLocalStorage } from "@/shared/lib";
import {
  clearNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  parseNotifications,
} from "./notifications";

/**
 * Реактивный доступ к локальным уведомлениям (localStorage).
 *
 * @returns {{
 *   notifications: import("./notifications").AppNotification[],
 *   unreadCount: number,
 *   markRead: (id: string) => void,
 *   markAllRead: () => void,
 *   clearAll: () => void,
 * }}
 */
export function useNotifications() {
  const raw = useLocalStorage(STORAGE_KEYS.notifications, "[]");
  const notifications = useMemo(() => parseNotifications(raw), [raw]);
  const unreadCount = notifications.filter((item) => !item.read).length;

  return {
    notifications,
    unreadCount,
    markRead: (id) => markNotificationRead(id),
    markAllRead: markAllNotificationsRead,
    clearAll: clearNotifications,
  };
}