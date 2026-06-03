'use client';

import Breadcrumbs from "@/components/BreadCrumbs";
import Panel from "@/components/provisioning/Panel";
import RequestTable from "@/components/provisioning/RequestTable";
import SectionIntro from "@/components/provisioning/SectionIntro";
import { provisioningRequests } from "@/lib/provisioning-data";

export default function TablePage() {
  const items = [{ label: "Provisioning Queue", href: "/table", current: true }];

  return (
    <div className="space-y-6 pb-10">
      <Breadcrumbs items={items as any} />

      <SectionIntro
        eyebrow="Queue Monitoring"
        title="Request table yang responsif untuk desktop, tablet, dan mobile"
        description="Table ini mengutamakan informasi kritikal yang disebut di PRD: Request ID, Status, Assignee, SLA Status, dan Last Updated. Pada layar kecil, data otomatis berubah menjadi card layout agar tidak bergantung pada horizontal scrolling."
      />

      <Panel
        title="Provisioning Requests"
        description="Data operasional terbaru dari request submission sampai completion tracking."
      >
        <RequestTable requests={provisioningRequests} />
      </Panel>
    </div>
  );
}
