import { notFound } from "next/navigation";
import { PageHeader } from "../../../_components/page-header";
import { SectionCard } from "../../../_components/section-card";
import { ServiceForm } from "../../../_components/service-form";
import { getServiceById } from "@/lib/mock/selectors";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;
  const service = getServiceById(serviceId);
  if (!service) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Sửa dịch vụ"
        description={service.name}
      />
      <SectionCard>
        <ServiceForm mode="edit" initial={service} />
      </SectionCard>
    </div>
  );
}
