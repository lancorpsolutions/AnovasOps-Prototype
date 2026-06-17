import { Badge, BadgeColor } from "@/components/ui/badge";
import {
  CapacityStatus,
  CustomerStatus,
  InvoiceStatus,
  JobStatus,
  Priority,
  RiskStatus,
  RiskStatusType,
  SOPStatus,
  Severity,
  TaskStatus,
} from "@/lib/types";

export function StatusBadge({ status }: { status: JobStatus | InvoiceStatus | TaskStatus | CustomerStatus | SOPStatus | RiskStatus }) {
  const map: Record<string, BadgeColor> = {
    "Not Scheduled": "gray",
    Scheduled: "blue",
    "In Progress": "blue",
    "Waiting on Customer": "yellow",
    "Waiting on Materials": "yellow",
    Blocked: "red",
    Completed: "green",
    Invoiced: "purple",
    Paid: "green",
    Draft: "gray",
    Sent: "blue",
    "Due Soon": "yellow",
    Overdue: "red",
    Escalated: "red",
    "Not Started": "gray",
    Waiting: "yellow",
    "Overdue ": "red",
    Prospect: "gray",
    "Active Customer": "green",
    "Past Customer": "gray",
    Active: "green",
    "Needs Review": "yellow",
    Archived: "gray",
    Open: "red",
    Monitoring: "yellow",
    Resolved: "green",
  };
  return <Badge color={map[status] ?? "gray"}>{status}</Badge>;
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const map: Record<Priority, BadgeColor> = {
    Low: "gray",
    Medium: "blue",
    High: "orange",
    Critical: "red",
  };
  return <Badge color={map[priority]}>{priority}</Badge>;
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  const map: Record<Severity, BadgeColor> = {
    Low: "gray",
    Medium: "yellow",
    High: "orange",
    Critical: "red",
  };
  return <Badge color={map[severity]}>{severity}</Badge>;
}

export function CapacityBadge({ status }: { status: CapacityStatus }) {
  const map: Record<CapacityStatus, BadgeColor> = {
    Available: "green",
    Balanced: "blue",
    Heavy: "yellow",
    Overloaded: "red",
  };
  return <Badge color={map[status]}>{status}</Badge>;
}

export function RiskStatusBadge({ status }: { status: RiskStatusType }) {
  const map: Record<RiskStatusType, BadgeColor> = {
    Healthy: "green",
    "Needs Attention": "yellow",
    "At Risk": "orange",
    Escalated: "red",
  };
  return <Badge color={map[status]}>{status}</Badge>;
}
