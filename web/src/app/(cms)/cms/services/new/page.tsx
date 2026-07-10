import { PageHeader } from "../../_components/page-header";
import { SectionCard } from "../../_components/section-card";
import { ServiceForm } from "../../_components/service-form";

export default function NewServicePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Thêm dịch vụ"
        description="Nhập thông tin dịch vụ. Bạn có thể dùng AI để gợi ý mô tả."
      />
      <SectionCard>
        <ServiceForm mode="create" />
      </SectionCard>
    </div>
  );
}
