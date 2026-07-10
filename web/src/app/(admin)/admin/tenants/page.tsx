"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";
import {
  PlanBadge,
  SiteStatusBadge,
  TenantStatusBadge,
} from "../_components/status-badge";
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
import { formatDate } from "@/lib/format";
import { tenants } from "@/lib/mock/data";
import {
  getOwnerByTenantId,
  getSiteByTenantId,
} from "@/lib/mock/selectors";
import type { TenantStatus } from "@/types/domain";

export default function TenantsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return tenants.filter((tenant) => {
      const owner = getOwnerByTenantId(tenant.id);
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        tenant.name.toLowerCase().includes(q) ||
        tenant.slug.toLowerCase().includes(q) ||
        (owner?.email ?? "").toLowerCase().includes(q);
      const matchStatus = status === "all" || tenant.status === status;
      return matchQuery && matchStatus;
    });
  }, [query, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Khách hàng"
        description="Danh sách đơn vị thuê website trên nền tảng."
        actions={
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            render={<Link href="/admin/tenants/new" />}
          >
            <Plus className="size-4" />
            Tạo khách hàng
          </Button>
        }
      />

      <SectionCard contentClassName="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm theo tên khách hàng hoặc email..."
              className="h-10 pl-9"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm sm:w-48"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="trial">Dùng thử</option>
            <option value="suspended">Tạm ngưng</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-100">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngành</TableHead>
                <TableHead>Email chủ website</TableHead>
                <TableHead>Gói</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((tenant) => {
                const owner = getOwnerByTenantId(tenant.id);
                const site = getSiteByTenantId(tenant.id);
                return (
                  <TableRow key={tenant.id}>
                    <TableCell>
                      <p className="font-medium text-slate-900">{tenant.name}</p>
                      <p className="text-xs text-slate-500">{tenant.slug}</p>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {tenant.industry}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {owner?.email ?? "—"}
                    </TableCell>
                    <TableCell>
                      <PlanBadge plan={tenant.plan} />
                    </TableCell>
                    <TableCell>
                      <TenantStatusBadge status={tenant.status as TenantStatus} />
                    </TableCell>
                    <TableCell>
                      {site ? (
                        <SiteStatusBadge status={site.status} />
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {formatDate(tenant.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        render={<Link href={`/admin/tenants/${tenant.id}`} />}
                      >
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center text-slate-500">
                    Không tìm thấy khách hàng phù hợp.
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
