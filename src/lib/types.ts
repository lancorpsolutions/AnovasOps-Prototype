export type Role =
  | "Owner"
  | "Operations Manager"
  | "Dispatcher"
  | "Crew Lead"
  | "Office Admin";

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: number;
  subscriptionTier: "Startup" | "Small Business" | "Enterprise";
  toolsUsed: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyId: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomerStatus = "Prospect" | "Active Customer" | "Past Customer";
export type RiskStatusType = "Healthy" | "Needs Attention" | "At Risk" | "Escalated";

export interface Customer {
  id: string;
  companyId: string;
  customerName: string;
  primaryContact: string;
  email: string;
  phone: string;
  address: string;
  status: CustomerStatus;
  openJobs: number;
  totalRevenue: number;
  riskStatus: RiskStatusType;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
}

export type PipelineStage =
  | "Lead Received"
  | "Contacted"
  | "Estimate Scheduled"
  | "Estimate Completed"
  | "Proposal Sent"
  | "Won"
  | "Lost";

export type ServiceType =
  | "HVAC"
  | "Plumbing"
  | "Electrical"
  | "Roofing"
  | "Landscaping"
  | "Pest Control"
  | "General Contracting";

export interface SalesOpportunity {
  id: string;
  companyId: string;
  customerId: string;
  serviceType: ServiceType;
  estimatedValue: number;
  stage: PipelineStage;
  ownerId: string;
  followUpDate: string;
  notes: string;
  stageEnteredAt: string;
  createdAt: string;
  updatedAt: string;
}

export type JobStatus =
  | "Not Scheduled"
  | "Scheduled"
  | "In Progress"
  | "Waiting on Customer"
  | "Waiting on Materials"
  | "Blocked"
  | "Completed"
  | "Invoiced"
  | "Paid";

export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface Job {
  id: string;
  companyId: string;
  customerId: string;
  jobName: string;
  serviceType: ServiceType;
  jobValue: number;
  jobManagerId: string;
  assignedCrewId: string | null;
  status: JobStatus;
  priority: Priority;
  scheduledStartDate: string;
  scheduledEndDate: string;
  actualStartDate: string | null;
  actualEndDate: string | null;
  address: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobStage {
  id: string;
  jobId: string;
  name: string;
  order: number;
  status: "Pending" | "In Progress" | "Complete";
}

export type TaskStatus = "Not Started" | "In Progress" | "Waiting" | "Blocked" | "Completed" | "Overdue";

export interface Task {
  id: string;
  companyId: string;
  jobId: string;
  customerId: string;
  assignedToId: string;
  name: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  blockerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type CapacityStatus = "Available" | "Balanced" | "Heavy" | "Overloaded";

export interface Crew {
  id: string;
  companyId: string;
  crewName: string;
  crewLeadId: string | null;
  crewMembers: string[];
  serviceSpecialty: ServiceType;
  activeJobs: number;
  capacityStatus: CapacityStatus;
  createdAt: string;
  updatedAt: string;
}

export type InvoiceStatus = "Draft" | "Sent" | "Due Soon" | "Overdue" | "Paid" | "Escalated";

export interface Invoice {
  id: string;
  companyId: string;
  customerId: string;
  jobId: string;
  invoiceNumber: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  sentDate: string | null;
  paidDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export type RiskType =
  | "Overdue Estimate Follow-Up"
  | "Job Behind Schedule"
  | "Missing Crew Assignment"
  | "Waiting on Customer"
  | "Waiting on Materials"
  | "Blocked Job"
  | "Overdue Invoice"
  | "Escalated Customer Issue"
  | "Overloaded Crew"
  | "Completed Not Billed";

export type Severity = "Low" | "Medium" | "High" | "Critical";
export type RiskStatus = "Open" | "Monitoring" | "Resolved";

export interface OperationalRisk {
  id: string;
  companyId: string;
  customerId: string | null;
  jobId: string | null;
  taskId: string | null;
  type: RiskType;
  severity: Severity;
  ownerId: string | null;
  revenueAtRisk: number;
  delayLength: string;
  notes: string;
  recommendedAction: string;
  status: RiskStatus;
  createdAt: string;
  updatedAt: string;
}

export type RelatedArea =
  | "Sales"
  | "Estimates"
  | "Scheduling"
  | "Job Delivery"
  | "Invoicing"
  | "Customer Escalation"
  | "Reviews";

export type SOPStatus = "Draft" | "Active" | "Needs Review" | "Archived";

export interface SOP {
  id: string;
  companyId: string;
  title: string;
  relatedArea: RelatedArea;
  processDescription: string;
  steps: string[];
  ownerId: string;
  status: SOPStatus;
  lastUpdated: string;
}

export interface AutomationRule {
  id: string;
  companyId: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  isActive: boolean;
}

export interface ActivityEvent {
  id: string;
  companyId: string;
  message: string;
  timestamp: string;
  category: "sales" | "job" | "invoice" | "customer" | "crew" | "risk" | "sop" | "automation";
}
