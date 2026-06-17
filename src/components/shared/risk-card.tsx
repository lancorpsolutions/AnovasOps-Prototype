import { OperationalRisk } from "@/lib/types";
import { SeverityBadge } from "./badges";
import { formatCurrency } from "@/lib/utils";
import { useCustomerName, useJobName, useUserName } from "@/lib/store";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function RiskCard({ risk }: { risk: OperationalRisk }) {
  const customer = useCustomerName(risk.customerId);
  const job = useJobName(risk.jobId);
  const owner = useUserName(risk.ownerId);
  const critical = risk.severity === "Critical" || risk.severity === "High";

  return (
    <div
      className={cn(
        "rounded-lg border p-4 flex flex-col gap-2",
        critical ? "border-red-200 bg-red-50/50" : "border-gray-200 bg-white"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {critical && <AlertTriangle size={15} className="text-red-600 shrink-0" />}
          <p className="text-sm font-semibold text-charcoal">{risk.type}</p>
        </div>
        <SeverityBadge severity={risk.severity} />
      </div>
      <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
        <span>Customer: <span className="text-gray-700">{customer}</span></span>
        <span>Job: <span className="text-gray-700">{job}</span></span>
        <span>Owner: <span className="text-gray-700">{owner}</span></span>
        <span>Revenue at risk: <span className="text-gray-700">{formatCurrency(risk.revenueAtRisk)}</span></span>
      </div>
      <p className="text-xs text-gray-500 italic">{risk.recommendedAction}</p>
    </div>
  );
}
