import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeColor =
  | "gray"
  | "blue"
  | "green"
  | "yellow"
  | "orange"
  | "red"
  | "navy"
  | "purple";

const colorMap: Record<BadgeColor, string> = {
  gray: "bg-gray-100 text-gray-700 ring-gray-200",
  blue: "bg-blue-50 text-blue-700 ring-blue-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  yellow: "bg-amber-50 text-amber-700 ring-amber-200",
  orange: "bg-orange-50 text-orange-700 ring-orange-200",
  red: "bg-red-50 text-red-700 ring-red-200",
  navy: "bg-slate-100 text-slate-800 ring-slate-300",
  purple: "bg-purple-50 text-purple-700 ring-purple-200",
};

export function Badge({
  className,
  color = "gray",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { color?: BadgeColor }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        colorMap[color],
        className
      )}
      {...props}
    />
  );
}
