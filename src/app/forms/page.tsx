'use client';

import Breadcrumbs from "@/components/BreadCrumbs";
import Button from "@/components/Button";
import Checkbox from "@/components/HooksForm/CheckBox";
import DatePicker from "@/components/HooksForm/Datepicker";
import Form from "@/components/HooksForm/Form";
import Input from "@/components/HooksForm/Input";
import SelectField from "@/components/HooksForm/Select";
import Panel from "@/components/provisioning/Panel";
import RequestTable from "@/components/provisioning/RequestTable";
import SectionIntro from "@/components/provisioning/SectionIntro";
import {
  provisioningRequests,
  requestFormDefaults,
  workflowStages,
} from "@/lib/provisioning-data";

const departmentOptions = [
  { label: "Engineering", value: "Engineering" },
  { label: "Finance", value: "Finance" },
  { label: "Customer Ops", value: "Customer Ops" },
  { label: "HR", value: "HR" },
  { label: "Sales", value: "Sales" },
];

const categoryOptions = [
  { label: "Cloud Access", value: "Cloud Access" },
  { label: "VPN Bundle", value: "VPN Bundle" },
  { label: "Role Access", value: "Role Access" },
  { label: "Laptop Setup", value: "Laptop Setup" },
  { label: "Email Provisioning", value: "Email Provisioning" },
];

const priorityOptions = [
  { label: "Critical", value: "Critical" },
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const channelOptions = [
  { label: "Email", value: "Email" },
  { label: "Microsoft Teams", value: "Microsoft Teams" },
  { label: "Slack", value: "Slack" },
  { label: "Telegram", value: "Telegram" },
];

type RequestFormValue = typeof requestFormDefaults;

export default function FormsPage() {
  const items = [{ label: "Request Management", href: "/forms", current: true }];

  const handleSubmit = (values: RequestFormValue) => {
    console.log("Provisioning request created", values);
  };

  return (
    <div className="space-y-6 pb-10">
      <Breadcrumbs items={items as any} />

      <SectionIntro
        eyebrow="Request Management"
        title="Create, assign, update, dan eskalasi provisioning request"
        description="Halaman ini mensimulasikan modul Provisioning Request Management dari PRD: create request, metadata workflow, assignment, status movement, dan monitoring queue yang siap ditindaklanjuti."
      />

      <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
        <Panel
          title="Create Provisioning Request"
          description="Form submission dengan field inti yang dibutuhkan oleh provisioning team."
        >
          <Form onSubmit={handleSubmit} defaultValues={requestFormDefaults}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Requester Name
                </label>
                <Input
                  className="rounded-2xl border border-slate-200 px-3 py-3 text-slate-700"
                  placeholder="Input requester name"
                  name="requester"
                  validation={["required"]}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Department</label>
                <SelectField
                  options={departmentOptions}
                  name="department"
                  validation={["required"]}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Request Category
                </label>
                <SelectField
                  options={categoryOptions}
                  name="category"
                  validation={["required"]}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Priority</label>
                <SelectField
                  options={priorityOptions}
                  name="priority"
                  validation={["required"]}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Target Completion
                </label>
                <DatePicker
                  name="targetDate"
                  minDate={new Date()}
                  placeholderText="Select target date"
                  validation={["required"]}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Notification Channel
                </label>
                <SelectField
                  options={channelOptions}
                  name="channel"
                  validation={["required"]}
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Implementation Notes
                </label>
                <Input
                  className="rounded-2xl border border-slate-200 px-3 py-3 text-slate-700"
                  placeholder="Describe provisioning scope, dependency, or approver note"
                  name="notes"
                  validation={["required"]}
                />
              </div>
              <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <Checkbox
                  size="sm"
                  name="requiresApproval"
                  label="Requires approval workflow"
                  variant="switch"
                  description="Aktifkan approval ketika provisioning menyentuh resource sensitif atau akses kritikal."
                  info="Approval akan men-trigger monitoring stage dan SLA approval."
                  className="py-1"
                />
              </div>
              <div className="md:col-span-2 flex flex-wrap justify-end gap-3">
                <Button type="button" variant="ghost" className="min-h-11 rounded-2xl px-5">
                  Save Draft
                </Button>
                <Button type="submit" variant="primary" className="min-h-11 rounded-2xl px-5">
                  Submit Request
                </Button>
              </div>
            </div>
          </Form>
        </Panel>

        <Panel
          title="Workflow Stages"
          description="Status workflow utama sesuai requirement PRD."
        >
          <div className="space-y-3">
            {[
              "New",
              "Submitted",
              "Waiting Approval",
              "Approved",
              "In Progress",
              "Provisioned",
              "Completed",
              "Rejected",
              "Cancelled",
            ].map((status, index) => (
              <div key={status} className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{status}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {status === "Waiting Approval"
                      ? "Menahan request pada approval gate sebelum provisioning dimulai."
                      : status === "In Progress"
                        ? "Request sedang dikerjakan oleh assignee aktif."
                        : status === "Provisioned"
                          ? "Implementasi selesai dan menunggu validasi completion."
                          : "State operasional yang tercatat di workflow monitoring."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.9fr]">
        <Panel
          title="Open Queue Snapshot"
          description="Daftar request aktif yang paling relevan untuk tim provisioning."
        >
          <RequestTable requests={provisioningRequests.slice(0, 4)} />
        </Panel>

        <Panel
          title="Operational Checklist"
          description="Panduan ringkas untuk proses assignment dan escalation."
        >
          <div className="space-y-3">
            {workflowStages.slice(0, 4).map((item) => (
              <div key={item.stage} className="rounded-2xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">{item.stage}</p>
                <p className="mt-1 text-sm text-slate-500">{item.owner}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-400">
                  Average wait {item.averageWait}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
