"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  activityFeed as initialActivity,
  automationRules as initialAutomationRules,
  company as initialCompany,
  crews as initialCrews,
  customers as initialCustomers,
  invoices as initialInvoices,
  jobStages as initialJobStages,
  jobs as initialJobs,
  opportunities as initialOpportunities,
  operationalRisks as initialRisks,
  sops as initialSops,
  tasks as initialTasks,
  users as initialUsers,
} from "./mock-data";
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

function newId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

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
}

const StoreContext = createContext<(StoreState & StoreActions) | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [opportunities, setOpportunities] = useState<SalesOpportunity[]>(initialOpportunities);
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [jobStages] = useState<JobStage[]>(initialJobStages);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [crews, setCrews] = useState<Crew[]>(initialCrews);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [risks, setRisks] = useState<OperationalRisk[]>(initialRisks);
  const [sops, setSops] = useState<SOP[]>(initialSops);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(initialAutomationRules);
  const [activity, setActivity] = useState<ActivityEvent[]>(initialActivity);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [serviceTypes, setServiceTypes] = useState<string[]>([
    "HVAC",
    "Plumbing",
    "Electrical",
    "Roofing",
    "Landscaping",
    "Pest Control",
    "General Contracting",
  ]);
  const [company, setCompany] = useState<Company>(initialCompany);
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>(["HubSpot", "QuickBooks"]);

  const addActivity = useCallback((message: string, category: ActivityEvent["category"]) => {
    setActivity((prev) => [
      { id: newId("act"), companyId: initialCompany.id, message, timestamp: nowIso(), category },
      ...prev,
    ]);
  }, []);

  const pushNotification = useCallback((userId: string | null, message: string) => {
    if (!userId) return;
    setNotifications((prev) => [
      { id: newId("notif"), message, userId, read: false, createdAt: nowIso() },
      ...prev,
    ]);
  }, []);

  const createOpportunity: StoreActions["createOpportunity"] = useCallback((data) => {
    setOpportunities((prev) => [
      {
        ...data,
        id: newId("opp"),
        companyId: initialCompany.id,
        stageEnteredAt: nowIso(),
        createdAt: nowIso(),
        updatedAt: nowIso(),
      },
      ...prev,
    ]);
    addActivity(`New sales opportunity created: ${data.serviceType}`, "sales");
  }, [addActivity]);

  const updateOpportunity: StoreActions["updateOpportunity"] = useCallback((id, data) => {
    setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, ...data, updatedAt: nowIso() } : o)));
    addActivity(`Sales opportunity updated: ${data.serviceType}`, "sales");
  }, [addActivity]);

  const deleteOpportunity: StoreActions["deleteOpportunity"] = useCallback((id) => {
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const moveOpportunityStage: StoreActions["moveOpportunityStage"] = useCallback((id, stage) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, stage, stageEnteredAt: nowIso(), updatedAt: nowIso() } : o))
    );
    addActivity(`Opportunity moved to ${stage}`, "sales");
  }, [addActivity]);

  const updateOpportunityFollowUp: StoreActions["updateOpportunityFollowUp"] = useCallback((id, date) => {
    setOpportunities((prev) => prev.map((o) => (o.id === id ? { ...o, followUpDate: date, updatedAt: nowIso() } : o)));
  }, []);

  const createJob: StoreActions["createJob"] = useCallback((data) => {
    setJobs((prev) => [
      { ...data, id: newId("job"), companyId: initialCompany.id, createdAt: nowIso(), updatedAt: nowIso() },
      ...prev,
    ]);
    addActivity(`New job created: ${data.jobName}`, "job");
  }, [addActivity]);

  const updateJobStatus: StoreActions["updateJobStatus"] = useCallback((id, status) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status, updatedAt: nowIso() } : j)));
    addActivity(`Job status updated to ${status}`, "job");
  }, [addActivity]);

  const assignCrewToJob: StoreActions["assignCrewToJob"] = useCallback((jobId, crewId) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, assignedCrewId: crewId, updatedAt: nowIso() } : j)));
    addActivity(`Crew assignment updated for job`, "crew");
  }, [addActivity]);

  const createTask: StoreActions["createTask"] = useCallback((data) => {
    setTasks((prev) => [
      { ...data, id: newId("task"), companyId: initialCompany.id, createdAt: nowIso(), updatedAt: nowIso() },
      ...prev,
    ]);
  }, []);

  const updateTaskStatus: StoreActions["updateTaskStatus"] = useCallback((id, status, blockerNotes) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status, blockerNotes: blockerNotes ?? t.blockerNotes, updatedAt: nowIso() } : t))
    );
    if (status === "Blocked") {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        setRisks((prev) => [
          {
            id: newId("risk"),
            companyId: initialCompany.id,
            customerId: task.customerId,
            jobId: task.jobId,
            taskId: task.id,
            type: "Blocked Job",
            severity: "High",
            ownerId: task.assignedToId,
            revenueAtRisk: 0,
            delayLength: "New",
            notes: blockerNotes ?? "Task marked blocked.",
            recommendedAction: "Resolve blocker and update task status.",
            status: "Open",
            createdAt: nowIso(),
            updatedAt: nowIso(),
          },
          ...prev,
        ]);
        addActivity(`Operational risk created: Blocked Job`, "risk");
      }
    }
  }, [tasks, addActivity]);

  const createRisk: StoreActions["createRisk"] = useCallback((data) => {
    setRisks((prev) => [
      { ...data, id: newId("risk"), companyId: initialCompany.id, createdAt: nowIso(), updatedAt: nowIso() },
      ...prev,
    ]);
    addActivity(`Operational risk created: ${data.type}`, "risk");
    pushNotification(data.ownerId, `New risk created: ${data.type}`);
  }, [addActivity, pushNotification]);

  const resolveRisk: StoreActions["resolveRisk"] = useCallback((id) => {
    setRisks((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Resolved", updatedAt: nowIso() } : r)));
    addActivity(`Operational risk marked resolved`, "risk");
  }, [addActivity]);

  const reassignRiskOwner: StoreActions["reassignRiskOwner"] = useCallback((id, ownerId) => {
    setRisks((prev) => prev.map((r) => (r.id === id ? { ...r, ownerId, updatedAt: nowIso() } : r)));
  }, []);

  const escalateRisk: StoreActions["escalateRisk"] = useCallback((id) => {
    setRisks((prev) => prev.map((r) => (r.id === id ? { ...r, severity: "Critical", updatedAt: nowIso() } : r)));
    addActivity(`Operational risk escalated`, "risk");
    const risk = risks.find((r) => r.id === id);
    if (risk) pushNotification(risk.ownerId, "Risk escalated to Critical severity");
  }, [addActivity, pushNotification, risks]);

  const createInvoice: StoreActions["createInvoice"] = useCallback((data) => {
    setInvoices((prev) => [
      { ...data, id: newId("inv"), companyId: initialCompany.id, createdAt: nowIso(), updatedAt: nowIso() },
      ...prev,
    ]);
    addActivity(`Invoice ${data.invoiceNumber} created`, "invoice");
  }, [addActivity]);

  const markInvoiceSent: StoreActions["markInvoiceSent"] = useCallback((id) => {
    setInvoices((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "Sent" as InvoiceStatus, sentDate: nowIso(), updatedAt: nowIso() } : i))
    );
  }, []);

  const markInvoicePaid: StoreActions["markInvoicePaid"] = useCallback((id) => {
    setInvoices((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "Paid" as InvoiceStatus, paidDate: nowIso(), updatedAt: nowIso() } : i))
    );
    addActivity(`Invoice marked paid`, "invoice");
  }, [addActivity]);

  const escalateInvoice: StoreActions["escalateInvoice"] = useCallback((id) => {
    setInvoices((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "Escalated" as InvoiceStatus, updatedAt: nowIso() } : i))
    );
    addActivity(`Invoice escalated`, "invoice");
  }, [addActivity]);

  const createSOP: StoreActions["createSOP"] = useCallback((data) => {
    setSops((prev) => [{ ...data, id: newId("sop"), companyId: initialCompany.id, lastUpdated: nowIso() }, ...prev]);
    addActivity(`New SOP created: ${data.title}`, "sop");
  }, [addActivity]);

  const updateSOPStatus: StoreActions["updateSOPStatus"] = useCallback((id, status) => {
    setSops((prev) => prev.map((s) => (s.id === id ? { ...s, status, lastUpdated: nowIso() } : s)));
  }, []);

  const createAutomationRule: StoreActions["createAutomationRule"] = useCallback((data) => {
    setAutomationRules((prev) => [{ ...data, id: newId("rule"), companyId: initialCompany.id }, ...prev]);
    addActivity(`Automation rule created: ${data.name}`, "automation");
  }, [addActivity]);

  const toggleAutomationRule: StoreActions["toggleAutomationRule"] = useCallback((id) => {
    setAutomationRules((prev) => prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)));
  }, []);

  const deleteAutomationRule: StoreActions["deleteAutomationRule"] = useCallback((id) => {
    setAutomationRules((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const updateAutomationRule: StoreActions["updateAutomationRule"] = useCallback((id, data) => {
    setAutomationRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...data } : r)));
    addActivity(`Automation rule updated: ${data.name}`, "automation");
  }, [addActivity]);

  const createCrew: StoreActions["createCrew"] = useCallback((data) => {
    setCrews((prev) => [
      { ...data, id: newId("crew"), companyId: initialCompany.id, createdAt: nowIso(), updatedAt: nowIso() },
      ...prev,
    ]);
    addActivity(`New crew created: ${data.crewName}`, "crew");
  }, [addActivity]);

  const deleteCrew: StoreActions["deleteCrew"] = useCallback((id) => {
    setCrews((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const addCrewMember: StoreActions["addCrewMember"] = useCallback((crewId, member) => {
    setCrews((prev) =>
      prev.map((c) =>
        c.id === crewId
          ? { ...c, members: [...c.members, { ...member, id: newId("cm") }], updatedAt: nowIso() }
          : c
      )
    );
  }, []);

  const removeCrewMember: StoreActions["removeCrewMember"] = useCallback((crewId, memberId) => {
    setCrews((prev) =>
      prev.map((c) =>
        c.id === crewId ? { ...c, members: c.members.filter((m) => m.id !== memberId), updatedAt: nowIso() } : c
      )
    );
  }, []);

  const markNotificationRead: StoreActions["markNotificationRead"] = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead: StoreActions["markAllNotificationsRead"] = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const updateCompany: StoreActions["updateCompany"] = useCallback((data) => {
    setCompany((prev) => ({ ...prev, ...data, updatedAt: nowIso() }));
  }, []);

  const addServiceType: StoreActions["addServiceType"] = useCallback((name) => {
    setServiceTypes((prev) => (prev.includes(name) ? prev : [...prev, name]));
  }, []);

  const removeServiceType: StoreActions["removeServiceType"] = useCallback((name) => {
    setServiceTypes((prev) => prev.filter((s) => s !== name));
  }, []);

  const createUser: StoreActions["createUser"] = useCallback((data) => {
    setUsers((prev) => [
      ...prev,
      { ...data, id: newId("u"), companyId: initialCompany.id, createdAt: nowIso(), updatedAt: nowIso() },
    ]);
  }, []);

  const updateUser: StoreActions["updateUser"] = useCallback((id, data) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data, updatedAt: nowIso() } : u)));
  }, []);

  const deleteUser: StoreActions["deleteUser"] = useCallback((id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const createCustomer: StoreActions["createCustomer"] = useCallback((data) => {
    setCustomers((prev) => [
      { ...data, id: newId("cust"), companyId: initialCompany.id, createdAt: nowIso(), updatedAt: nowIso() },
      ...prev,
    ]);
    addActivity(`New customer created: ${data.customerName}`, "customer");
  }, [addActivity]);

  const connectIntegration: StoreActions["connectIntegration"] = useCallback((name) => {
    setConnectedIntegrations((prev) => (prev.includes(name) ? prev : [...prev, name]));
    addActivity(`Connected integration: ${name}`, "automation");
  }, [addActivity]);

  const disconnectIntegration: StoreActions["disconnectIntegration"] = useCallback((name) => {
    setConnectedIntegrations((prev) => prev.filter((n) => n !== name));
    addActivity(`Disconnected integration: ${name}`, "automation");
  }, [addActivity]);

  const changeSubscriptionTier: StoreActions["changeSubscriptionTier"] = useCallback((tier) => {
    setCompany((prev) => ({ ...prev, subscriptionTier: tier, updatedAt: nowIso() }));
    addActivity(`Subscription plan changed to ${tier}`, "automation");
  }, [addActivity]);

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
    ]
  );

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
