"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";
import { ContentStatusBadge } from "../_components/status-badge";
import { MockSubmitButton } from "../_components/mock-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { getPricesBySiteId } from "@/lib/mock/selectors";

export default function PricesPage() {
  const items = useMemo(() => getPricesBySiteId(demoSite.id), []);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bảng giá"
        description="Các mức giá hiển thị trên website. Có thể hiện 'Liên hệ' nếu chưa chốt giá."
        actions={
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => setShowForm((v) => !v)}
          >
            <Plus className="size-4" />
            {showForm ? "Đóng form" : "Thêm mục giá"}
          </Button>
        }
      />

      {showForm ? (
        <SectionCard title="Thêm mục giá">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="price-name">Tên mục</Label>
              <Input
                id="price-name"
                className="h-10"
                placeholder="Massage body"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price-type">Kiểu giá</Label>
              <select
                id="price-type"
                defaultValue="fixed"
                className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm"
              >
                <option value="fixed">Giá cố định</option>
                <option value="from">Từ giá</option>
                <option value="range">Khoảng giá</option>
                <option value="contact">Liên hệ</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price-unit">Đơn vị</Label>
              <Input
                id="price-unit"
                className="h-10"
                placeholder="buổi / lần / gói"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price-min">Giá min</Label>
              <Input id="price-min" type="number" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price-max">Giá max</Label>
              <Input id="price-max" type="number" className="h-10" />
            </div>
          </div>
          <div className="mt-4">
            <MockSubmitButton
              message="Đã thêm mục giá (mock UI)."
              className="bg-teal-600 hover:bg-teal-700"
            >
              Lưu mục giá
            </MockSubmitButton>
          </div>
        </SectionCard>
      ) : null}

      <SectionCard contentClassName="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Đơn vị</TableHead>
              <TableHead>Nổi bật</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-slate-600">
                  {item.description || "—"}
                </TableCell>
                <TableCell>
                  {formatPriceDisplay(
                    item.priceType,
                    item.priceMin,
                    item.priceMax,
                  )}
                </TableCell>
                <TableCell>{item.unit || "—"}</TableCell>
                <TableCell>{item.isFeatured ? "Có" : "Không"}</TableCell>
                <TableCell>
                  <ContentStatusBadge status={item.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.success("Đã mở form sửa (mock UI).")}
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
