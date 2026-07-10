"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AiSuggestButton } from "./ai-suggest-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Service } from "@/types/domain";

interface ServiceFormProps {
  mode: "create" | "edit";
  initial?: Service;
}

export function ServiceForm({ mode, initial }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(initial?.name ?? "");
  const [shortDescription, setShortDescription] = useState(
    initial?.shortDescription ?? "",
  );
  const [longDescription, setLongDescription] = useState(
    initial?.longDescription ?? "",
  );
  const [priceType, setPriceType] = useState(initial?.priceType ?? "fixed");
  const [featured, setFeatured] = useState(initial?.isFeatured ?? false);
  const [status, setStatus] = useState(initial?.status ?? "active");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Vui lòng nhập tên dịch vụ.");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      toast.success(
        mode === "create"
          ? "Đã tạo dịch vụ (mock UI)."
          : "Đã cập nhật dịch vụ (mock UI).",
      );
      router.push("/cms/services");
    }, 450);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Tên dịch vụ *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10"
            placeholder="Chăm sóc da cơ bản"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="short">Mô tả ngắn</Label>
            <AiSuggestButton
              suggestion="Làm sạch sâu, cấp ẩm và thư giãn trong 60 phút, phù hợp da thường và da khô."
              onApply={setShortDescription}
            />
          </div>
          <Textarea
            id="short"
            rows={3}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="long">Mô tả chi tiết</Label>
            <AiSuggestButton
              label="Gợi ý mô tả dài"
              suggestion="Liệu trình bao gồm tẩy trang, làm sạch, tẩy tế bào chết nhẹ, đắp mặt nạ và massage cổ vai gáy. Kỹ thuật viên sẽ tư vấn sản phẩm phù hợp sau buổi làm."
              onApply={setLongDescription}
            />
          </div>
          <Textarea
            id="long"
            rows={5}
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceType">Kiểu giá</Label>
          <select
            id="priceType"
            value={priceType}
            onChange={(e) =>
              setPriceType(e.target.value as Service["priceType"])
            }
            className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm"
          >
            <option value="fixed">Giá cố định</option>
            <option value="from">Từ giá</option>
            <option value="range">Khoảng giá</option>
            <option value="contact">Liên hệ</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Thời lượng</Label>
          <Input
            id="duration"
            defaultValue={initial?.duration ?? ""}
            placeholder="60 phút"
            className="h-10"
          />
        </div>
        {priceType !== "contact" ? (
          <div className="space-y-2">
            <Label htmlFor="priceMin">Giá từ / giá cố định</Label>
            <Input
              id="priceMin"
              type="number"
              defaultValue={initial?.priceMin ?? ""}
              className="h-10"
            />
          </div>
        ) : null}
        {priceType === "range" ? (
          <div className="space-y-2">
            <Label htmlFor="priceMax">Giá đến</Label>
            <Input
              id="priceMax"
              type="number"
              defaultValue={initial?.priceMax ?? ""}
              className="h-10"
            />
          </div>
        ) : null}
        <div className="space-y-2">
          <Label htmlFor="status">Trạng thái</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Service["status"])}
            className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm"
          >
            <option value="active">Đang hiện</option>
            <option value="inactive">Đang ẩn</option>
            <option value="archived">Đã lưu trữ</option>
          </select>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-slate-900">Dịch vụ nổi bật</p>
            <p className="text-xs text-slate-500">
              Ưu tiên hiển thị trên trang chủ
            </p>
          </div>
          <Switch checked={featured} onCheckedChange={setFeatured} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label>Ảnh dịch vụ</Label>
          <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
            Chọn ảnh từ thư viện hoặc upload (mock)
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-5">
        <Button variant="outline" render={<Link href="/cms/services" />}>
          Hủy
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-teal-600 hover:bg-teal-700"
        >
          {loading
            ? "Đang lưu..."
            : mode === "create"
              ? "Tạo dịch vụ"
              : "Lưu thay đổi"}
        </Button>
      </div>
    </form>
  );
}
