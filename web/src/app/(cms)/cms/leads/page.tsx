"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";
import { LeadStatusBadge } from "../_components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/format";
import { demoSite } from "@/lib/mock/data";
import { getLeadsBySiteId, getServiceById } from "@/lib/mock/selectors";

export default function CmsLeadsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const leads = useMemo(() => getLeadsBySiteId(demoSite.id), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchQuery =
        !q ||
        lead.fullName.toLowerCase().includes(q) ||
        lead.phone.includes(q);
      const matchStatus = status === "all" || lead.status === status;
      return matchQuery && matchStatus;
    });
  }, [leads, query, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Khách để lại liên hệ"
        description="Danh sách khách gửi form từ website của bạn."
      />

      <SectionCard contentClassName="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc số điện thoại..."
              className="h-10 pl-9"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm sm:w-48"
          >
            <option value="all">Tất cả</option>
            <option value="new">Mới</option>
            <option value="contacted">Đã liên hệ</option>
            <option value="won">Thành công</option>
            <option value="lost">Không chốt</option>
            <option value="spam">Spam</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-100">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Họ tên</TableHead>
                <TableHead>Điện thoại</TableHead>
                <TableHead>Nội dung</TableHead>
                <TableHead>Dịch vụ quan tâm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => {
                const service = lead.interestedServiceId
                  ? getServiceById(lead.interestedServiceId)
                  : null;
                return (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.fullName}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell className="max-w-[220px] truncate text-slate-600">
                      {lead.message}
                    </TableCell>
                    <TableCell>{service?.name ?? "—"}</TableCell>
                    <TableCell>
                      <LeadStatusBadge status={lead.status} />
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {formatDateTime(lead.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        render={<Link href={`/cms/leads/${lead.id}`} />}
                      >
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-10 text-center text-slate-500"
                  >
                    Chưa có liên hệ phù hợp.
                  </TableCell>
                </TableRow>
              ) : null}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </div>
  );
}
