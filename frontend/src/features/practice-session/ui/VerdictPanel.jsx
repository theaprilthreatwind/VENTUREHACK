import { CheckCircle2, XCircle } from "lucide-react";

/**
 * Вердикт по ответу: верно/неверно и пояснение.
 *
 * @param {{ correct: boolean, explanation?: string }} props
 */
export function VerdictPanel({ correct, explanation }) {
  return (
    <div
      role="status"
      className={`mt-6 rounded-xl border p-4 ${
        correct ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
      }`}
    >
      <p
        className={`flex items-center gap-2 text-sm font-semibold ${
          correct ? "text-emerald-700" : "text-red-700"
        }`}
      >
        {correct ? (
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        ) : (
          <XCircle className="h-4 w-4" aria-hidden="true" />
        )}
        {correct ? "Верно" : "Неверно"}
      </p>

      {explanation && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{explanation}</p>
      )}
    </div>
  );
}
