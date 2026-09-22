import { CountdownCard } from "@/features/set-exam-date";
import { GoalCard } from "@/features/set-target-score";

export function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CountdownCard />
        <GoalCard />
      </div>
    </div>
  );
}
