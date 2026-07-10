import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ExternalLink,
  Globe2,
  KeyRound,
  PauseCircle,
  PlayCircle,
} from "lucide-react";
import { PageHeader } from "../../_components/page-header";
import { SectionCard } from "../../_components/section-card";
import {
  LeadStatusBadge,
  PlanBadge,
  SiteStatusBadge,
  TenantStatusBadge,
} from "../../_components/status-badge";
import { MockSubmitButton } from "../../_components/mock-actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatDateTime } from "@/lib/format";
import { auditLogs } from "@/lib/mock/data";
import {
  getDomainsBySiteId,
  getLeadsByTenantId,
  getOwnerByTenantId,
  getPublicUrl,
  getSiteByTenantId,
  getTenantById,
} from "@/lib/mock/selectors";

export default async function TenantDetailPage({
  params,
}: {
  params: Promise<{ tenantId: string }>;
}) {
  const { tenantId } = await params;
  const tenant = getTenantById(tenantId);
  if (!tenant) notFound();

  const owner = getOwnerByTenantId(tenant.id);
  const site = getSiteByTenantId(tenant.id);
  const domains = site ? getDomainsBySiteId(site.id) : [];
  const recentLeads = getLeadsByTenantId(tenant.id).slice(0, 5);
  const logs = auditLogs.filter((l) => l.tenantId === tenant.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={tenant.name}
        description={`${tenant.industry} · ${tenant.slug}.yourdomain.vn`}
        actions={
          <>
            <Button variant="outline" render={<Link href="/admin/tenants" />}>
              Quay lại danh sách
            </Button>
            {site ? (
              <Button
                variant="outline"
                render={
                  <Link href={getPublicUrl(site.id)} target="_blank" />
                }
              >
                <ExternalLink className="size-4" />
                Mở website
              </Button>
            ) : null}
            <Button
              className="bg-teal-600 hover:bg-teal-700"
              render={<Link href="/cms" />}
            >
              Mở CMS hỗ trợ
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard title="Thông tin khách hàng" className="lg:col-span-2">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-500">Tên đơn vị</dt>
              <dd className="mt-1 font-medium text-slate-900">{tenant.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Ngành nghề</dt>
              <dd className="mt-1 font-medium text-slate-900">
                {tenant.industry}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Trạng thái</dt>
              <dd className="mt-1">
                <TenantStatusBadge status={tenant.status} />
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Gói thuê bao</dt>
              <dd className="mt-1">
                <PlanBadge plan={tenant.plan} />
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Ngày tạo</dt>
              <dd className="mt-1 text-slate-900">
                {formatDate(tenant.createdAt)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Cập nhật</dt>
              <dd className="mt-1 text-slate-900">
                {formatDate(tenant.updatedAt)}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-slate-500">Ghi chú nội bộ</dt>
              <dd className="mt-1 text-slate-700">{tenant.note || "—"}</dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="Thao tác nhanh">
          <div className="space-y-2">
            <MockSubmitButton
              message="Đã tạm ngưng khách hàng (mock UI)."
              variant="outline"
              className="w-full justify-start"
            >
              <PauseCircle className="size-4" />
              Tạm ngưng khách hàng
            </MockSubmitButton>
            <MockSubmitButton
              message="Đã kích hoạt lại khách hàng (mock UI)."
              variant="outline"
              className="w-full justify-start"
            >
              <PlayCircle className="size-4" />
              Kích hoạt lại
            </MockSubmitButton>
            <MockSubmitButton
              message="Mật khẩu tạm: Temp@123456 (mock UI)."
              variant="outline"
              className="w-full justify-start"
            >
              <KeyRound className="size-4" />
              Đặt lại mật khẩu chủ website
            </MockSubmitButton>
            {site ? (
              <Button
                variant="outline"
                className="w-full justify-start"
                render={
                  <Link href={`/admin/tenants/${tenant.id}/domains`} />
                }
              >
                <Globe2 className="size-4" />
                Quản lý domain
              </Button>
            ) : null}
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Tài khoản chủ website">
          {owner ? (
            <dl className="grid gap-3">
              <div>
                <dt className="text-xs text-slate-500">Họ tên</dt>
                <dd className="mt-1 font-medium">{owner.fullName}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Email</dt>
                <dd className="mt-1">{owner.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Số điện thoại</dt>
                <dd className="mt-1">{owner.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Đăng nhập gần nhất</dt>
                <dd className="mt-1">{formatDateTime(owner.lastLoginAt)}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-slate-500">Chưa có tài khoản owner.</p>
          )}
        </SectionCard>

        <SectionCard title="Thông tin website">
          {site ? (
            <dl className="grid gap-3">
              <div>
                <dt className="text-xs text-slate-500">Tên hiển thị</dt>
                <dd className="mt-1 font-medium">{site.businessName}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Trạng thái website</dt>
                <dd className="mt-1">
                  <SiteStatusBadge status={site.status} />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">URL chính</dt>
                <dd className="mt-1 text-teal-700">{getPublicUrl(site.id)}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Công khai lần cuối</dt>
                <dd className="mt-1">
                  {formatDateTime(site.lastPublishedAt)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-slate-500">Chưa có website.</p>
          )}
        </SectionCard>
      </div>

      <SectionCard
        title="Domain"
        description="Subdomain mặc định và custom domain cấu hình thủ công."
        actions={
          <Button
            size="sm"
            variant="outline"
            render={<Link href={`/admin/tenants/${tenant.id}/domains`} />}
          >
            Quản lý
          </Button>
        }
      >
        <div className="space-y-2">
          {domains.map((domain) => (
            <div
              key={domain.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
            >
              <div>
                <p className="font-medium text-slate-900">{domain.domain}</p>
                <p className="text-xs text-slate-500">
                  {domain.type === "subdomain" ? "Subdomain" : "Custom domain"}
                  {domain.isPrimary ? " · Primary" : ""}
                </p>
              </div>
              <span className="text-xs font-medium text-slate-600 capitalize">
                {domain.status}
              </span>
            </div>
          ))}
          {domains.length === 0 ? (
            <p className="text-sm text-slate-500">Chưa có domain.</p>
          ) : null}
        </div>
      </SectionCard>

      <SectionCard title="Liên hệ gần đây" contentClassName="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Họ tên</TableHead>
              <TableHead>Điện thoại</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thời gian</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.fullName}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>
                  <LeadStatusBadge status={lead.status} />
                </TableCell>
                <TableCell>{formatDateTime(lead.createdAt)}</TableCell>
              </TableRow>
            ))}
            {recentLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-slate-500">
                  Chưa có liên hệ nào.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </SectionCard>

      <SectionCard title="Nhật ký thao tác">
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col gap-1 rounded-xl border border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">{log.action}</p>
                <p className="text-xs text-slate-500">
                  {log.entityType} · bởi {log.actorName}
                </p>
              </div>
              <p className="text-xs text-slate-500">
                {formatDateTime(log.createdAt)}
              </p>
            </div>
          ))}
          {logs.length === 0 ? (
            <p className="text-sm text-slate-500">Chưa có nhật ký.</p>
          ) : null}
        </div>
      </SectionCard>
    </div>
  );
}
