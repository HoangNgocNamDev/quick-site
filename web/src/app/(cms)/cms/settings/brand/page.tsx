"use client";

import { useState } from "react";
import { PageHeader } from "../../_components/page-header";
import { SectionCard } from "../../_components/section-card";
import { AiSuggestButton } from "../../_components/ai-suggest-button";
import { SaveDraftButton } from "../../_components/mock-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { demoSite } from "@/lib/mock/data";

export default function BrandSettingsPage() {
  const [description, setDescription] = useState(
    demoSite.shortDescription ?? "",
  );
  const [slogan, setSlogan] = useState(demoSite.slogan ?? "");
  const [primaryColor, setPrimaryColor] = useState(demoSite.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(demoSite.secondaryColor);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Thương hiệu"
        description="Thông tin này hiển thị trên logo, màu nút và phần giới thiệu website."
        actions={<SaveDraftButton />}
      />

      <SectionCard title="Thông tin cơ bản">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Tên doanh nghiệp *</Label>
            <Input
              id="businessName"
              defaultValue={demoSite.businessName}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industry">Ngành nghề</Label>
            <Input
              id="industry"
              defaultValue={demoSite.industry}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="slogan">Slogan</Label>
              <AiSuggestButton
                suggestion="Chăm sóc da chuyên sâu – thư giãn đúng nghĩa tại Quận 3"
                onApply={setSlogan}
              />
            </div>
            <Input
              id="slogan"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="description">Mô tả ngắn</Label>
              <AiSuggestButton
                label="Gợi ý mô tả"
                suggestion="Sen Spa mang đến liệu trình chăm sóc da cá nhân hóa, không gian yên tĩnh và đội ngũ kỹ thuật viên giàu kinh nghiệm tại Quận 3, TP.HCM."
                onApply={setDescription}
              />
            </div>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Logo & màu thương hiệu"
        description="Không cần viết CSS. Chỉ chọn màu và tải ảnh."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
              Kéo thả hoặc chọn ảnh (mock)
            </div>
          </div>
          <div className="space-y-2">
            <Label>Favicon</Label>
            <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
              Ảnh vuông nhỏ (mock)
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Màu chính</Label>
            <div className="flex items-center gap-3">
              <input
                id="primaryColor"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="size-10 cursor-pointer rounded-lg border border-slate-200"
              />
              <Input
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Màu phụ</Label>
            <div className="flex items-center gap-3">
              <input
                id="secondaryColor"
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="size-10 cursor-pointer rounded-lg border border-slate-200"
              />
              <Input
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </div>
        <div
          className="mt-5 rounded-2xl p-5 text-white"
          style={{ backgroundColor: primaryColor }}
        >
          <p className="text-sm opacity-90">Xem nhanh màu nút</p>
          <p className="mt-2 text-lg font-semibold">{demoSite.businessName}</p>
          <button
            type="button"
            className="mt-4 rounded-xl px-4 py-2 text-sm font-medium"
            style={{ backgroundColor: secondaryColor, color: primaryColor }}
          >
            Đặt lịch ngay
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
