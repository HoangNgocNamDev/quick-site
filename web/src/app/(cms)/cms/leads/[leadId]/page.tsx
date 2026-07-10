"use client";

import Link from "next/link";
import { use, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "../../_components/page-header";
import { SectionCard } from "../../_components/section-card";
import { LeadStatusBadge } from "../../_components/status-badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatDateTime } from "@/lib/format";
import {
  getLeadById,
  getServiceById,
} from "@/lib/mock/selectors";
import type { LeadStatus } from "@/types/domain";

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = use(params);
  const lead = getLeadById(leadId);
  const [status, setStatus] = useState<LeadStatus>(lead?.status ?? "new");
  const [note, setNote] = useState(lead?.internalNote ?? "");

  if (!lead) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <PageHeader title="Không tìm thấy liên hệ" />
      </div>
    );
  }

  const service = lead.interestedServiceId
    ? getServiceById(lead.interestedServiceId)
    : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={lead.fullName}
        description={`Gửi lúc ${formatDateTime(lead.createdAt)}`}
        actions={
          <Button variant="outline" render={<Link href="/cms/leads" />}>
            Quay lại danh sách
          </Button>
        }
      />

      <SectionCard title="Thông tin liên hệ">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-slate-500">Họ tên</dt>
            <dd className="mt-1 font-medium">{lead.fullName}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Số điện thoại</dt>
            <dd className="mt-1">
              <a href={`tel:${lead.phone}`} className="text-teal-700 hover:underline">
                {lead.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Email</dt>
            <dd className="mt-1">{lead.email || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Dịch vụ quan tâm</dt>
            <dd className="mt-1">{service?.name || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Trang gửi</dt>
            <dd className="mt-1">{lead.sourcePage || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Trạng thái hiện tại</dt>
            <dd className="mt-1">
              <LeadStatusBadge status={status} />
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs text-slate-500">Nội dung</dt>
            <dd className="mt-1 rounded-xl bg-slate-50 p-4 text-slate-700">
              {lead.message}
            </dd>
          </div>
        </dl>
      </SectionCard>

      <SectionCard title="Cập nhật xử lý">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lead-status">Trạng thái</Label>
            <select
              id="lead-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus)}
              className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm"
            >
              <option value="new">Mới</option>
              <option value="contacted">Đã liên hệ</option>
              <option value="won">Thành công</option>
              <option value="lost">Không chốt</option>
              <option value="spam">Spam</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-note">Ghi chú nội bộ</Label>
            <Textarea
              id="lead-note"
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ví dụ: Đã gọi, hẹn đến soi da thứ 6..."
            />
          </div>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => toast.success("Đã cập nhật liên hệ (mock UI).")}
          >
            Lưu thay đổi
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}
