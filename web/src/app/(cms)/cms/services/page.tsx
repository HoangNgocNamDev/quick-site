import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";
import { ContentStatusBadge } from "../_components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPriceDisplay } from "@/lib/format";
import { demoSite } from "@/lib/mock/data";
import { getServicesBySiteId } from "@/lib/mock/selectors";

export default function ServicesPage() {
  const items = getServicesBySiteId(demoSite.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dịch vụ"
        description="Quản lý danh sách dịch vụ hiển thị trên website."
        actions={
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            render={<Link href="/cms/services/new" />}
          >
            <Plus className="size-4" />
            Thêm dịch vụ
          </Button>
        }
      />

      <SectionCard contentClassName="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên dịch vụ</TableHead>
              <TableHead>Mô tả ngắn</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Nổi bật</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium text-slate-900">
                  {service.name}
                </TableCell>
                <TableCell className="max-w-[260px] truncate text-slate-600">
                  {service.shortDescription}
                </TableCell>
                <TableCell>
                  {formatPriceDisplay(
                    service.priceType,
                    service.priceMin,
                    service.priceMax,
                  )}
                </TableCell>
                <TableCell>{service.isFeatured ? "Có" : "Không"}</TableCell>
                <TableCell>
                  <ContentStatusBadge status={service.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    render={
                      <Link href={`/cms/services/${service.id}/edit`} />
                    }
                  >
                    Sửa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
