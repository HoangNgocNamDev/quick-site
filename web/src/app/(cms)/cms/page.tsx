import Link from "next/link";
import {
  Eye,
  Globe2,
  ImageIcon,
  MessageSquareText,
  Rocket,
  Wrench,
} from "lucide-react";
import { PageHeader } from "./_components/page-header";
import { SectionCard } from "./_components/section-card";
import { StatCard } from "./_components/stat-card";
import {
  LeadStatusBadge,
  SiteStatusBadge,
} from "./_components/status-badge";
import {
  PublishButton,
  SaveDraftButton,
} from "./_components/mock-actions";
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
import { demoSite } from "@/lib/mock/data";
import {
  getCmsStats,
  getLeadsBySiteId,
  getPublicUrl,
} from "@/lib/mock/selectors";

const quickActions = [
  {
    href: "/cms/pages/home",
    title: "Sửa trang chủ",
    description: "Chỉnh banner, giới thiệu, FAQ...",
    icon: Rocket,
  },
  {
    href: "/cms/services",
    title: "Quản lý dịch vụ",
    description: "Thêm/sửa danh sách dịch vụ",
    icon: Wrench,
  },
  {
    href: "/cms/gallery",
    title: "Hình ảnh",
    description: "Upload và chọn ảnh hiển thị",
    icon: ImageIcon,
  },
  {
    href: "/cms/leads",
    title: "Xem liên hệ",
    description: "Khách để lại số điện thoại",
    icon: MessageSquareText,
  },
];

export default function CmsDashboardPage() {
  const site = demoSite;
  const stats = getCmsStats(site.id);
  const recentLeads = getLeadsBySiteId(site.id).slice(0, 5);
  const publicUrl = getPublicUrl(site.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tổng quan website"
        description="Theo dõi trạng thái website và các việc nên làm tiếp theo."
        actions={
          <>
            <Button variant="outline" render={<Link href="/cms/preview" />}>
              <Eye className="size-4" />
              Xem trước
            </Button>
            <PublishButton />
          </>
        }
      />

      <SectionCard className="overflow-hidden">
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-10 size-40 rounded-full bg-teal-100/50 blur-3xl"
          />
          <div className="relative space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                {site.businessName}
              </h2>
              <SiteStatusBadge status={site.status} />
            </div>
            <p className="text-sm text-slate-500">{site.slogan}</p>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="grid size-7 place-items-center rounded-lg bg-teal-50 text-teal-700 ring-1 ring-teal-100">
                <Globe2 className="size-3.5" />
              </span>
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                {publicUrl}
              </a>
            </div>
            <p className="text-xs text-slate-500">
              Công khai lần cuối: {formatDateTime(site.lastPublishedAt)}
            </p>
          </div>
          <div className="relative flex flex-wrap gap-2">
            <SaveDraftButton />
            <Button
              variant="outline"
              render={<Link href="/cms/settings/brand" />}
            >
              Chỉnh thương hiệu
            </Button>
          </div>
        </div>
      </SectionCard>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Liên hệ mới"
          value={stats.newLeads}
          note="Cần gọi lại sớm"
          icon={<MessageSquareText className="size-5" />}
        />
        <StatCard
          label="Tổng liên hệ"
          value={stats.totalLeads}
          note="Từ form trên website"
          icon={<MessageSquareText className="size-5" />}
        />
        <StatCard
          label="Dịch vụ đang hiện"
          value={stats.services}
          note="Hiển thị trên website"
          icon={<Wrench className="size-5" />}
        />
        <StatCard
          label="Ảnh đã upload"
          value={stats.images}
          note="Trong thư viện"
          icon={<ImageIcon className="size-5" />}
        />
      </section>

      <SectionCard
        title="Việc nên làm tiếp"
        description="Các lối tắt giúp bạn cập nhật website nhanh."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-[0_8px_20px_rgba(13,148,136,0.08)]"
            >
              <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 text-teal-700 ring-1 ring-teal-100/80 transition group-hover:from-teal-100 group-hover:to-cyan-50">
                <item.icon className="size-5" />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-900">
                {item.title}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="Khách để lại liên hệ gần đây"
        actions={
          <Button variant="outline" size="sm" render={<Link href="/cms/leads" />}>
            Xem tất cả
          </Button>
        }
        contentClassName="p-0"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Họ tên</TableHead>
              <TableHead>Điện thoại</TableHead>
              <TableHead>Nội dung</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thời gian</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.fullName}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell className="max-w-[240px] truncate text-slate-600">
                  {lead.message}
                </TableCell>
                <TableCell>
                  <LeadStatusBadge status={lead.status} />
                </TableCell>
                <TableCell className="text-slate-500">
                  {formatDateTime(lead.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
