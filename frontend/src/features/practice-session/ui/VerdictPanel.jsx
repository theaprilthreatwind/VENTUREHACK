import { CheckCircle2, XCircle } from "lucide-react";

/**
 * Вердикт по ответу: верно/неверно. Пояснение показывает `ExplanationPanel`.
 *
 * @param {{ correct: boolean }} props
 */
export function VerdictPanel({ correct }) {
  return (
    <div
      role="status"
      className={`mt-6 rounded-xl border p-4 ${
        correct
          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-700/60 dark:bg-emerald-950/50"
          : "border-red-200 bg-red-50 dark:border-red-700/60 dark:bg-red-950/50"
      }`}
    >
      <p
        className={`flex items-center gap-2 text-sm font-semibold ${
          correct ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
        }`}
      >
        {correct ? (
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        ) : (
          <XCircle className="h-4 w-4" aria-hidden="true" />
        )}
        {correct ? "Верно" : "Неверно"}
      </p>
    </div>
  );
}
