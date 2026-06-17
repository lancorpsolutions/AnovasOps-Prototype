import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  icon: Icon,
  tone = "default",
  subtext,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: "default" | "warning" | "danger" | "success";
  subtext?: string;
}) {
  const toneMap: Record<string, string> = {
    default: "text-navy bg-navy/5",
    warning: "text-amber-700 bg-amber-50",
    danger: "text-red-700 bg-red-50",
    success: "text-emerald-700 bg-emerald-50",
  };
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-charcoal mt-1.5">{value}</p>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
      <div className={cn("rounded-lg p-2.5", toneMap[tone])}>
        <Icon size={20} />
      </div>
    </div>
  );
}
