import {
  ActivityEvent,
  AutomationRule,
  Company,
  Crew,
  Customer,
  Invoice,
  Job,
  JobStage,
  OperationalRisk,
  SOP,
  SalesOpportunity,
  Task,
  User,
} from "./types";

const COMPANY_ID = "company-1";

function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export const company: Company = {
  id: COMPANY_ID,
  name: "Titan HVAC & Plumbing",
  industry: "HVAC / Plumbing",
  size: 32,
  subscriptionTier: "Small Business",
  toolsUsed: ["HubSpot", "QuickBooks", "Slack", "Google Workspace", "ServiceTitan"],
  createdAt: daysFromNow(-400),
  updatedAt: daysFromNow(-1),
};

export const users: User[] = [
  { id: "u-marcus", name: "Marcus Hill", email: "marcus@titanhvac.com", role: "Owner", companyId: COMPANY_ID, createdAt: daysFromNow(-400), updatedAt: daysFromNow(-1) },
  { id: "u-dana", name: "Dana Brooks", email: "dana@titanhvac.com", role: "Operations Manager", companyId: COMPANY_ID, createdAt: daysFromNow(-400), updatedAt: daysFromNow(-1) },
  { id: "u-alicia", name: "Alicia Turner", email: "alicia@titanhvac.com", role: "Office Admin", companyId: COMPANY_ID, createdAt: daysFromNow(-400), updatedAt: daysFromNow(-1) },
  { id: "u-jerome", name: "Jerome Carter", email: "jerome@titanhvac.com", role: "Dispatcher", companyId: COMPANY_ID, createdAt: daysFromNow(-400), updatedAt: daysFromNow(-1) },
  { id: "u-nina", name: "Nina Price", email: "nina@titanhvac.com", role: "Office Admin", companyId: COMPANY_ID, createdAt: daysFromNow(-400), updatedAt: daysFromNow(-1) },
  { id: "u-elliot", name: "Elliot Shaw", email: "elliot@titanhvac.com", role: "Operations Manager", companyId: COMPANY_ID, createdAt: daysFromNow(-400), updatedAt: daysFromNow(-1) },
  { id: "u-ray", name: "Ray Thompson", email: "ray@titanhvac.com", role: "Crew Lead", companyId: COMPANY_ID, createdAt: daysFromNow(-400), updatedAt: daysFromNow(-1) },
  { id: "u-malik", name: "Malik Johnson", email: "malik@titanhvac.com", role: "Crew Lead", companyId: COMPANY_ID, createdAt: daysFromNow(-400), updatedAt: daysFromNow(-1) },
];

export const crews: Crew[] = [
  { id: "crew-a", companyId: COMPANY_ID, crewName: "HVAC Crew A", crewLeadId: "u-ray", crewMembers: ["Ray Thompson", "Tom Diaz", "Sam Patel"], members: [
    { id: "cm-1", name: "Ray Thompson", role: "Crew Lead" },
    { id: "cm-2", name: "Tom Diaz", role: "Technician" },
    { id: "cm-3", name: "Sam Patel", role: "Technician" },
  ], serviceSpecialty: "HVAC", activeJobs: 6, capacityStatus: "Heavy", createdAt: daysFromNow(-300), updatedAt: daysFromNow(-1) },
  { id: "crew-b", companyId: COMPANY_ID, crewName: "Plumbing Crew B", crewLeadId: "u-malik", crewMembers: ["Malik Johnson", "Chris Lee", "Omar Diallo"], members: [
    { id: "cm-4", name: "Malik Johnson", role: "Crew Lead" },
    { id: "cm-5", name: "Chris Lee", role: "Technician" },
    { id: "cm-6", name: "Omar Diallo", role: "Technician" },
  ], serviceSpecialty: "Plumbing", activeJobs: 4, capacityStatus: "Balanced", createdAt: daysFromNow(-300), updatedAt: daysFromNow(-1) },
  { id: "crew-c", companyId: COMPANY_ID, crewName: "Install Crew C", crewLeadId: null, crewMembers: ["Open Lead", "Devon Marsh"], members: [
    { id: "cm-7", name: "Devon Marsh", role: "Technician" },
  ], serviceSpecialty: "General Contracting", activeJobs: 7, capacityStatus: "Overloaded", createdAt: daysFromNow(-300), updatedAt: daysFromNow(-1) },
];

export const customers: Customer[] = [
  { id: "cust-1", companyId: COMPANY_ID, customerName: "Harborview Apartments", primaryContact: "Linda Cho", email: "linda@harborview.com", phone: "555-201-3344", address: "412 Harbor Way, Tampa, FL", status: "Active Customer", openJobs: 2, totalRevenue: 48500, riskStatus: "At Risk", lastActivity: daysFromNow(-2), createdAt: daysFromNow(-300), updatedAt: daysFromNow(-1) },
  { id: "cust-2", companyId: COMPANY_ID, customerName: "Sunridge Family Trust", primaryContact: "Bill Sunder", email: "bill@sunridge.com", phone: "555-202-9988", address: "88 Sunridge Dr, Tampa, FL", status: "Active Customer", openJobs: 1, totalRevenue: 12300, riskStatus: "Healthy", lastActivity: daysFromNow(-1), createdAt: daysFromNow(-250), updatedAt: daysFromNow(-1) },
  { id: "cust-3", companyId: COMPANY_ID, customerName: "Maple Grove HOA", primaryContact: "Patricia Wynn", email: "patricia@maplegrove.org", phone: "555-203-1122", address: "20 Maple Grove Cir, Tampa, FL", status: "Active Customer", openJobs: 3, totalRevenue: 75200, riskStatus: "Escalated", lastActivity: daysFromNow(-3), createdAt: daysFromNow(-500), updatedAt: daysFromNow(-1) },
  { id: "cust-4", companyId: COMPANY_ID, customerName: "Coastal Diner Group", primaryContact: "Renee Foster", email: "renee@coastaldiner.com", phone: "555-204-7766", address: "9 Coastal Hwy, Tampa, FL", status: "Active Customer", openJobs: 1, totalRevenue: 21800, riskStatus: "Needs Attention", lastActivity: daysFromNow(-5), createdAt: daysFromNow(-180), updatedAt: daysFromNow(-2) },
  { id: "cust-5", companyId: COMPANY_ID, customerName: "Whitfield Residence", primaryContact: "Carl Whitfield", email: "carl@whitfield.com", phone: "555-205-4433", address: "76 Whitfield Ln, Tampa, FL", status: "Active Customer", openJobs: 1, totalRevenue: 8900, riskStatus: "Healthy", lastActivity: daysFromNow(-1), createdAt: daysFromNow(-120), updatedAt: daysFromNow(-1) },
  { id: "cust-6", companyId: COMPANY_ID, customerName: "Bayshore Medical Plaza", primaryContact: "Dr. Anita Reyes", email: "anita@bayshoremed.com", phone: "555-206-5566", address: "300 Bayshore Blvd, Tampa, FL", status: "Active Customer", openJobs: 2, totalRevenue: 63000, riskStatus: "At Risk", lastActivity: daysFromNow(-4), createdAt: daysFromNow(-220), updatedAt: daysFromNow(-1) },
  { id: "cust-7", companyId: COMPANY_ID, customerName: "Pinecrest Builders", primaryContact: "Greg Holt", email: "greg@pinecrestbuilders.com", phone: "555-207-9900", address: "55 Pinecrest Ave, Tampa, FL", status: "Prospect", openJobs: 0, totalRevenue: 0, riskStatus: "Healthy", lastActivity: daysFromNow(-1), createdAt: daysFromNow(-10), updatedAt: daysFromNow(-1) },
  { id: "cust-8", companyId: COMPANY_ID, customerName: "Lakeside Retail Center", primaryContact: "Monica James", email: "monica@lakesideretail.com", phone: "555-208-1234", address: "120 Lakeside Pkwy, Tampa, FL", status: "Active Customer", openJobs: 1, totalRevenue: 17400, riskStatus: "Healthy", lastActivity: daysFromNow(-2), createdAt: daysFromNow(-90), updatedAt: daysFromNow(-1) },
];

export const opportunities: SalesOpportunity[] = [
  { id: "opp-1", companyId: COMPANY_ID, customerId: "cust-7", serviceType: "General Contracting", estimatedValue: 42000, stage: "Lead Received", ownerId: "u-alicia", followUpDate: daysFromNow(2), notes: "New construction lead from referral.", stageEnteredAt: daysFromNow(-1), createdAt: daysFromNow(-1), updatedAt: daysFromNow(-1) },
  { id: "opp-2", companyId: COMPANY_ID, customerId: "cust-2", serviceType: "Plumbing", estimatedValue: 6200, stage: "Contacted", ownerId: "u-alicia", followUpDate: daysFromNow(-3), notes: "Waiting on callback to schedule estimate.", stageEnteredAt: daysFromNow(-5), createdAt: daysFromNow(-6), updatedAt: daysFromNow(-3) },
  { id: "opp-3", companyId: COMPANY_ID, customerId: "cust-8", serviceType: "HVAC", estimatedValue: 15800, stage: "Estimate Scheduled", ownerId: "u-jerome", followUpDate: daysFromNow(1), notes: "On-site estimate scheduled for rooftop unit.", stageEnteredAt: daysFromNow(-2), createdAt: daysFromNow(-4), updatedAt: daysFromNow(-2) },
  { id: "opp-4", companyId: COMPANY_ID, customerId: "cust-4", serviceType: "Electrical", estimatedValue: 9300, stage: "Estimate Completed", ownerId: "u-elliot", followUpDate: daysFromNow(-1), notes: "Estimate sent, needs proposal follow-up.", stageEnteredAt: daysFromNow(-4), createdAt: daysFromNow(-8), updatedAt: daysFromNow(-1) },
  { id: "opp-5", companyId: COMPANY_ID, customerId: "cust-6", serviceType: "HVAC", estimatedValue: 28000, stage: "Proposal Sent", ownerId: "u-dana", followUpDate: daysFromNow(-2), notes: "Proposal sent for chiller replacement, awaiting decision.", stageEnteredAt: daysFromNow(-6), createdAt: daysFromNow(-12), updatedAt: daysFromNow(-2) },
  { id: "opp-6", companyId: COMPANY_ID, customerId: "cust-3", serviceType: "Plumbing", estimatedValue: 5400, stage: "Proposal Sent", ownerId: "u-alicia", followUpDate: daysFromNow(-5), notes: "HOA board reviewing proposal, slow response.", stageEnteredAt: daysFromNow(-9), createdAt: daysFromNow(-15), updatedAt: daysFromNow(-5) },
  { id: "opp-7", companyId: COMPANY_ID, customerId: "cust-1", serviceType: "HVAC", estimatedValue: 33000, stage: "Won", ownerId: "u-dana", followUpDate: daysFromNow(-10), notes: "Won — rooftop replacement at Harborview.", stageEnteredAt: daysFromNow(-3), createdAt: daysFromNow(-20), updatedAt: daysFromNow(-3) },
  { id: "opp-8", companyId: COMPANY_ID, customerId: "cust-5", serviceType: "Plumbing", estimatedValue: 4200, stage: "Lost", ownerId: "u-jerome", followUpDate: daysFromNow(-12), notes: "Customer went with another vendor.", stageEnteredAt: daysFromNow(-7), createdAt: daysFromNow(-18), updatedAt: daysFromNow(-7) },
];

export const jobs: Job[] = [
  { id: "job-1", companyId: COMPANY_ID, customerId: "cust-1", jobName: "Harborview Rooftop HVAC Replacement", serviceType: "HVAC", jobValue: 33000, jobManagerId: "u-dana", assignedCrewId: "crew-a", status: "In Progress", priority: "High", scheduledStartDate: daysFromNow(-5), scheduledEndDate: daysFromNow(-1), actualStartDate: daysFromNow(-5), actualEndDate: null, address: "412 Harbor Way, Tampa, FL", notes: "Behind schedule due to crane delay.", createdAt: daysFromNow(-15), updatedAt: daysFromNow(-1) },
  { id: "job-2", companyId: COMPANY_ID, customerId: "cust-2", jobName: "Sunridge Water Heater Install", serviceType: "Plumbing", jobValue: 4100, jobManagerId: "u-jerome", assignedCrewId: "crew-b", status: "Scheduled", priority: "Medium", scheduledStartDate: daysFromNow(3), scheduledEndDate: daysFromNow(4), actualStartDate: null, actualEndDate: null, address: "88 Sunridge Dr, Tampa, FL", notes: "", createdAt: daysFromNow(-3), updatedAt: daysFromNow(-1) },
  { id: "job-3", companyId: COMPANY_ID, customerId: "cust-3", jobName: "Maple Grove Clubhouse Plumbing Repair", serviceType: "Plumbing", jobValue: 18500, jobManagerId: "u-elliot", assignedCrewId: "crew-b", status: "Blocked", priority: "Critical", scheduledStartDate: daysFromNow(-8), scheduledEndDate: daysFromNow(-3), actualStartDate: daysFromNow(-8), actualEndDate: null, address: "20 Maple Grove Cir, Tampa, FL", notes: "Blocked — awaiting HOA approval on scope change.", createdAt: daysFromNow(-25), updatedAt: daysFromNow(-1) },
  { id: "job-4", companyId: COMPANY_ID, customerId: "cust-4", jobName: "Coastal Diner Electrical Panel Upgrade", serviceType: "Electrical", jobValue: 9300, jobManagerId: "u-dana", assignedCrewId: null, status: "Not Scheduled", priority: "Medium", scheduledStartDate: daysFromNow(6), scheduledEndDate: daysFromNow(7), actualStartDate: null, actualEndDate: null, address: "9 Coastal Hwy, Tampa, FL", notes: "Needs crew assignment.", createdAt: daysFromNow(-2), updatedAt: daysFromNow(-1) },
  { id: "job-5", companyId: COMPANY_ID, customerId: "cust-6", jobName: "Bayshore Medical Plaza Chiller Service", serviceType: "HVAC", jobValue: 28000, jobManagerId: "u-dana", assignedCrewId: "crew-a", status: "Waiting on Materials", priority: "High", scheduledStartDate: daysFromNow(-4), scheduledEndDate: daysFromNow(0), actualStartDate: daysFromNow(-4), actualEndDate: null, address: "300 Bayshore Blvd, Tampa, FL", notes: "Compressor part on backorder.", createdAt: daysFromNow(-14), updatedAt: daysFromNow(-1) },
  { id: "job-6", companyId: COMPANY_ID, customerId: "cust-8", jobName: "Lakeside Retail Rooftop Tune-Up", serviceType: "HVAC", jobValue: 7400, jobManagerId: "u-elliot", assignedCrewId: "crew-a", status: "Completed", priority: "Low", scheduledStartDate: daysFromNow(-10), scheduledEndDate: daysFromNow(-8), actualStartDate: daysFromNow(-10), actualEndDate: daysFromNow(-8), address: "120 Lakeside Pkwy, Tampa, FL", notes: "Complete, invoice not yet created.", createdAt: daysFromNow(-20), updatedAt: daysFromNow(-8) },
  { id: "job-7", companyId: COMPANY_ID, customerId: "cust-5", jobName: "Whitfield Residence Re-Pipe", serviceType: "Plumbing", jobValue: 8900, jobManagerId: "u-jerome", assignedCrewId: "crew-b", status: "Completed", priority: "Medium", scheduledStartDate: daysFromNow(-12), scheduledEndDate: daysFromNow(-9), actualStartDate: daysFromNow(-12), actualEndDate: daysFromNow(-9), address: "76 Whitfield Ln, Tampa, FL", notes: "Complete, invoice not yet created.", createdAt: daysFromNow(-22), updatedAt: daysFromNow(-9) },
  { id: "job-8", companyId: COMPANY_ID, customerId: "cust-1", jobName: "Harborview Common Area Plumbing Fix", serviceType: "Plumbing", jobValue: 5600, jobManagerId: "u-jerome", assignedCrewId: "crew-c", status: "In Progress", priority: "Medium", scheduledStartDate: daysFromNow(-2), scheduledEndDate: daysFromNow(2), actualStartDate: daysFromNow(-2), actualEndDate: null, address: "412 Harbor Way, Tampa, FL", notes: "", createdAt: daysFromNow(-9), updatedAt: daysFromNow(-1) },
  { id: "job-9", companyId: COMPANY_ID, customerId: "cust-3", jobName: "Maple Grove Pool House Electrical", serviceType: "Electrical", jobValue: 11200, jobManagerId: "u-dana", assignedCrewId: "crew-c", status: "Waiting on Customer", priority: "Medium", scheduledStartDate: daysFromNow(-6), scheduledEndDate: daysFromNow(-2), actualStartDate: daysFromNow(-6), actualEndDate: null, address: "20 Maple Grove Cir, Tampa, FL", notes: "Waiting on customer to approve fixture selection.", createdAt: daysFromNow(-16), updatedAt: daysFromNow(-2) },
  { id: "job-10", companyId: COMPANY_ID, customerId: "cust-6", jobName: "Bayshore Medical Roof Leak Repair", serviceType: "Roofing", jobValue: 14800, jobManagerId: "u-elliot", assignedCrewId: "crew-c", status: "Scheduled", priority: "High", scheduledStartDate: daysFromNow(2), scheduledEndDate: daysFromNow(5), actualStartDate: null, actualEndDate: null, address: "300 Bayshore Blvd, Tampa, FL", notes: "", createdAt: daysFromNow(-5), updatedAt: daysFromNow(-1) },
  { id: "job-11", companyId: COMPANY_ID, customerId: "cust-8", jobName: "Lakeside Landscaping Refresh", serviceType: "Landscaping", jobValue: 6200, jobManagerId: "u-jerome", assignedCrewId: "crew-c", status: "Scheduled", priority: "Low", scheduledStartDate: daysFromNow(5), scheduledEndDate: daysFromNow(6), actualStartDate: null, actualEndDate: null, address: "120 Lakeside Pkwy, Tampa, FL", notes: "", createdAt: daysFromNow(-4), updatedAt: daysFromNow(-1) },
  { id: "job-12", companyId: COMPANY_ID, customerId: "cust-2", jobName: "Sunridge Pest Control Treatment", serviceType: "Pest Control", jobValue: 1800, jobManagerId: "u-nina", assignedCrewId: "crew-c", status: "In Progress", priority: "Low", scheduledStartDate: daysFromNow(-1), scheduledEndDate: daysFromNow(1), actualStartDate: daysFromNow(-1), actualEndDate: null, address: "88 Sunridge Dr, Tampa, FL", notes: "", createdAt: daysFromNow(-3), updatedAt: daysFromNow(-1) },
  { id: "job-13", companyId: COMPANY_ID, customerId: "cust-4", jobName: "Coastal Diner HVAC Maintenance", serviceType: "HVAC", jobValue: 3200, jobManagerId: "u-dana", assignedCrewId: "crew-a", status: "In Progress", priority: "Medium", scheduledStartDate: daysFromNow(-3), scheduledEndDate: daysFromNow(-1), actualStartDate: daysFromNow(-3), actualEndDate: null, address: "9 Coastal Hwy, Tampa, FL", notes: "Running behind — technician shortage.", createdAt: daysFromNow(-10), updatedAt: daysFromNow(-1) },
  { id: "job-14", companyId: COMPANY_ID, customerId: "cust-3", jobName: "Maple Grove General Contracting Punch List", serviceType: "General Contracting", jobValue: 22000, jobManagerId: "u-elliot", assignedCrewId: "crew-c", status: "In Progress", priority: "High", scheduledStartDate: daysFromNow(-7), scheduledEndDate: daysFromNow(-2), actualStartDate: daysFromNow(-7), actualEndDate: null, address: "20 Maple Grove Cir, Tampa, FL", notes: "Behind schedule, multiple punch list items outstanding.", createdAt: daysFromNow(-30), updatedAt: daysFromNow(-2) },
];

export const jobStages: JobStage[] = [
  { id: "stage-1", jobId: "job-1", name: "Contract Signed", order: 1, status: "Complete" },
  { id: "stage-2", jobId: "job-1", name: "Deposit Received", order: 2, status: "Complete" },
  { id: "stage-3", jobId: "job-1", name: "Materials Ordered", order: 3, status: "Complete" },
  { id: "stage-4", jobId: "job-1", name: "Crew Assigned", order: 4, status: "Complete" },
  { id: "stage-5", jobId: "job-1", name: "In Progress", order: 5, status: "In Progress" },
  { id: "stage-6", jobId: "job-1", name: "Inspection", order: 6, status: "Pending" },
  { id: "stage-7", jobId: "job-1", name: "Customer Approval", order: 7, status: "Pending" },
  { id: "stage-8", jobId: "job-1", name: "Complete", order: 8, status: "Pending" },
];

export const tasks: Task[] = [
  { id: "task-1", companyId: COMPANY_ID, jobId: "job-1", customerId: "cust-1", assignedToId: "u-ray", name: "Confirm crane rental for rooftop unit", description: "Coordinate crane availability for replacement unit lift.", dueDate: daysFromNow(-1), priority: "High", status: "Overdue", createdAt: daysFromNow(-6), updatedAt: daysFromNow(-1) },
  { id: "task-2", companyId: COMPANY_ID, jobId: "job-3", customerId: "cust-3", assignedToId: "u-malik", name: "Get HOA sign-off on scope change", description: "Need written approval before continuing demo work.", dueDate: daysFromNow(-2), priority: "Critical", status: "Blocked", blockerNotes: "HOA board meeting delayed to next week.", createdAt: daysFromNow(-8), updatedAt: daysFromNow(-1) },
  { id: "task-3", companyId: COMPANY_ID, jobId: "job-5", customerId: "cust-6", assignedToId: "u-ray", name: "Track compressor part shipment", description: "Follow up with supplier on backordered part.", dueDate: daysFromNow(1), priority: "High", status: "Waiting", createdAt: daysFromNow(-4), updatedAt: daysFromNow(-1) },
  { id: "task-4", companyId: COMPANY_ID, jobId: "job-9", customerId: "cust-3", assignedToId: "u-dana", name: "Follow up with customer on fixture selection", description: "Customer has not responded to fixture options sent last week.", dueDate: daysFromNow(0), priority: "Medium", status: "Waiting", createdAt: daysFromNow(-5), updatedAt: daysFromNow(-1) },
  { id: "task-5", companyId: COMPANY_ID, jobId: "job-14", customerId: "cust-3", assignedToId: "u-elliot", name: "Close out remaining punch list items", description: "Three items remain on punch list, schedule final walkthrough.", dueDate: daysFromNow(-1), priority: "High", status: "In Progress", createdAt: daysFromNow(-9), updatedAt: daysFromNow(-1) },
];

export const invoices: Invoice[] = [
  { id: "inv-1", companyId: COMPANY_ID, customerId: "cust-1", jobId: "job-1", invoiceNumber: "INV-1042", amount: 33000, status: "Sent", dueDate: daysFromNow(10), sentDate: daysFromNow(-4), paidDate: null, createdAt: daysFromNow(-4), updatedAt: daysFromNow(-4) },
  { id: "inv-2", companyId: COMPANY_ID, customerId: "cust-3", jobId: "job-3", invoiceNumber: "INV-1038", amount: 18500, status: "Overdue", dueDate: daysFromNow(-12), sentDate: daysFromNow(-26), paidDate: null, createdAt: daysFromNow(-26), updatedAt: daysFromNow(-12) },
  { id: "inv-3", companyId: COMPANY_ID, customerId: "cust-6", jobId: "job-5", invoiceNumber: "INV-1044", amount: 28000, status: "Due Soon", dueDate: daysFromNow(3), sentDate: daysFromNow(-7), paidDate: null, createdAt: daysFromNow(-7), updatedAt: daysFromNow(-7) },
  { id: "inv-4", companyId: COMPANY_ID, customerId: "cust-4", jobId: "job-13", invoiceNumber: "INV-1031", amount: 3200, status: "Overdue", dueDate: daysFromNow(-20), sentDate: daysFromNow(-34), paidDate: null, createdAt: daysFromNow(-34), updatedAt: daysFromNow(-20) },
  { id: "inv-5", companyId: COMPANY_ID, customerId: "cust-2", jobId: "job-2", invoiceNumber: "INV-1020", amount: 4100, status: "Paid", dueDate: daysFromNow(-30), sentDate: daysFromNow(-40), paidDate: daysFromNow(-35), createdAt: daysFromNow(-40), updatedAt: daysFromNow(-35) },
  { id: "inv-6", companyId: COMPANY_ID, customerId: "cust-3", jobId: "job-14", invoiceNumber: "INV-1046", amount: 22000, status: "Overdue", dueDate: daysFromNow(-5), sentDate: daysFromNow(-19), paidDate: null, createdAt: daysFromNow(-19), updatedAt: daysFromNow(-5) },
  { id: "inv-7", companyId: COMPANY_ID, customerId: "cust-8", jobId: "job-6", invoiceNumber: "INV-1029", amount: 17400, status: "Paid", dueDate: daysFromNow(-45), sentDate: daysFromNow(-55), paidDate: daysFromNow(-48), createdAt: daysFromNow(-55), updatedAt: daysFromNow(-48) },
  { id: "inv-8", companyId: COMPANY_ID, customerId: "cust-5", jobId: "job-7", invoiceNumber: "INV-1019", amount: 8900, status: "Overdue", dueDate: daysFromNow(-8), sentDate: daysFromNow(-22), paidDate: null, createdAt: daysFromNow(-22), updatedAt: daysFromNow(-8) },
];

export const operationalRisks: OperationalRisk[] = [
  { id: "risk-1", companyId: COMPANY_ID, customerId: "cust-2", jobId: null, taskId: null, type: "Overdue Estimate Follow-Up", severity: "Medium", ownerId: "u-alicia", revenueAtRisk: 6200, delayLength: "3 days", notes: "Follow-up call never made after initial contact.", recommendedAction: "Call customer today to reschedule estimate.", status: "Open", createdAt: daysFromNow(-3), updatedAt: daysFromNow(-1) },
  { id: "risk-2", companyId: COMPANY_ID, customerId: "cust-3", jobId: "job-3", taskId: "task-2", type: "Blocked Job", severity: "Critical", ownerId: "u-malik", revenueAtRisk: 18500, delayLength: "5 days", notes: "Job blocked pending HOA approval on scope change.", recommendedAction: "Escalate to HOA board contact for urgent sign-off.", status: "Open", createdAt: daysFromNow(-5), updatedAt: daysFromNow(-1) },
  { id: "risk-3", companyId: COMPANY_ID, customerId: "cust-4", jobId: "job-4", taskId: null, type: "Missing Crew Assignment", severity: "Medium", ownerId: "u-dana", revenueAtRisk: 9300, delayLength: "2 days", notes: "Job scheduled to start in 6 days with no crew assigned.", recommendedAction: "Assign available crew before scheduled start date.", status: "Open", createdAt: daysFromNow(-2), updatedAt: daysFromNow(-1) },
  { id: "risk-4", companyId: COMPANY_ID, customerId: "cust-3", jobId: "job-14", taskId: null, type: "Overdue Invoice", severity: "High", ownerId: "u-nina", revenueAtRisk: 22000, delayLength: "5 days", notes: "Invoice 5 days past due with no payment activity.", recommendedAction: "Send overdue notice and escalate to office admin.", status: "Open", createdAt: daysFromNow(-5), updatedAt: daysFromNow(-1) },
  { id: "risk-5", companyId: COMPANY_ID, customerId: "cust-3", jobId: null, taskId: null, type: "Escalated Customer Issue", severity: "Critical", ownerId: "u-elliot", revenueAtRisk: 75200, delayLength: "6 days", notes: "Maple Grove HOA escalated due to multiple delays across active jobs.", recommendedAction: "Schedule executive check-in call with HOA board this week.", status: "Open", createdAt: daysFromNow(-6), updatedAt: daysFromNow(-1) },
  { id: "risk-6", companyId: COMPANY_ID, customerId: "cust-1", jobId: "job-1", taskId: "task-1", type: "Job Behind Schedule", severity: "High", ownerId: "u-ray", revenueAtRisk: 33000, delayLength: "4 days", notes: "Crane delay pushed rooftop install past scheduled end date.", recommendedAction: "Confirm new crane rental date and communicate to customer.", status: "Open", createdAt: daysFromNow(-4), updatedAt: daysFromNow(-1) },
  { id: "risk-7", companyId: COMPANY_ID, customerId: null, jobId: null, taskId: null, type: "Overloaded Crew", severity: "High", ownerId: "u-dana", revenueAtRisk: 0, delayLength: "Ongoing", notes: "Install Crew C carrying 7 active jobs with no crew lead.", recommendedAction: "Reassign jobs or backfill crew lead position.", status: "Open", createdAt: daysFromNow(-7), updatedAt: daysFromNow(-1) },
  { id: "risk-8", companyId: COMPANY_ID, customerId: "cust-8", jobId: "job-6", taskId: null, type: "Completed Not Billed", severity: "Medium", ownerId: "u-nina", revenueAtRisk: 7400, delayLength: "8 days", notes: "Job completed 8 days ago, no invoice created yet.", recommendedAction: "Create and send invoice immediately.", status: "Open", createdAt: daysFromNow(-8), updatedAt: daysFromNow(-1) },
];

export const sops: SOP[] = [
  { id: "sop-1", companyId: COMPANY_ID, title: "Lead Follow-Up Process", relatedArea: "Sales", processDescription: "Standard process for following up with new leads within 24 hours.", steps: ["Log lead in pipeline", "Call within 24 hours", "Schedule estimate if interested", "Update follow-up date"], ownerId: "u-alicia", status: "Active", lastUpdated: daysFromNow(-30) },
  { id: "sop-2", companyId: COMPANY_ID, title: "Estimate Scheduling", relatedArea: "Estimates", processDescription: "How to schedule and prepare for on-site estimates.", steps: ["Confirm customer availability", "Assign estimator", "Send confirmation", "Prepare pricing sheet"], ownerId: "u-jerome", status: "Active", lastUpdated: daysFromNow(-45) },
  { id: "sop-3", companyId: COMPANY_ID, title: "Job Scheduling", relatedArea: "Scheduling", processDescription: "Process for scheduling jobs once contracts are signed.", steps: ["Confirm deposit received", "Order materials", "Schedule crew", "Notify customer of dates"], ownerId: "u-dana", status: "Active", lastUpdated: daysFromNow(-20) },
  { id: "sop-4", companyId: COMPANY_ID, title: "Crew Assignment", relatedArea: "Scheduling", processDescription: "Guidelines for assigning crews based on specialty and capacity.", steps: ["Check crew capacity status", "Match specialty to job type", "Confirm crew availability", "Update job record"], ownerId: "u-dana", status: "Needs Review", lastUpdated: daysFromNow(-90) },
  { id: "sop-5", companyId: COMPANY_ID, title: "Job Completion Checklist", relatedArea: "Job Delivery", processDescription: "Final steps before marking a job complete.", steps: ["Final walkthrough", "Customer sign-off", "Photo documentation", "Mark job complete"], ownerId: "u-elliot", status: "Active", lastUpdated: daysFromNow(-15) },
  { id: "sop-6", companyId: COMPANY_ID, title: "Invoice Collection Process", relatedArea: "Invoicing", processDescription: "Steps for collecting on sent invoices, including escalation.", steps: ["Send invoice on completion", "Reminder at 7 days", "Reminder at 14 days", "Escalate at 21 days"], ownerId: "u-nina", status: "Active", lastUpdated: daysFromNow(-60) },
  { id: "sop-7", companyId: COMPANY_ID, title: "Customer Complaint Handling", relatedArea: "Customer Escalation", processDescription: "How to log, investigate, and resolve customer complaints.", steps: ["Log complaint", "Assign owner", "Investigate root cause", "Resolve and follow up"], ownerId: "u-elliot", status: "Active", lastUpdated: daysFromNow(-25) },
  { id: "sop-8", companyId: COMPANY_ID, title: "Review Request Process", relatedArea: "Reviews", processDescription: "Process for requesting reviews after job completion.", steps: ["Confirm customer satisfaction", "Send review request", "Follow up once", "Log review received"], ownerId: "u-alicia", status: "Draft", lastUpdated: daysFromNow(-5) },
];

export const automationRules: AutomationRule[] = [
  { id: "rule-1", companyId: COMPANY_ID, name: "Overdue Estimate Follow-Up", trigger: "Estimate follow-up date passes", condition: "Opportunity stage is not Won or Lost", action: "Create operational risk: Overdue Estimate Follow-Up", isActive: true },
  { id: "rule-2", companyId: COMPANY_ID, name: "Job Completed → Invoice Task", trigger: "Job marked completed", condition: "No invoice exists for job", action: "Create task: Create invoice", isActive: true },
  { id: "rule-3", companyId: COMPANY_ID, name: "Overdue Invoice Escalation", trigger: "Invoice overdue by 7 days", condition: "Invoice status is not Paid", action: "Escalate to office admin", isActive: true },
  { id: "rule-4", companyId: COMPANY_ID, name: "Crew Overload Detection", trigger: "Crew active jobs exceed 5", condition: "Crew capacity status is not already Overloaded", action: "Mark crew as Overloaded", isActive: true },
  { id: "rule-5", companyId: COMPANY_ID, name: "Customer Escalation Follow-Up", trigger: "Customer issue escalated", condition: "No follow-up task exists", action: "Create owner follow-up task", isActive: false },
  { id: "rule-6", companyId: COMPANY_ID, name: "Blocked Job Risk", trigger: "Task marked Blocked", condition: "Related job is active", action: "Create operational risk: Blocked Job", isActive: true },
];

export const activityFeed: ActivityEvent[] = [
  { id: "act-1", companyId: COMPANY_ID, message: "Estimate follow-up for Sunridge Family Trust marked overdue", timestamp: daysFromNow(-1), category: "sales" },
  { id: "act-2", companyId: COMPANY_ID, message: "Harborview Rooftop HVAC Replacement moved to In Progress", timestamp: daysFromNow(-1), category: "job" },
  { id: "act-3", companyId: COMPANY_ID, message: "Invoice INV-1020 marked paid for Sunridge Family Trust", timestamp: daysFromNow(-2), category: "invoice" },
  { id: "act-4", companyId: COMPANY_ID, message: "Maple Grove HOA escalated due to multiple delays", timestamp: daysFromNow(-3), category: "customer" },
  { id: "act-5", companyId: COMPANY_ID, message: "Install Crew C flagged as Overloaded", timestamp: daysFromNow(-4), category: "crew" },
  { id: "act-6", companyId: COMPANY_ID, message: "Operational risk created: Blocked Job at Maple Grove Clubhouse", timestamp: daysFromNow(-5), category: "risk" },
  { id: "act-7", companyId: COMPANY_ID, message: "New SOP drafted: Review Request Process", timestamp: daysFromNow(-5), category: "sop" },
  { id: "act-8", companyId: COMPANY_ID, message: "Automation rule \"Customer Escalation Follow-Up\" disabled", timestamp: daysFromNow(-6), category: "automation" },
];
