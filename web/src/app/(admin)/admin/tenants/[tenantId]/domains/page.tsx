"use client";

import Link from "next/link";
import { use } from "react";
import { PageHeader } from "../../../_components/page-header";
import { SectionCard } from "../../../_components/section-card";
import { MockSubmitButton } from "../../../_components/mock-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getDomainsBySiteId,
  getSiteByTenantId,
  getTenantById,
} from "@/lib/mock/selectors";

export default function TenantDomainsPage({
  params,
}: {
  params: Promise<{ tenantId: string }>;
}) {
  const { tenantId } = use(params);
  const tenant = getTenantById(tenantId);
  const site = tenant ? getSiteByTenantId(tenant.id) : undefined;
  const domains = site ? getDomainsBySiteId(site.id) : [];

  if (!tenant || !site) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <PageHeader title="Không tìm thấy khách hàng" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quản lý domain"
        description={`Domain của ${tenant.name}`}
        actions={
          <Button
            variant="outline"
            render={<Link href={`/admin/tenants/${tenant.id}`} />}
          >
            Quay lại chi tiết
          </Button>
        }
      />

      <SectionCard title="Domain hiện có">
        <div className="space-y-3">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">{domain.domain}</p>
                <p className="text-xs text-slate-500">
                  {domain.type === "subdomain" ? "Subdomain" : "Custom domain"} ·{" "}
                  {domain.status}
                  {domain.isPrimary ? " · Primary" : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <MockSubmitButton
                  message="Đã đặt làm domain chính (mock UI)."
                  variant="outline"
                >
                  Đặt primary
                </MockSubmitButton>
                <MockSubmitButton
                  message="Đã đánh dấu domain active (mock UI)."
                  variant="outline"
                >
                  Đánh dấu active
                </MockSubmitButton>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Thêm custom domain"
        description="MVP: Platform Admin cấu hình DNS thủ công, hệ thống chỉ lưu domain và trạng thái."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="domain">Tên domain</Label>
            <Input
              id="domain"
              placeholder="example.com"
              className="h-10"
              defaultValue=""
            />
          </div>
          <MockSubmitButton
            message="Đã thêm custom domain ở trạng thái pending (mock UI)."
            className="bg-teal-600 hover:bg-teal-700"
          >
            Thêm domain
          </MockSubmitButton>
        </div>
      </SectionCard>
    </div>
  );
}
