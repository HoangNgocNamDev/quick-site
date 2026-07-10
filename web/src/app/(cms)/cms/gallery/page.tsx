"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";
import { MockSubmitButton } from "../_components/mock-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { demoSite } from "@/lib/mock/data";
import { getMediaBySiteId } from "@/lib/mock/selectors";

export default function GalleryPage() {
  const [items, setItems] = useState(() =>
    getMediaBySiteId(demoSite.id).filter((m) => m.status !== "archived"),
  );

  function togglePublic(id: string, value: boolean) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isInPublicGallery: value } : item,
      ),
    );
    toast.success(
      value
        ? "Đã chọn ảnh hiển thị trên website (mock UI)."
        : "Đã ẩn ảnh khỏi gallery public (mock UI).",
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hình ảnh"
        description="Upload ảnh, thêm chú thích và chọn ảnh hiển thị trên website."
      />

      <SectionCard
        title="Upload ảnh"
        description="MVP mock: chọn file chỉ để demo, không upload thật."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="file">Chọn ảnh (jpg, png, webp · tối đa 5MB)</Label>
            <Input id="file" type="file" accept="image/*" className="h-10" />
          </div>
          <MockSubmitButton
            message="Đã thêm ảnh vào thư viện (mock UI)."
            className="bg-teal-600 hover:bg-teal-700"
          >
            Upload
          </MockSubmitButton>
        </div>
      </SectionCard>

      <SectionCard title="Thư viện ảnh">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={item.publicUrl}
                  alt={item.altText || item.originalFilename}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="space-y-3 p-4">
                <div className="space-y-2">
                  <Label>Chú thích</Label>
                  <Input
                    defaultValue={item.caption ?? ""}
                    className="h-9"
                    onBlur={() =>
                      toast.success("Đã lưu chú thích (mock UI).")
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Alt text</Label>
                  <Input
                    defaultValue={item.altText ?? ""}
                    className="h-9"
                    onBlur={() => toast.success("Đã lưu alt text (mock UI).")}
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="text-sm text-slate-700">Hiện trên website</span>
                  <Switch
                    checked={item.isInPublicGallery}
                    onCheckedChange={(checked) =>
                      togglePublic(item.id, Boolean(checked))
                    }
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    toast.success("Đã lưu trữ ảnh (mock UI).")
                  }
                >
                  Lưu trữ ảnh
                </Button>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
