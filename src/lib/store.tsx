"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "./supabase/client";
import {
  ActivityEvent,
  AutomationRule,
  Company,
  Crew,
  CrewMember,
  Customer,
  Invoice,
  InvoiceStatus,
  Job,
  JobStage,
  JobStatus,
  Notification,
  OperationalRisk,
  PipelineStage,
  SOP,
  SOPStatus,
  SalesOpportunity,
  Task,
  TaskStatus,
  User,
} from "./types";

function nowIso() {
  return new Date().toISOString();
}

interface StoreState {
  company: Company;
  users: User[];
  customers: Customer[];
  opportunities: SalesOpportunity[];
  jobs: Job[];
  jobStages: JobStage[];
  tasks: Task[];
  crews: Crew[];
  invoices: Invoice[];
  risks: OperationalRisk[];
  sops: SOP[];
  automationRules: AutomationRule[];
  activity: ActivityEvent[];
  notifications: Notification[];
  serviceTypes: string[];
  connectedIntegrations: string[];
  onboardingDismissed: boolean;
}

interface StoreActions {
  addActivity: (message: string, category: ActivityEvent["category"]) => void;
  createOpportunity: (data: Omit<SalesOpportunity, "id" | "companyId" | "createdAt" | "updatedAt" | "stageEnteredAt">) => void;
  updateOpportunity: (id: string, data: Omit<SalesOpportunity, "id" | "companyId" | "createdAt" | "updatedAt" | "stageEnteredAt">) => void;
  deleteOpportunity: (id: string) => void;
  moveOpportunityStage: (id: string, stage: PipelineStage) => void;
  updateOpportunityFollowUp: (id: string, date: string) => void;
  createJob: (data: Omit<Job, "id" | "companyId" | "createdAt" | "updatedAt">) => void;
  updateJobStatus: (id: string, status: JobStatus) => void;
  assignCrewToJob: (jobId: string, crewId: string | null) => void;
  createTask: (data: Omit<Task, "id" | "companyId" | "createdAt" | "updatedAt">) => void;
  updateTaskStatus: (id: string, status: TaskStatus, blockerNotes?: string) => void;
  createRisk: (data: Omit<OperationalRisk, "id" | "companyId" | "createdAt" | "updatedAt">) => void;
  resolveRisk: (id: string) => void;
  reassignRiskOwner: (id: string, ownerId: string) => void;
  escalateRisk: (id: string) => void;
  createInvoice: (data: Omit<Invoice, "id" | "companyId" | "createdAt" | "updatedAt">) => void;
  markInvoiceSent: (id: string) => void;
  markInvoicePaid: (id: string) => void;
  escalateInvoice: (id: string) => void;
  createSOP: (data: Omit<SOP, "id" | "companyId" | "lastUpdated">) => void;
  updateSOPStatus: (id: string, status: SOPStatus) => void;
  createAutomationRule: (data: Omit<AutomationRule, "id" | "companyId">) => void;
  toggleAutomationRule: (id: string) => void;
  deleteAutomationRule: (id: string) => void;
  updateAutomationRule: (id: string, data: Omit<AutomationRule, "id" | "companyId">) => void;
  createCrew: (data: Omit<Crew, "id" | "companyId" | "createdAt" | "updatedAt">) => void;
  deleteCrew: (id: string) => void;
  addCrewMember: (crewId: string, member: Omit<CrewMember, "id">) => void;
  removeCrewMember: (crewId: string, memberId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateCompany: (data: Partial<Company>) => void;
  addServiceType: (name: string) => void;
  removeServiceType: (name: string) => void;
  createUser: (data: Omit<User, "id" | "companyId" | "createdAt" | "updatedAt">) => void;
  updateUser: (id: string, data: Partial<Omit<User, "id" | "companyId" | "createdAt" | "updatedAt">>) => void;
  deleteUser: (id: string) => void;
  createCustomer: (data: Omit<Customer, "id" | "companyId" | "createdAt" | "updatedAt">) => void;
  connectIntegration: (name: string) => void;
  disconnectIntegration: (name: string) => void;
  changeSubscriptionTier: (tier: Company["subscriptionTier"]) => void;
  dismissOnboarding: () => void;
}

const StoreContext = createContext<(StoreState & StoreActions) | null>(null);

const DEFAULT_SERVICE_TYPES = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Pest Control",
  "General Contracting",
];

const EMPTY_COMPANY: Company = {
  id: "",
  name: "",
  industry: "",
  size: 0,
  subscriptionTier: "Startup",
  toolsUsed: [],
  createdAt: nowIso(),
  updatedAt: nowIso(),
};

// ---- snake_case -> camelCase row mappers ----

function mapCompany(row: any): Company {
  return {
    id: row.id,
    name: row.name,
    industry: row.industry,
    size: row.size,
    subscriptionTier: row.subscription_tier,
    toolsUsed: row.tools_used ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapUser(row: any): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    companyId: row.company_id,
    avatarUrl: row.avatar_url ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapCustomer(row: any): Customer {
  return {
    id: row.id,
    companyId: row.company_id,
    customerName: row.customer_name,
    primaryContact: row.primary_contact,
    email: row.email,
    phone: row.phone,
    address: row.address,
    status: row.status,
    openJobs: row.open_jobs,
    totalRevenue: row.total_revenue,
    riskStatus: row.risk_status,
    lastActivity: row.last_activity,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapOpportunity(row: any): SalesOpportunity {
  return {
    id: row.id,
    companyId: row.company_id,
    customerId: row.customer_id,
    serviceType: row.service_type,
    estimatedValue: row.estimated_value,
    stage: row.stage,
    ownerId: row.owner_id,
    followUpDate: row.follow_up_date,
    notes: row.notes,
    stageEnteredAt: row.stage_entered_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapCrewMember(row: any): CrewMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
  };
}

function mapCrew(row: any, members: CrewMember[]): Crew {
  return {
    id: row.id,
    companyId: row.company_id,
    crewName: row.crew_name,
    crewLeadId: row.crew_lead_id,
    crewMembers: members.map((m) => m.id),
    members,
    serviceSpecialty: row.service_specialty,
    activeJobs: row.active_jobs,
    capacityStatus: row.capacity_status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapJob(row: any): Job {
  return {
    id: row.id,
    companyId: row.company_id,
    customerId: row.customer_id,
    jobName: row.job_name,
    serviceType: row.service_type,
    jobValue: row.job_value,
    jobManagerId: row.job_manager_id,
    assignedCrewId: row.assigned_crew_id,
    status: row.status,
    priority: row.priority,
    scheduledStartDate: row.scheduled_start_date,
    scheduledEndDate: row.scheduled_end_date,
    actualStartDate: row.actual_start_date,
    actualEndDate: row.actual_end_date,
    address: row.address,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapJobStage(row: any): JobStage {
  return {
    id: row.id,
    jobId: row.job_id,
    name: row.name,
    order: row.order,
    status: row.status,
  };
}

function mapTask(row: any): Task {
  return {
    id: row.id,
    companyId: row.company_id,
    jobId: row.job_id,
    customerId: row.customer_id,
    assignedToId: row.assigned_to_id,
    name: row.name,
    description: row.description,
    dueDate: row.due_date,
    priority: row.priority,
    status: row.status,
    blockerNotes: row.blocker_notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapInvoice(row: any): Invoice {
  return {
    id: row.id,
    companyId: row.company_id,
    customerId: row.customer_id,
    jobId: row.job_id,
    invoiceNumber: row.invoice_number,
    amount: row.amount,
    status: row.status,
    dueDate: row.due_date,
    sentDate: row.sent_date,
    paidDate: row.paid_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapRisk(row: any): OperationalRisk {
  return {
    id: row.id,
    companyId: row.company_id,
    customerId: row.customer_id,
    jobId: row.job_id,
    taskId: row.task_id,
    type: row.type,
    severity: row.severity,
    ownerId: row.owner_id,
    revenueAtRisk: row.revenue_at_risk,
    delayLength: row.delay_length,
    notes: row.notes,
    recommendedAction: row.recommended_action,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSOP(row: any): SOP {
  return {
    id: row.id,
    companyId: row.company_id,
    title: row.title,
    relatedArea: row.related_area,
    processDescription: row.process_description,
    steps: row.steps ?? [],
    ownerId: row.owner_id,
    status: row.status,
    lastUpdated: row.last_updated,
  };
}

function mapAutomationRule(row: any): AutomationRule {
  return {
    id: row.id,
    companyId: row.company_id,
    name: row.name,
    trigger: row.trigger,
    condition: row.condition,
    action: row.action,
    isActive: row.is_active,
  };
}

function mapActivity(row: any): ActivityEvent {
  return {
    id: row.id,
    companyId: row.company_id,
    message: row.message,
    timestamp: row.created_at,
    category: row.category,
  };
}

function mapNotification(row: any): Notification {
  return {
    id: row.id,
    message: row.message,
    userId: row.user_id,
    read: row.read,
    createdAt: row.created_at,
  };
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const companyIdRef = useRef<string>("");

  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company>(EMPTY_COMPANY);
  const [users, setUsers] = useState<User[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [opportunities, setOpportunities] = useState<SalesOpportunity[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobStages, setJobStages] = useState<JobStage[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [crews, setCrews] = useState<Crew[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [risks, setRisks] = useState<OperationalRisk[]>([]);
  const [sops, setSops] = useState<SOP[]>([]);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [serviceTypes, setServiceTypes] = useState<string[]>(DEFAULT_SERVICE_TYPES);
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([]);
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data: authData } = await supabase.auth.getUser();
      const authUser = authData?.user;
      if (!authUser) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("company_id")
        .eq("id", authUser.id)
        .single();

      const companyId = profile?.company_id;
      if (!companyId) {
        setLoading(false);
        return;
      }
      companyIdRef.current = companyId;

      const { data: companyRow } = await supabase
        .from("companies")
        .select("*")
        .eq("id", companyId)
        .single();

      const [
        teamMembersRes,
        customersRes,
        opportunitiesRes,
        crewsRes,
        crewMembersRes,
        jobsRes,
        jobStagesRes,
        tasksRes,
        invoicesRes,
        risksRes,
        sopsRes,
        automationRulesRes,
        activityRes,
        notificationsRes,
        integrationsRes,
      ] = await Promise.all([
        supabase.from("team_members").select("*").eq("company_id", companyId),
        supabase.from("customers").select("*").eq("company_id", companyId),
        supabase.from("sales_opportunities").select("*").eq("company_id", companyId),
        supabase.from("crews").select("*").eq("company_id", companyId),
        supabase.from("crew_members").select("*").eq("company_id", companyId),
        supabase.from("jobs").select("*").eq("company_id", companyId),
        supabase.from("job_stages").select("*").eq("company_id", companyId),
        supabase.from("tasks").select("*").eq("company_id", companyId),
        supabase.from("invoices").select("*").eq("company_id", companyId),
        supabase.from("operational_risks").select("*").eq("company_id", companyId),
        supabase.from("sops").select("*").eq("company_id", companyId),
        supabase.from("automation_rules").select("*").eq("company_id", companyId),
        supabase.from("activity_events").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
        supabase.from("notifications").select("*").eq("company_id", companyId).order("created_at", { ascending: false }),
        supabase.from("connected_integrations").select("*").eq("company_id", companyId),
      ]);

      if (cancelled) return;

      const crewMembersByCrewId = new Map<string, CrewMember[]>();
      (crewMembersRes.data ?? []).forEach((row: any) => {
        const list = crewMembersByCrewId.get(row.crew_id) ?? [];
        list.push(mapCrewMember(row));
        crewMembersByCrewId.set(row.crew_id, list);
      });

      if (companyRow) setCompany(mapCompany(companyRow));
      setUsers((teamMembersRes.data ?? []).map(mapUser));
      setCustomers((customersRes.data ?? []).map(mapCustomer));
      setOpportunities((opportunitiesRes.data ?? []).map(mapOpportunity));
      setCrews((crewsRes.data ?? []).map((row: any) => mapCrew(row, crewMembersByCrewId.get(row.id) ?? [])));
      setJobs((jobsRes.data ?? []).map(mapJob));
      setJobStages((jobStagesRes.data ?? []).map(mapJobStage));
      setTasks((tasksRes.data ?? []).map(mapTask));
      setInvoices((invoicesRes.data ?? []).map(mapInvoice));
      setRisks((risksRes.data ?? []).map(mapRisk));
      setSops((sopsRes.data ?? []).map(mapSOP));
      setAutomationRules((automationRulesRes.data ?? []).map(mapAutomationRule));
      setActivity((activityRes.data ?? []).map(mapActivity));
      setNotifications((notificationsRes.data ?? []).map(mapNotification));
      setConnectedIntegrations((integrationsRes.data ?? []).map((row: any) => row.name));
      setOnboardingDismissed(!!companyRow?.onboarding_dismissed);

      setLoading(false);
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const addActivity = useCallback(
    (message: string, category: ActivityEvent["category"]) => {
      const companyId = companyIdRef.current;
      const tempId = `act-${Math.random().toString(36).slice(2, 9)}`;
      const timestamp = nowIso();
      setActivity((prev) => [{ id: tempId, companyId, message, timestamp, category }, ...prev]);
      supabase
        .from("activity_events")
        .insert({ company_id: companyId, message, category })
        .select()
        .single()
        .then(({ data }) => {
          if (data) {
            setActivity((prev) => prev.map((a) => (a.id === tempId ? mapActivity(data) : a)));
          }
        });
    },
    [supabase]
  );

  const pushNotification = useCallback(
    (userId: string | null, message: string) => {
      if (!userId) return;
      const companyId = companyIdRef.current;
      const tempId = `notif-${Math.random().toString(36).slice(2, 9)}`;
      const createdAt = nowIso();
      setNotifications((prev) => [{ id: tempId, message, userId, read: false, createdAt }, ...prev]);
      supabase
        .from("notifications")
        .insert({ company_id: companyId, user_id: userId, message })
        .select()
        .single()
        .then(({ data }) => {
          if (data) {
            setNotifications((prev) => prev.map((n) => (n.id === tempId ? mapNotification(data) : n)));
          }
        });
    },
    [supabase]
  );

  const createOpportunity: StoreActions["createOpportunity"] = useCallback(
    (data) => {
      const companyId = companyIdRef.current;
      supabase
        .from("sales_opportunities")
        .insert({
          company_id: companyId,
          customer_id: data.customerId,
          service_type: data.serviceType,
          estimated_value: data.estimatedValue,
          stage: data.stage,
          owner_id: data.ownerId,
          follow_up_date: data.followUpDate,
          notes: data.notes,
        })
        .select()
        .single()
        .then(({ data: row }) => {
          if (row) setOpportunities((prev) => [mapOpportunity(row), ...prev]);
        });
      addActivity(`New sales opportunity created: ${data.serviceType}`, "sales");
    },
    [addActivity, supabase]
  );

  const updateOpportunity: StoreActions["updateOpportunity"] = useCallback(
    (id, data) => {
      const updatedAt = nowIso();
      setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, ...data, updatedAt } : o)));
      supabase
        .from("sales_opportunities")
        .update({
          customer_id: data.customerId,
          service_type: data.serviceType,
          estimated_value: data.estimatedValue,
          stage: data.stage,
          owner_id: data.ownerId,
          follow_up_date: data.followUpDate,
          notes: data.notes,
        })
        .eq("id", id)
        .then();
      addActivity(`Sales opportunity updated: ${data.serviceType}`, "sales");
    },
    [addActivity, supabase]
  );

  const deleteOpportunity: StoreActions["deleteOpportunity"] = useCallback(
    (id) => {
      setOpportunities((prev) => prev.filter((o) => o.id !== id));
      supabase.from("sales_opportunities").delete().eq("id", id).then();
    },
    [supabase]
  );

  const moveOpportunityStage: StoreActions["moveOpportunityStage"] = useCallback(
    (id, stage) => {
      const stageEnteredAt = nowIso();
      setOpportunities((prev) =>
        prev.map((o) => (o.id === id ? { ...o, stage, stageEnteredAt, updatedAt: stageEnteredAt } : o))
      );
      supabase
        .from("sales_opportunities")
        .update({ stage, stage_entered_at: stageEnteredAt })
        .eq("id", id)
        .then();
      addActivity(`Opportunity moved to ${stage}`, "sales");
    },
    [addActivity, supabase]
  );

  const updateOpportunityFollowUp: StoreActions["updateOpportunityFollowUp"] = useCallback(
    (id, date) => {
      setOpportunities((prev) =>
        prev.map((o) => (o.id === id ? { ...o, followUpDate: date, updatedAt: nowIso() } : o))
      );
      supabase.from("sales_opportunities").update({ follow_up_date: date }).eq("id", id).then();
    },
    [supabase]
  );

  const createJob: StoreActions["createJob"] = useCallback(
    (data) => {
      const companyId = companyIdRef.current;
      supabase
        .from("jobs")
        .insert({
          company_id: companyId,
          customer_id: data.customerId,
          job_name: data.jobName,
          service_type: data.serviceType,
          job_value: data.jobValue,
          job_manager_id: data.jobManagerId,
          assigned_crew_id: data.assignedCrewId,
          status: data.status,
          priority: data.priority,
          scheduled_start_date: data.scheduledStartDate,
          scheduled_end_date: data.scheduledEndDate,
          actual_start_date: data.actualStartDate,
          actual_end_date: data.actualEndDate,
          address: data.address,
          notes: data.notes,
        })
        .select()
        .single()
        .then(({ data: row }) => {
          if (row) setJobs((prev) => [mapJob(row), ...prev]);
        });
      addActivity(`New job created: ${data.jobName}`, "job");
    },
    [addActivity, supabase]
  );

  const updateJobStatus: StoreActions["updateJobStatus"] = useCallback(
    (id, status) => {
      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status, updatedAt: nowIso() } : j)));
      supabase.from("jobs").update({ status }).eq("id", id).then();
      addActivity(`Job status updated to ${status}`, "job");
    },
    [addActivity, supabase]
  );

  const assignCrewToJob: StoreActions["assignCrewToJob"] = useCallback(
    (jobId, crewId) => {
      setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, assignedCrewId: crewId, updatedAt: nowIso() } : j)));
      supabase.from("jobs").update({ assigned_crew_id: crewId }).eq("id", jobId).then();
      addActivity(`Crew assignment updated for job`, "crew");
    },
    [addActivity, supabase]
  );

  const createTask: StoreActions["createTask"] = useCallback(
    (data) => {
      const companyId = companyIdRef.current;
      supabase
        .from("tasks")
        .insert({
          company_id: companyId,
          job_id: data.jobId,
          customer_id: data.customerId,
          assigned_to_id: data.assignedToId,
          name: data.name,
          description: data.description,
          due_date: data.dueDate,
          priority: data.priority,
          status: data.status,
          blocker_notes: data.blockerNotes ?? null,
        })
        .select()
        .single()
        .then(({ data: row }) => {
          if (row) setTasks((prev) => [mapTask(row), ...prev]);
        });
    },
    [supabase]
  );

  const updateTaskStatus: StoreActions["updateTaskStatus"] = useCallback(
    (id, status, blockerNotes) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status, blockerNotes: blockerNotes ?? t.blockerNotes, updatedAt: nowIso() } : t))
      );
      supabase
        .from("tasks")
        .update({ status, ...(blockerNotes !== undefined ? { blocker_notes: blockerNotes } : {}) })
        .eq("id", id)
        .then();

      if (status === "Blocked") {
        setTasks((current) => {
          const task = current.find((t) => t.id === id);
          if (task) {
            const companyId = companyIdRef.current;
            supabase
              .from("operational_risks")
              .insert({
                company_id: companyId,
                customer_id: task.customerId,
                job_id: task.jobId,
                task_id: task.id,
                type: "Blocked Job",
                severity: "High",
                owner_id: task.assignedToId,
                revenue_at_risk: 0,
                delay_length: "New",
                notes: blockerNotes ?? "Task marked blocked.",
                recommended_action: "Resolve blocker and update task status.",
                status: "Open",
              })
              .select()
              .single()
              .then(({ data: row }) => {
                if (row) setRisks((prev) => [mapRisk(row), ...prev]);
              });
            addActivity(`Operational risk created: Blocked Job`, "risk");
          }
          return current;
        });
      }
    },
    [addActivity, supabase]
  );

  const createRisk: StoreActions["createRisk"] = useCallback(
    (data) => {
      const companyId = companyIdRef.current;
      supabase
        .from("operational_risks")
        .insert({
          company_id: companyId,
          customer_id: data.customerId,
          job_id: data.jobId,
          task_id: data.taskId,
          type: data.type,
          severity: data.severity,
          owner_id: data.ownerId,
          revenue_at_risk: data.revenueAtRisk,
          delay_length: data.delayLength,
          notes: data.notes,
          recommended_action: data.recommendedAction,
          status: data.status,
        })
        .select()
        .single()
        .then(({ data: row }) => {
          if (row) setRisks((prev) => [mapRisk(row), ...prev]);
        });
      addActivity(`Operational risk created: ${data.type}`, "risk");
      pushNotification(data.ownerId, `New risk created: ${data.type}`);
    },
    [addActivity, pushNotification, supabase]
  );

  const resolveRisk: StoreActions["resolveRisk"] = useCallback(
    (id) => {
      setRisks((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Resolved", updatedAt: nowIso() } : r)));
      supabase.from("operational_risks").update({ status: "Resolved" }).eq("id", id).then();
      addActivity(`Operational risk marked resolved`, "risk");
    },
    [addActivity, supabase]
  );

  const reassignRiskOwner: StoreActions["reassignRiskOwner"] = useCallback(
    (id, ownerId) => {
      setRisks((prev) => prev.map((r) => (r.id === id ? { ...r, ownerId, updatedAt: nowIso() } : r)));
      supabase.from("operational_risks").update({ owner_id: ownerId }).eq("id", id).then();
    },
    [supabase]
  );

  const escalateRisk: StoreActions["escalateRisk"] = useCallback(
    (id) => {
      setRisks((prev) => prev.map((r) => (r.id === id ? { ...r, severity: "Critical", updatedAt: nowIso() } : r)));
      supabase.from("operational_risks").update({ severity: "Critical" }).eq("id", id).then();
      addActivity(`Operational risk escalated`, "risk");
      setRisks((current) => {
        const risk = current.find((r) => r.id === id);
        if (risk) pushNotification(risk.ownerId, "Risk escalated to Critical severity");
        return current;
      });
    },
    [addActivity, pushNotification, supabase]
  );

  const createInvoice: StoreActions["createInvoice"] = useCallback(
    (data) => {
      const companyId = companyIdRef.current;
      supabase
        .from("invoices")
        .insert({
          company_id: companyId,
          customer_id: data.customerId,
          job_id: data.jobId,
          invoice_number: data.invoiceNumber,
          amount: data.amount,
          status: data.status,
          due_date: data.dueDate,
          sent_date: data.sentDate,
          paid_date: data.paidDate,
        })
        .select()
        .single()
        .then(({ data: row }) => {
          if (row) setInvoices((prev) => [mapInvoice(row), ...prev]);
        });
      addActivity(`Invoice ${data.invoiceNumber} created`, "invoice");
    },
    [addActivity, supabase]
  );

  const markInvoiceSent: StoreActions["markInvoiceSent"] = useCallback(
    (id) => {
      const sentDate = nowIso();
      setInvoices((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "Sent" as InvoiceStatus, sentDate, updatedAt: nowIso() } : i))
      );
      supabase.from("invoices").update({ status: "Sent", sent_date: sentDate }).eq("id", id).then();
    },
    [supabase]
  );

  const markInvoicePaid: StoreActions["markInvoicePaid"] = useCallback(
    (id) => {
      const paidDate = nowIso();
      setInvoices((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "Paid" as InvoiceStatus, paidDate, updatedAt: nowIso() } : i))
      );
      supabase.from("invoices").update({ status: "Paid", paid_date: paidDate }).eq("id", id).then();
      addActivity(`Invoice marked paid`, "invoice");
    },
    [addActivity, supabase]
  );

  const escalateInvoice: StoreActions["escalateInvoice"] = useCallback(
    (id) => {
      setInvoices((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "Escalated" as InvoiceStatus, updatedAt: nowIso() } : i))
      );
      supabase.from("invoices").update({ status: "Escalated" }).eq("id", id).then();
      addActivity(`Invoice escalated`, "invoice");
    },
    [addActivity, supabase]
  );

  const createSOP: StoreActions["createSOP"] = useCallback(
    (data) => {
      const companyId = companyIdRef.current;
      supabase
        .from("sops")
        .insert({
          company_id: companyId,
          title: data.title,
          related_area: data.relatedArea,
          process_description: data.processDescription,
          steps: data.steps,
          owner_id: data.ownerId,
          status: data.status,
        })
        .select()
        .single()
        .then(({ data: row }) => {
          if (row) setSops((prev) => [mapSOP(row), ...prev]);
        });
      addActivity(`New SOP created: ${data.title}`, "sop");
    },
    [addActivity, supabase]
  );

  const updateSOPStatus: StoreActions["updateSOPStatus"] = useCallback(
    (id, status) => {
      const lastUpdated = nowIso();
      setSops((prev) => prev.map((s) => (s.id === id ? { ...s, status, lastUpdated } : s)));
      supabase.from("sops").update({ status, last_updated: lastUpdated }).eq("id", id).then();
    },
    [supabase]
  );

  const createAutomationRule: StoreActions["createAutomationRule"] = useCallback(
    (data) => {
      const companyId = companyIdRef.current;
      supabase
        .from("automation_rules")
        .insert({
          company_id: companyId,
          name: data.name,
          trigger: data.trigger,
          condition: data.condition,
          action: data.action,
          is_active: data.isActive,
        })
        .select()
        .single()
        .then(({ data: row }) => {
          if (row) setAutomationRules((prev) => [mapAutomationRule(row), ...prev]);
        });
      addActivity(`Automation rule created: ${data.name}`, "automation");
    },
    [addActivity, supabase]
  );

  const toggleAutomationRule: StoreActions["toggleAutomationRule"] = useCallback(
    (id) => {
      setAutomationRules((prev) => {
        const rule = prev.find((r) => r.id === id);
        if (rule) {
          supabase.from("automation_rules").update({ is_active: !rule.isActive }).eq("id", id).then();
        }
        return prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r));
      });
    },
    [supabase]
  );

  const deleteAutomationRule: StoreActions["deleteAutomationRule"] = useCallback(
    (id) => {
      setAutomationRules((prev) => prev.filter((r) => r.id !== id));
      supabase.from("automation_rules").delete().eq("id", id).then();
    },
    [supabase]
  );

  const updateAutomationRule: StoreActions["updateAutomationRule"] = useCallback(
    (id, data) => {
      setAutomationRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } : r)));
      supabase
        .from("automation_rules")
        .update({
          name: data.name,
          trigger: data.trigger,
          condition: data.condition,
          action: data.action,
          is_active: data.isActive,
        })
        .eq("id", id)
        .then();
      addActivity(`Automation rule updated: ${data.name}`, "automation");
    },
    [addActivity, supabase]
  );

  const createCrew: StoreActions["createCrew"] = useCallback(
    (data) => {
      const companyId = companyIdRef.current;
      supabase
        .from("crews")
        .insert({
          company_id: companyId,
          crew_name: data.crewName,
          crew_lead_id: data.crewLeadId,
          service_specialty: data.serviceSpecialty,
          active_jobs: data.activeJobs,
          capacity_status: data.capacityStatus,
        })
        .select()
        .single()
        .then(async ({ data: row }) => {
          if (!row) return;
          if (data.members.length > 0) {
            const { data: memberRows } = await supabase
              .from("crew_members")
              .insert(
                data.members.map((m) => ({
                  crew_id: row.id,
                  company_id: companyId,
                  name: m.name,
                  role: m.role,
                }))
              )
              .select();
            setCrews((prev) => [mapCrew(row, (memberRows ?? []).map(mapCrewMember)), ...prev]);
          } else {
            setCrews((prev) => [mapCrew(row, []), ...prev]);
          }
        });
      addActivity(`New crew created: ${data.crewName}`, "crew");
    },
    [addActivity, supabase]
  );

  const deleteCrew: StoreActions["deleteCrew"] = useCallback(
    (id) => {
      setCrews((prev) => prev.filter((c) => c.id !== id));
      supabase.from("crews").delete().eq("id", id).then();
    },
    [supabase]
  );

  const addCrewMember: StoreActions["addCrewMember"] = useCallback(
    (crewId, member) => {
      const companyId = companyIdRef.current;
      supabase
        .from("crew_members")
        .insert({ crew_id: crewId, company_id: companyId, name: member.name, role: member.role })
        .select()
        .single()
        .then(({ data: row }) => {
          if (!row) return;
          const newMember = mapCrewMember(row);
          setCrews((prev) =>
            prev.map((c) =>
              c.id === crewId
                ? { ...c, members: [...c.members, newMember], crewMembers: [...c.crewMembers, newMember.id], updatedAt: nowIso() }
                : c
            )
          );
        });
    },
    [supabase]
  );

  const removeCrewMember: StoreActions["removeCrewMember"] = useCallback(
    (crewId, memberId) => {
      setCrews((prev) =>
        prev.map((c) =>
          c.id === crewId
            ? {
                ...c,
                members: c.members.filter((m) => m.id !== memberId),
                crewMembers: c.crewMembers.filter((id) => id !== memberId),
                updatedAt: nowIso(),
              }
            : c
        )
      );
      supabase.from("crew_members").delete().eq("id", memberId).then();
    },
    [supabase]
  );

  const markNotificationRead: StoreActions["markNotificationRead"] = useCallback(
    (id) => {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
      supabase.from("notifications").update({ read: true }).eq("id", id).then();
    },
    [supabase]
  );

  const markAllNotificationsRead: StoreActions["markAllNotificationsRead"] = useCallback(() => {
    const companyId = companyIdRef.current;
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    supabase.from("notifications").update({ read: true }).eq("company_id", companyId).then();
  }, [supabase]);

  const updateCompany: StoreActions["updateCompany"] = useCallback(
    (data) => {
      const updatedAt = nowIso();
      setCompany((prev) => ({ ...prev, ...data, updatedAt }));
      const payload: Record<string, unknown> = {};
      if (data.name !== undefined) payload.name = data.name;
      if (data.industry !== undefined) payload.industry = data.industry;
      if (data.size !== undefined) payload.size = data.size;
      if (data.subscriptionTier !== undefined) payload.subscription_tier = data.subscriptionTier;
      if (data.toolsUsed !== undefined) payload.tools_used = data.toolsUsed;
      supabase.from("companies").update(payload).eq("id", companyIdRef.current).then();
    },
    [supabase]
  );

  const addServiceType: StoreActions["addServiceType"] = useCallback((name) => {
    setServiceTypes((prev) => (prev.includes(name) ? prev : [...prev, name]));
  }, []);

  const removeServiceType: StoreActions["removeServiceType"] = useCallback((name) => {
    setServiceTypes((prev) => prev.filter((s) => s !== name));
  }, []);

  const createUser: StoreActions["createUser"] = useCallback(
    (data) => {
      const companyId = companyIdRef.current;
      supabase
        .from("team_members")
        .insert({
          company_id: companyId,
          name: data.name,
          email: data.email,
          role: data.role,
          avatar_url: data.avatarUrl ?? null,
        })
        .select()
        .single()
        .then(({ data: row }) => {
          if (row) setUsers((prev) => [...prev, mapUser(row)]);
        });
    },
    [supabase]
  );

  const updateUser: StoreActions["updateUser"] = useCallback(
    (id, data) => {
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data, updatedAt: nowIso() } : u)));
      const payload: Record<string, unknown> = {};
      if (data.name !== undefined) payload.name = data.name;
      if (data.email !== undefined) payload.email = data.email;
      if (data.role !== undefined) payload.role = data.role;
      if (data.avatarUrl !== undefined) payload.avatar_url = data.avatarUrl;
      supabase.from("team_members").update(payload).eq("id", id).then();
    },
    [supabase]
  );

  const deleteUser: StoreActions["deleteUser"] = useCallback(
    (id) => {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      supabase.from("team_members").delete().eq("id", id).then();
    },
    [supabase]
  );

  const createCustomer: StoreActions["createCustomer"] = useCallback(
    (data) => {
      const companyId = companyIdRef.current;
      supabase
        .from("customers")
        .insert({
          company_id: companyId,
          customer_name: data.customerName,
          primary_contact: data.primaryContact,
          email: data.email,
          phone: data.phone,
          address: data.address,
          status: data.status,
          open_jobs: data.openJobs,
          total_revenue: data.totalRevenue,
          risk_status: data.riskStatus,
          last_activity: data.lastActivity,
        })
        .select()
        .single()
        .then(({ data: row }) => {
          if (row) setCustomers((prev) => [mapCustomer(row), ...prev]);
        });
      addActivity(`New customer created: ${data.customerName}`, "customer");
    },
    [addActivity, supabase]
  );

  const connectIntegration: StoreActions["connectIntegration"] = useCallback(
    (name) => {
      const companyId = companyIdRef.current;
      setConnectedIntegrations((prev) => (prev.includes(name) ? prev : [...prev, name]));
      supabase.from("connected_integrations").insert({ company_id: companyId, name }).then();
      addActivity(`Connected integration: ${name}`, "automation");
    },
    [addActivity, supabase]
  );

  const disconnectIntegration: StoreActions["disconnectIntegration"] = useCallback(
    (name) => {
      const companyId = companyIdRef.current;
      setConnectedIntegrations((prev) => prev.filter((n) => n !== name));
      supabase.from("connected_integrations").delete().eq("company_id", companyId).eq("name", name).then();
      addActivity(`Disconnected integration: ${name}`, "automation");
    },
    [addActivity, supabase]
  );

  const changeSubscriptionTier: StoreActions["changeSubscriptionTier"] = useCallback(
    (tier) => {
      setCompany((prev) => ({ ...prev, subscriptionTier: tier, updatedAt: nowIso() }));
      supabase.from("companies").update({ subscription_tier: tier }).eq("id", companyIdRef.current).then();
      addActivity(`Subscription plan changed to ${tier}`, "automation");
    },
    [addActivity, supabase]
  );

  const dismissOnboarding: StoreActions["dismissOnboarding"] = useCallback(() => {
    setOnboardingDismissed(true);
    supabase.from("companies").update({ onboarding_dismissed: true }).eq("id", companyIdRef.current).then();
  }, [supabase]);

  const value = useMemo<StoreState & StoreActions>(
    () => ({
      company,
      users,
      customers,
      opportunities,
      jobs,
      jobStages,
      tasks,
      crews,
      invoices,
      risks,
      sops,
      automationRules,
      activity,
      notifications,
      serviceTypes,
      connectedIntegrations,
      onboardingDismissed,
      addActivity,
      createOpportunity,
      updateOpportunity,
      deleteOpportunity,
      moveOpportunityStage,
      updateOpportunityFollowUp,
      createJob,
      updateJobStatus,
      assignCrewToJob,
      createTask,
      updateTaskStatus,
      createRisk,
      resolveRisk,
      reassignRiskOwner,
      escalateRisk,
      createInvoice,
      markInvoiceSent,
      markInvoicePaid,
      escalateInvoice,
      createSOP,
      updateSOPStatus,
      createAutomationRule,
      toggleAutomationRule,
      deleteAutomationRule,
      updateAutomationRule,
      createCrew,
      deleteCrew,
      addCrewMember,
      removeCrewMember,
      markNotificationRead,
      markAllNotificationsRead,
      updateCompany,
      addServiceType,
      removeServiceType,
      createUser,
      updateUser,
      deleteUser,
      createCustomer,
      connectIntegration,
      disconnectIntegration,
      changeSubscriptionTier,
      dismissOnboarding,
    }),
    [
      company,
      users,
      customers,
      opportunities,
      jobs,
      jobStages,
      tasks,
      crews,
      invoices,
      risks,
      sops,
      automationRules,
      activity,
      notifications,
      serviceTypes,
      connectedIntegrations,
      onboardingDismissed,
      addActivity,
      createOpportunity,
      updateOpportunity,
      deleteOpportunity,
      moveOpportunityStage,
      updateOpportunityFollowUp,
      createJob,
      updateJobStatus,
      assignCrewToJob,
      createTask,
      updateTaskStatus,
      createRisk,
      resolveRisk,
      reassignRiskOwner,
      escalateRisk,
      createInvoice,
      markInvoiceSent,
      markInvoicePaid,
      escalateInvoice,
      createSOP,
      updateSOPStatus,
      createAutomationRule,
      toggleAutomationRule,
      deleteAutomationRule,
      updateAutomationRule,
      createCrew,
      deleteCrew,
      addCrewMember,
      removeCrewMember,
      markNotificationRead,
      markAllNotificationsRead,
      updateCompany,
      addServiceType,
      removeServiceType,
      createUser,
      updateUser,
      deleteUser,
      createCustomer,
      connectIntegration,
      disconnectIntegration,
      changeSubscriptionTier,
      dismissOnboarding,
    ]
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-charcoal">Loading...</div>;
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useUserName(userId: string | null) {
  const { users } = useStore();
  if (!userId) return "Unassigned";
  return users.find((u) => u.id === userId)?.name ?? "Unknown";
}

export function useCustomerName(customerId: string | null) {
  const { customers } = useStore();
  if (!customerId) return "—";
  return customers.find((c) => c.id === customerId)?.customerName ?? "Unknown";
}

export function useJobName(jobId: string | null) {
  const { jobs } = useStore();
  if (!jobId) return "—";
  return jobs.find((j) => j.id === jobId)?.jobName ?? "Unknown";
}

export function useCrewName(crewId: string | null) {
  const { crews } = useStore();
  if (!crewId) return "Unassigned";
  return crews.find((c) => c.id === crewId)?.crewName ?? "Unknown";
}
