import Link from "next/link";
import {
  Building2,
  Globe2,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "./_components/page-header";
import { SectionCard } from "./_components/section-card";
import { StatCard } from "./_components/stat-card";
import {
  PlanBadge,
  SiteStatusBadge,
  TenantStatusBadge,
} from "./_components/status-badge";
import { Button } from "@/components/ui/button";
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
import {
  getAdminStats,
  getAllLeads,
  getOwnerByTenantId,
  getSiteByTenantId,
} from "@/lib/mock/selectors";

export default function AdminDashboardPage() {
  const stats = getAdminStats();
  const recentTenants = [...tenants]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);
  const recentLeads = getAllLeads().slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tổng quan"
        description="Theo dõi số lượng khách hàng, website đã công khai và khách để lại liên hệ mới."
        actions={
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            render={<Link href="/admin/tenants/new" />}
          >
            Tạo khách hàng mới
          </Button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Tổng khách hàng"
          value={stats.totalTenants}
          note={`${stats.trialTenants} đang dùng thử`}
          icon={<Building2 className="size-5" />}
        />
        <StatCard
          label="Website đã công khai"
          value={stats.publishedSites}
          note="Đang hiển thị công khai"
          icon={<Globe2 className="size-5" />}
        />
        <StatCard
          label="Liên hệ mới"
          value={stats.newLeads}
          note="Cần xử lý sớm"
          icon={<MessageSquareText className="size-5" />}
        />
        <StatCard
          label="Cần hỗ trợ"
          value={1}
          note="Website tạm ngưng / quá hạn"
          icon={<Sparkles className="size-5" />}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Khách hàng gần đây"
          description="Các đơn vị mới được tạo trên nền tảng."
          actions={
            <Button variant="outline" size="sm" render={<Link href="/admin/tenants" />}>
              Xem tất cả
            </Button>
          }
          contentClassName="p-0"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Gói</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Website</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTenants.map((tenant) => {
                const site = getSiteByTenantId(tenant.id);
                return (
                  <TableRow key={tenant.id}>
                    <TableCell>
                      <Link
                        href={`/admin/tenants/${tenant.id}`}
                        className="font-medium text-slate-900 hover:text-teal-700"
                      >
                        {tenant.name}
                      </Link>
                      <p className="text-xs text-slate-500">{tenant.slug}</p>
                    </TableCell>
                    <TableCell>
                      <PlanBadge plan={tenant.plan} />
                    </TableCell>
                    <TableCell>
                      <TenantStatusBadge status={tenant.status} />
                    </TableCell>
                    <TableCell>
                      {site ? <SiteStatusBadge status={site.status} /> : "—"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard
          title="Liên hệ mới"
          description="Khách truy cập để lại thông tin gần đây."
          actions={
            <Button variant="outline" size="sm" render={<Link href="/admin/leads" />}>
              Xem tất cả
            </Button>
          }
          contentClassName="p-0"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Họ tên</TableHead>
                <TableHead>Đơn vị</TableHead>
                <TableHead>Thời gian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLeads.map((lead) => {
                const tenant = tenants.find((t) => t.id === lead.tenantId);
                return (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <p className="font-medium text-slate-900">{lead.fullName}</p>
                      <p className="text-xs text-slate-500">{lead.phone}</p>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {tenant?.name ?? "—"}
                    </TableCell>
                    <TableCell className="text-slate-500">
                      {formatDateTime(lead.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </SectionCard>
      </div>

      <SectionCard
        title="Website cần hỗ trợ"
        description="Các website đang tạm ngưng hoặc chưa công khai lâu."
      >
        <div className="space-y-3">
          {tenants
            .filter((t) => t.status === "suspended" || t.status === "trial")
            .map((tenant) => {
              const owner = getOwnerByTenantId(tenant.id);
              const site = getSiteByTenantId(tenant.id);
              return (
                <div
                  key={tenant.id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-slate-900">{tenant.name}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {owner?.email} · {site ? site.businessName : "Chưa có website"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TenantStatusBadge status={tenant.status} />
                    <Button
                      size="sm"
                      variant="outline"
                      render={<Link href={`/admin/tenants/${tenant.id}`} />}
                    >
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
      </SectionCard>
    </div>
  );
}
