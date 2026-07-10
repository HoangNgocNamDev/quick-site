"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";
import { LeadStatusBadge } from "../_components/status-badge";
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
import { tenants } from "@/lib/mock/data";
import { getAllLeads, getServiceById } from "@/lib/mock/selectors";

export default function AdminLeadsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [tenantId, setTenantId] = useState("all");

  const leads = useMemo(() => getAllLeads(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchQuery =
        !q ||
        lead.fullName.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        (lead.email ?? "").toLowerCase().includes(q);
      const matchStatus = status === "all" || lead.status === status;
      const matchTenant = tenantId === "all" || lead.tenantId === tenantId;
      return matchQuery && matchStatus && matchTenant;
    });
  }, [leads, query, status, tenantId]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Khách để lại liên hệ"
        description="Xem toàn bộ form liên hệ từ mọi website trên nền tảng."
      />

      <SectionCard contentClassName="space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="relative md:col-span-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm tên, SĐT, email..."
              className="h-10 pl-9"
            />
          </div>
          <select
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm"
          >
            <option value="all">Tất cả khách hàng</option>
            {tenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.name}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm"
          >
            <option value="all">Tất cả trạng thái</option>
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
                <TableHead>Đơn vị</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Nhu cầu</TableHead>
                <TableHead>Dịch vụ quan tâm</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thời gian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => {
                const tenant = tenants.find((t) => t.id === lead.tenantId);
                const service = lead.interestedServiceId
                  ? getServiceById(lead.interestedServiceId)
                  : null;
                return (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium text-slate-900">
                      {lead.fullName}
                    </TableCell>
                    <TableCell>{tenant?.name ?? "—"}</TableCell>
                    <TableCell>
                      <p>{lead.phone}</p>
                      <p className="text-xs text-slate-500">
                        {lead.email || "Không có email"}
                      </p>
                    </TableCell>
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
                  </TableRow>
                );
              })}
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-10 text-center text-slate-500"
                  >
                    Không có liên hệ phù hợp.
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
