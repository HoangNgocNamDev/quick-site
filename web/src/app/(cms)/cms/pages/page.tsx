import Link from "next/link";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";
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
import { getPagesBySiteId } from "@/lib/mock/selectors";

export default function PagesListPage() {
  const pages = getPagesBySiteId(demoSite.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trang website"
        description="MVP chỉ chỉnh các trang có sẵn, không tạo trang mới."
      />

      <SectionCard contentClassName="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên trang</TableHead>
              <TableHead>Đường dẫn</TableHead>
              <TableHead>Tiêu đề Google</TableHead>
              <TableHead>Cập nhật</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell className="text-slate-500">/{page.slug}</TableCell>
                <TableCell className="max-w-[240px] truncate text-slate-600">
                  {page.seoTitle || "—"}
                </TableCell>
                <TableCell className="text-slate-500">
                  {formatDateTime(page.updatedAt)}
                </TableCell>
                <TableCell className="text-right">
                  {page.pageType === "home" ? (
                    <Button
                      size="sm"
                      className="bg-teal-600 hover:bg-teal-700"
                      render={<Link href="/cms/pages/home" />}
                    >
                      Chỉnh nội dung
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      render={<Link href="/cms/seo" />}
                    >
                      Chỉnh SEO
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
