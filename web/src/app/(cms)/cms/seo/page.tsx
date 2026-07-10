"use client";

import { useState } from "react";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";
import { AiSuggestButton } from "../_components/ai-suggest-button";
import { SaveDraftButton } from "../_components/mock-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { demoSite } from "@/lib/mock/data";

export default function SeoPage() {
  const [title, setTitle] = useState(demoSite.seoTitle ?? "");
  const [description, setDescription] = useState(
    demoSite.seoDescription ?? "",
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Thông tin hiển thị trên Google"
        description="Tiêu đề và mô tả mặc định khi khách tìm thấy website trên Google hoặc chia sẻ mạng xã hội."
        actions={<SaveDraftButton label="Lưu thông tin" />}
      />

      <SectionCard title="Thông tin mặc định của website">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="seoTitle">Tiêu đề (tối đa 70 ký tự)</Label>
              <AiSuggestButton
                label="Gợi ý SEO"
                suggestion="Sen Spa | Chăm sóc da & thư giãn tại Quận 3"
                onApply={setTitle}
              />
            </div>
            <Input
              id="seoTitle"
              className="h-10"
              value={title}
              maxLength={70}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-xs text-slate-500">{title.length}/70</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoDesc">Mô tả (tối đa 160 ký tự)</Label>
            <Textarea
              id="seoDesc"
              rows={4}
              maxLength={160}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-xs text-slate-500">{description.length}/160</p>
          </div>
          <div className="space-y-2">
            <Label>Ảnh chia sẻ (Open Graph)</Label>
            <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
              Chọn ảnh OG (mock)
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Xem trước trên Google">
        <div className="rounded-xl border border-slate-100 bg-white p-4">
          <p className="text-sm text-emerald-800">
            https://sen-spa.yourdomain.vn
          </p>
          <p className="mt-1 text-lg text-blue-700">
            {title || "Tiêu đề website"}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {description || "Mô tả website sẽ hiển thị tại đây."}
          </p>
        </div>
      </SectionCard>
    </div>
  );
}
