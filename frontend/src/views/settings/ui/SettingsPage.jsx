"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  ChevronRight,
  Copy,
  KeyRound,
  LogOut,
  Moon,
  Shield,
  Sliders,
  Sun,
  User,
  X,
} from "lucide-react";
import { useCurrentUser } from "@/entities/user";
import { storageGet, storageSet } from "@/shared/lib/storage";
import { STORAGE_KEYS } from "@/shared/config";

/* ──────────────────────────────────────────────────────────── */
/*  Типы и константы                                            */
/* ──────────────────────────────────────────────────────────── */

/**
 * @typedef {Object} Prefs
 * @property {boolean} emailAlerts
 * @property {boolean} inAppAlerts
 * @property {"dark"|"light"} theme
 * @property {number} riskThreshold
 */

/** @returns {Prefs} */
function defaultPrefs() {
  return { emailAlerts: true, inAppAlerts: true, theme: "light", riskThreshold: 70 };
}

/* ──────────────────────────────────────────────────────────── */
/*  Вспомогательные UI-компоненты                              */
/* ──────────────────────────────────────────────────────────── */

/** Заголовок секции */
function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
        <Icon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
      </span>
      <div>
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
    </div>
  );
}

/** Карточка-обёртка */
function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {children}
    </div>
  );
}

/** Toggle Switch */
function Toggle({ checked, onChange, id }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#131926] ${
        checked ? "bg-[#131926]" : "bg-slate-200 dark:bg-slate-700"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out dark:bg-slate-100 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/** Строка настройки с toggle */
function ToggleRow({ label, description, checked, onChange, id }) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-1 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</p>
        )}
      </div>
      <Toggle id={id} checked={checked} onChange={onChange} />
    </label>
  );
}

/** Модальное подтверждение */
function ConfirmModal({ title, description, confirmLabel, onConfirm, onCancel, danger = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-800"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </button>

        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${
            danger ? "bg-red-100 dark:bg-red-950/60" : "bg-slate-100 dark:bg-slate-800"
          }`}
        >
          <LogOut
            className={`h-6 w-6 ${danger ? "text-red-600 dark:text-red-400" : "text-slate-600 dark:text-slate-300"}`}
          />
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors ${
              danger
                ? "bg-red-600 hover:bg-red-700 active:bg-red-800"
                : "bg-[#131926] hover:bg-slate-800"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  Главная страница                                            */
/* ──────────────────────────────────────────────────────────── */

/** Подписка никогда не срабатывает — snapshot «смонтирован» неизменен. */
const subscribeNever = () => () => {};

export function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useCurrentUser();

  // ── Гидрация ──
  // Стабильный флаг «компонент смонтирован на клиенте» без setState в effect:
  // на сервере и первом клиентском рендере false, после гидрации true.
  const isHydrated = useSyncExternalStore(subscribeNever, () => true, () => false);

  // ── Копирование UUID ──
  const [copied, setCopied] = useState(false);

  // ── Настройки ──
  // Ленивая инициализация из localStorage (SSR-безопасно) — без effect.
  const [prefs, setPrefs] = useState(
    /** @type {Prefs} */ () => storageGet(STORAGE_KEYS.prefs, defaultPrefs())
  );

  // ── Модальные окна ──
  const [showLogout, setShowLogout] = useState(false);
  const [showResetKey, setShowResetKey] = useState(false);

  // ── Статусы ──
  const [resetDone, setResetDone] = useState(false);

  /** Сохраняет настройку и пишет в localStorage */
  function updatePref(key, value) {
    setPrefs((prev) => {
      const next = { ...prev, [key]: value };
      storageSet(STORAGE_KEYS.prefs, next);
      return next;
    });
  }

  /** Копирует ID пользователя */
  function copyUserId() {
    const id = String(user?.id ?? "—");
    navigator.clipboard?.writeText(id).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  /** Logout + редирект */
  function handleLogout() {
    setShowLogout(false);
    logout();
    router.push("/auth");
  }

  /** Сброс API-ключа / сессии */
  function handleResetKey() {
    setShowResetKey(false);
    // Очищаем сессию практики
    localStorage.removeItem(STORAGE_KEYS.session);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  }

  if (!isHydrated) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 py-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
        ))}
      </div>
    );
  }

  const displayId = user?.id ? String(user.id) : "—";
  const displayEmail = user?.email ?? "—";
  const displayName = user?.username ?? "—";

  return (
    <>
      {/* Модалки */}
      {showLogout && (
        <ConfirmModal
          title="Выйти из аккаунта?"
          description="Все данные сессии будут очищены. Вы будете перенаправлены на страницу входа."
          confirmLabel="Выйти"
          danger
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
      {showResetKey && (
        <ConfirmModal
          title="Сбросить сессию?"
          description="Текущая активная сессия практики будет удалена. Прогресс незавершённого теста будет потерян."
          confirmLabel="Сбросить"
          onConfirm={handleResetKey}
          onCancel={() => setShowResetKey(false)}
        />
      )}

      <div className="mx-auto max-w-2xl py-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Настройки
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Управление профилем, предпочтениями и безопасностью аккаунта.
          </p>
        </div>

        <div className="space-y-5">
          {/* ── Профиль ── */}
          <Card>
            <SectionHeader
              icon={User}
              title="Профиль пользователя"
              description="Ваши личные данные и идентификатор аккаунта."
            />

            {/* ID с кнопкой копирования */}
            <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  ID пользователя
                </p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {displayId}
                </p>
              </div>
              <button
                type="button"
                onClick={copyUserId}
                aria-label="Скопировать ID"
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  copied
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                    : "bg-white text-slate-600 shadow-sm hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Скопировано
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Копировать
                  </>
                )}
              </button>
            </div>

            {/* Поля профиля */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                { label: "Email", value: displayEmail },
                { label: "Имя пользователя", value: displayName },
                { label: "Роль", value: "Студент" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-3">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* ── Настройки платформы ── */}
          <Card>
            <SectionHeader
              icon={Bell}
              title="Уведомления и предпочтения"
              description="Управление оповещениями и темой оформления."
            />

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <ToggleRow
                id="email-alerts"
                label="Email-уведомления"
                description="Получать важные обновления на почту"
                checked={prefs.emailAlerts}
                onChange={(v) => updatePref("emailAlerts", v)}
              />
              <ToggleRow
                id="inapp-alerts"
                label="Уведомления в приложении"
                description="Push-уведомления внутри платформы"
                checked={prefs.inAppAlerts}
                onChange={(v) => updatePref("inAppAlerts", v)}
              />

              {/* Тема */}
              <div className="flex items-center justify-between gap-4 rounded-xl px-1 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Тема оформления
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Светлая или тёмная тема
                  </p>
                </div>
                <div className="flex rounded-xl border border-slate-200 p-1 dark:border-slate-700">
                  {(["light", "dark"] ).map((t) => {
                    const Icon = t === "light" ? Sun : Moon;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => updatePref("theme", t)}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                          prefs.theme === t
                            ? "bg-[#131926] text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {t === "light" ? "Светлая" : "Тёмная"}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* ── Порог риска ── */}
          <Card>
            <SectionHeader
              icon={Sliders}
              title="Параметры обучения"
              description="Настройка сложности и чувствительности системы."
            />

            <div className="px-1">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Порог сложности вопросов
                </p>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-bold text-slate-900 dark:bg-slate-800 dark:text-white">
                  {prefs.riskThreshold}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={prefs.riskThreshold}
                onChange={(e) => updatePref("riskThreshold", Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#131926] dark:bg-slate-700"
                aria-label="Порог сложности"
              />
              <div className="mt-1.5 flex justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>Лёгкие</span>
                <span>Все</span>
              </div>
            </div>
          </Card>

          {/* ── Опасная зона ── */}
          <Card className="border-red-100 dark:border-red-900/50">
            <SectionHeader
              icon={Shield}
              title="Управление аккаунтом"
              description="Необратимые действия с аккаунтом и сессией."
            />

            <div className="space-y-3">
              {/* Сброс сессии */}
              <button
                type="button"
                onClick={() => setShowResetKey(true)}
                className="group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left transition-colors hover:border-amber-200 hover:bg-amber-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-amber-800 dark:hover:bg-amber-950/30"
              >
                <div className="flex items-center gap-3">
                  <KeyRound className="h-5 w-5 text-slate-400 group-hover:text-amber-600 dark:text-slate-500 dark:group-hover:text-amber-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {resetDone ? "Сессия сброшена ✓" : "Сбросить активную сессию"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Удалить текущий незавершённый тест
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 dark:text-slate-500 dark:group-hover:text-amber-400" />
              </button>

              {/* Logout */}
              <button
                type="button"
                onClick={() => setShowLogout(true)}
                className="group flex w-full items-center justify-between rounded-xl border border-red-100 bg-red-50 px-4 py-3.5 text-left transition-colors hover:border-red-300 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:hover:border-red-700 dark:hover:bg-red-950/50"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="h-5 w-5 text-red-400 group-hover:text-red-600 dark:text-red-400 dark:group-hover:text-red-300" />
                  <div>
                    <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                      Выйти из аккаунта
                    </p>
                    <p className="text-xs text-red-400 dark:text-red-500/80">
                      Очистить сессию и вернуться на страницу входа
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-red-400 group-hover:text-red-600 dark:text-red-500 dark:group-hover:text-red-300" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
