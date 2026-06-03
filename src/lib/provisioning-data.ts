import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BellRing,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Layers3,
  ShieldAlert,
  TimerReset,
} from "lucide-react";

export type RequestStatus =
  | "New"
  | "Submitted"
  | "Waiting Approval"
  | "Approved"
  | "In Progress"
  | "Provisioned"
  | "Completed"
  | "Rejected"
  | "Cancelled";

export type SlaHealth = "On Track" | "At Risk" | "Breached";

export type ProvisioningRequest = {
  id: string;
  requester: string;
  department: string;
  category: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: RequestStatus;
  assignee: string;
  workflowStage: string;
  waitingHours: number;
  processingHours: number;
  slaHealth: SlaHealth;
  lastUpdated: string;
  targetCompletion: string;
};

export type KpiMetric = {
  title: string;
  value: string;
  trend: string;
  direction: "up" | "down";
  helper: string;
  tone: "teal" | "amber" | "red" | "blue";
};

export const dashboardKpis: KpiMetric[] = [
  {
    title: "Total Requests",
    value: "1,284",
    trend: "+14%",
    direction: "up",
    helper: "Monthly incoming workload",
    tone: "blue",
  },
  {
    title: "Open Requests",
    value: "186",
    trend: "-9%",
    direction: "up",
    helper: "Need active follow-up",
    tone: "teal",
  },
  {
    title: "Delayed Requests",
    value: "23",
    trend: "+5",
    direction: "down",
    helper: "SLA breached or at-risk",
    tone: "red",
  },
  {
    title: "SLA Achievement",
    value: "93.8%",
    trend: "+2.1%",
    direction: "up",
    helper: "Within target completion time",
    tone: "amber",
  },
];

export const requestStatusSummary = [
  { name: "New", value: 42 },
  { name: "Waiting Approval", value: 36 },
  { name: "In Progress", value: 88 },
  { name: "Provisioned", value: 24 },
  { name: "Completed", value: 112 },
];

export const throughputSeries = [
  { label: "Mon", requests: 48, completed: 39 },
  { label: "Tue", requests: 56, completed: 42 },
  { label: "Wed", requests: 61, completed: 53 },
  { label: "Thu", requests: 58, completed: 51 },
  { label: "Fri", requests: 66, completed: 57 },
  { label: "Sat", requests: 32, completed: 28 },
  { label: "Sun", requests: 20, completed: 18 },
];

export const monthlyTrend = [
  { label: "Jan", requests: 302, approvals: 281, sla: 91 },
  { label: "Feb", requests: 328, approvals: 301, sla: 92 },
  { label: "Mar", requests: 349, approvals: 326, sla: 93 },
  { label: "Apr", requests: 371, approvals: 348, sla: 94 },
  { label: "May", requests: 389, approvals: 360, sla: 95 },
  { label: "Jun", requests: 411, approvals: 388, sla: 94 },
];

export const workloadDistribution = [
  { team: "Provisioning Core", open: 34, inProgress: 21, completed: 86 },
  { team: "Infra Support", open: 21, inProgress: 17, completed: 65 },
  { team: "Security Review", open: 14, inProgress: 12, completed: 49 },
  { team: "Network Ops", open: 18, inProgress: 10, completed: 42 },
];

export const departmentTrend = [
  { name: "Engineering", value: 27 },
  { name: "Customer Ops", value: 21 },
  { name: "Finance", value: 16 },
  { name: "HR", value: 14 },
  { name: "Sales", value: 22 },
];

export const teamPerformance = [
  {
    team: "Provisioning Core",
    requestsHandled: 186,
    avgResolution: "8.4h",
    productivity: 94,
    utilization: 82,
  },
  {
    team: "Infra Support",
    requestsHandled: 138,
    avgResolution: "11.1h",
    productivity: 88,
    utilization: 74,
  },
  {
    team: "Security Review",
    requestsHandled: 97,
    avgResolution: "13.6h",
    productivity: 84,
    utilization: 68,
  },
  {
    team: "Network Ops",
    requestsHandled: 105,
    avgResolution: "9.8h",
    productivity: 90,
    utilization: 79,
  },
];

export const reportQueue = [
  { title: "Daily Operations Report", status: "Ready", generatedAt: "08:30 WIB" },
  { title: "Weekly Operations Report", status: "Scheduled", generatedAt: "Friday 18:00 WIB" },
  { title: "Monthly Provisioning Report", status: "In Review", generatedAt: "03 Jun 2026" },
  { title: "Team Performance Report", status: "Ready", generatedAt: "03 Jun 2026" },
];

export const notificationAlerts: Array<{
  title: string;
  detail: string;
  severity: "critical" | "warning" | "info";
  channel: string;
}> = [
  {
    title: "SLA breach on Finance VPN bundle",
    detail: "Approval stalled for 11 hours and exceeded approval SLA.",
    severity: "critical",
    channel: "Microsoft Teams",
  },
  {
    title: "High pending requests in Security Review",
    detail: "14 requests waiting longer than 4 hours.",
    severity: "warning",
    channel: "Slack",
  },
  {
    title: "Telegram digest delivered",
    detail: "Daily operational digest sent to provisioning leaders.",
    severity: "info",
    channel: "Telegram",
  },
];

export const workflowStages = [
  { stage: "Submitted", count: 52, averageWait: "1.2h", owner: "Request Desk" },
  { stage: "Waiting Approval", count: 36, averageWait: "4.5h", owner: "Department Head" },
  { stage: "Approved", count: 18, averageWait: "0.8h", owner: "Provisioning Core" },
  { stage: "In Progress", count: 88, averageWait: "6.4h", owner: "Assigned Engineer" },
  { stage: "Provisioned", count: 24, averageWait: "1.1h", owner: "Validation Team" },
];

export const provisioningRequests: ProvisioningRequest[] = [
  {
    id: "PRV-240601",
    requester: "Nadia Putri",
    department: "Engineering",
    category: "Cloud Access",
    priority: "High",
    status: "In Progress",
    assignee: "Raka Satria",
    workflowStage: "Provisioning",
    waitingHours: 2,
    processingHours: 9,
    slaHealth: "On Track",
    lastUpdated: "03 Jun 2026 09:12",
    targetCompletion: "03 Jun 2026 16:00",
  },
  {
    id: "PRV-240602",
    requester: "Dimas Pratama",
    department: "Finance",
    category: "VPN Bundle",
    priority: "Critical",
    status: "Waiting Approval",
    assignee: "Sinta Maharani",
    workflowStage: "Dept Approval",
    waitingHours: 11,
    processingHours: 3,
    slaHealth: "Breached",
    lastUpdated: "03 Jun 2026 08:03",
    targetCompletion: "03 Jun 2026 10:00",
  },
  {
    id: "PRV-240603",
    requester: "Aulia Ramadhan",
    department: "HR",
    category: "Laptop Setup",
    priority: "Medium",
    status: "Approved",
    assignee: "Fikri Ahmad",
    workflowStage: "Queue Allocation",
    waitingHours: 1,
    processingHours: 2,
    slaHealth: "On Track",
    lastUpdated: "03 Jun 2026 09:28",
    targetCompletion: "03 Jun 2026 15:00",
  },
  {
    id: "PRV-240604",
    requester: "Kevin Gunawan",
    department: "Sales",
    category: "Email Provisioning",
    priority: "Low",
    status: "Completed",
    assignee: "Meylisa Putri",
    workflowStage: "Closed",
    waitingHours: 0,
    processingHours: 4,
    slaHealth: "On Track",
    lastUpdated: "03 Jun 2026 07:51",
    targetCompletion: "03 Jun 2026 09:00",
  },
  {
    id: "PRV-240605",
    requester: "Rahmat Hidayat",
    department: "Customer Ops",
    category: "Role Access",
    priority: "High",
    status: "Submitted",
    assignee: "Desk Queue",
    workflowStage: "Validation",
    waitingHours: 5,
    processingHours: 1,
    slaHealth: "At Risk",
    lastUpdated: "03 Jun 2026 09:04",
    targetCompletion: "03 Jun 2026 13:00",
  },
  {
    id: "PRV-240606",
    requester: "Farah Nabila",
    department: "Engineering",
    category: "Database Access",
    priority: "Critical",
    status: "Provisioned",
    assignee: "Raka Satria",
    workflowStage: "QA Validation",
    waitingHours: 1,
    processingHours: 12,
    slaHealth: "At Risk",
    lastUpdated: "03 Jun 2026 09:41",
    targetCompletion: "03 Jun 2026 11:00",
  },
];

export const dashboardHighlights: Array<{
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    title: "Daily Throughput",
    value: "57 completed",
    description: "Best daily completion in the last 2 weeks.",
    icon: Layers3,
  },
  {
    title: "Average Approval SLA",
    value: "3.6h",
    description: "Still below the 4-hour target threshold.",
    icon: TimerReset,
  },
  {
    title: "Escalated Requests",
    value: "7 active",
    description: "Mostly driven by cross-team approvals.",
    icon: ShieldAlert,
  },
  {
    title: "Success Rate",
    value: "98.2%",
    description: "Provisioning completed without rework.",
    icon: CheckCircle2,
  },
];

export const reportCards: Array<{
  title: string;
  description: string;
  owner: string;
  cadence: string;
}> = [
  {
    title: "Daily Operations Report",
    description: "Summarizes open queue, escalations, and day-end throughput.",
    owner: "Operations Team",
    cadence: "Daily",
  },
  {
    title: "Weekly Provisioning Review",
    description: "Tracks trend shifts, SLA risks, and bottlenecks by department.",
    owner: "Provisioning Lead",
    cadence: "Weekly",
  },
  {
    title: "Monthly SLA Report",
    description: "Presents achievement, breach counts, and recovery plan updates.",
    owner: "Management",
    cadence: "Monthly",
  },
];

export const quickActions = [
  "Create request",
  "Assign request",
  "Escalate blocker",
  "Generate SLA report",
];

export const requestFormDefaults = {
  requester: "",
  department: "",
  category: "",
  priority: "Medium",
  targetDate: "",
  channel: "Email",
  requiresApproval: true,
  notes: "",
};

export const alertSummary = [
  { label: "SLA Breach", count: 6, icon: AlertTriangle },
  { label: "Stuck Workflow", count: 4, icon: Clock3 },
  { label: "High Pending", count: 12, icon: BriefcaseBusiness },
  { label: "Escalations", count: 7, icon: BellRing },
];
