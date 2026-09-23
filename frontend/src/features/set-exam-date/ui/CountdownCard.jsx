"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { Modal } from "@/shared/ui";
import { useLocalStorage, setLocalStorageItem } from "@/shared/lib";
import { useLang } from "@/shared/i18n";
import { STORAGE_KEYS } from "@/shared/config";

const EXAM_DATE_KEY = STORAGE_KEYS.examDate;

const UNIT_KEYS = ["dashboard.days", "dashboard.hours", "dashboard.minutes", "dashboard.seconds"];

function getTimeLeft(target) {
  if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const diff = new Date(target) - new Date();
  if (Number.isNaN(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(value) {
  return String(value).padStart(2, "0");
}

export default function CountdownCard() {
  const examDate = useLocalStorage(EXAM_DATE_KEY, "");
  const { t, lang } = useLang();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(examDate));
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!examDate) return undefined;
    const timer = setInterval(() => setTimeLeft(getTimeLeft(examDate)), 1000);
    return () => clearInterval(timer);
  }, [examDate]);

  const openModal = () => {
    setDraft(examDate ? examDate.slice(0, 10) : "");
    setOpen(true);
  };

  const saveDate = () => {
    if (!draft) return;
    setLocalStorageItem(EXAM_DATE_KEY, draft);
    setOpen(false);
  };

  const blocks = examDate
    ? [
        { label: t("dashboard.days"), value: String(timeLeft.days) },
        { label: t("dashboard.hours"), value: pad(timeLeft.hours) },
        { label: t("dashboard.minutes"), value: pad(timeLeft.minutes) },
        { label: t("dashboard.seconds"), value: pad(timeLeft.seconds) },
      ]
    : UNIT_KEYS.map((key) => ({ label: t(key), value: "—" }));

  return (
    <>
      <article className="flex min-h-[330px] flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
            <CalendarClock className="h-5 w-5" />
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {t("dashboard.countdownTitle")}
          </h3>
        </div>

        <div className="mx-auto my-auto grid w-full max-w-md grid-cols-4 gap-3.5 py-5">
          {blocks.map((block) => (
            <div key={block.label} className="flex flex-col items-center">
              <div className="w-full rounded-2xl border border-slate-200/90 bg-[#f8fafc] py-4 text-center dark:border-slate-700/70 dark:bg-slate-800/60">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  {block.value}
                </span>
              </div>
              <span className="mt-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {block.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 pt-2 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {examDate
              ? t("dashboard.targetDate", {
                  date: new Date(examDate).toLocaleDateString(lang === "kk" ? "kk-KZ" : "ru-RU"),
                })
              : t("dashboard.noExamDate")}
          </p>
          <button
            type="button"
            onClick={openModal}
            className="text-xs font-semibold text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
            {t("dashboard.changeDate")}
          </button>
        </div>
      </article>

      <Modal open={open} onClose={() => setOpen(false)} title={t("dashboard.dateModalTitle")}>
        <label htmlFor="exam-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {t("dashboard.whenExam")}
        </label>
        <input
          id="exam-date"
          type="date"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
          {t("dashboard.storedLocally")}
        </p>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {t("common.cancel")}
          </button>
          <button
            type="button"
            onClick={saveDate}
            disabled={!draft}
            className="rounded-xl bg-[#131926] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("common.save")}
          </button>
        </div>
      </Modal>
    </>
  );
}
