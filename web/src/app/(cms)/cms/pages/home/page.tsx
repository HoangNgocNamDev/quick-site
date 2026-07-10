"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "../../_components/page-header";
import { SectionCard } from "../../_components/section-card";
import {
  PublishButton,
  SaveDraftButton,
} from "../../_components/mock-actions";
import { AiSuggestButton } from "../../_components/ai-suggest-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { blockTypeLabel } from "@/lib/format";
import { demoSite } from "@/lib/mock/data";
import { getBlocksBySiteId } from "@/lib/mock/selectors";
import type { SiteBlock } from "@/types/domain";

export default function HomepageEditorPage() {
  const initialBlocks = useMemo(() => getBlocksBySiteId(demoSite.id), []);
  const [items, setItems] = useState<SiteBlock[]>(initialBlocks);
  const [selectedId, setSelectedId] = useState(initialBlocks[0]?.id ?? "");

  const selected = items.find((b) => b.id === selectedId) ?? items[0];

  function updateSelectedData(key: string, value: string) {
    if (!selected) return;
    setItems((prev) =>
      prev.map((block) =>
        block.id === selected.id
          ? { ...block, data: { ...block.data, [key]: value } }
          : block,
      ),
    );
  }

  function toggleVisible(id: string, value: boolean) {
    setItems((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, isVisible: value } : block,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Chỉnh trang chủ"
        description="Bật/tắt từng phần và sửa nội dung. Không kéo-thả layout tự do trong MVP."
        actions={
          <>
            <Button variant="outline" render={<Link href="/cms/preview" />}>
              Xem trước
            </Button>
            <SaveDraftButton />
            <PublishButton />
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <SectionCard title="Các phần trên trang chủ" contentClassName="space-y-2">
          {items.map((block) => {
            const active = block.id === selected?.id;
            return (
              <button
                key={block.id}
                type="button"
                onClick={() => setSelectedId(block.id)}
                className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                  active
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-100 bg-white hover:border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {blockTypeLabel[block.blockType] ?? block.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {block.isVisible ? "Đang hiện" : "Đang ẩn"}
                    </p>
                  </div>
                  <Switch
                    checked={block.isVisible}
                    onCheckedChange={(checked) =>
                      toggleVisible(block.id, Boolean(checked))
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </button>
            );
          })}
        </SectionCard>

        <SectionCard
          title={
            selected
              ? blockTypeLabel[selected.blockType] ?? selected.title
              : "Chọn một phần để chỉnh"
          }
          description="Nội dung lưu dạng bản nháp. Nhấn Công khai website để đưa lên trang thật."
        >
          {selected ? (
            <div className="space-y-4">
              {selected.blockType === "hero" ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <Label>Tiêu đề banner</Label>
                      <AiSuggestButton
                        suggestion="Sen Spa – chăm sóc da chuyên sâu cho làn da khỏe đẹp"
                        onApply={(value) => updateSelectedData("title", value)}
                      />
                    </div>
                    <Input
                      className="h-10"
                      value={String(selected.data.title ?? "")}
                      onChange={(e) =>
                        updateSelectedData("title", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Mô tả phụ</Label>
                    <Textarea
                      rows={4}
                      value={String(selected.data.subtitle ?? "")}
                      onChange={(e) =>
                        updateSelectedData("subtitle", e.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Nút chính</Label>
                      <Input
                        className="h-10"
                        value={String(selected.data.primaryButtonText ?? "")}
                        onChange={(e) =>
                          updateSelectedData(
                            "primaryButtonText",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Nút phụ</Label>
                      <Input
                        className="h-10"
                        value={String(selected.data.secondaryButtonText ?? "")}
                        onChange={(e) =>
                          updateSelectedData(
                            "secondaryButtonText",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Nhãn nổi bật</Label>
                    <Input
                      className="h-10"
                      value={String(selected.data.badgeText ?? "")}
                      onChange={(e) =>
                        updateSelectedData("badgeText", e.target.value)
                      }
                    />
                  </div>
                </>
              ) : null}

              {selected.blockType === "about" ? (
                <>
                  <div className="space-y-2">
                    <Label>Tiêu đề mục</Label>
                    <Input
                      className="h-10"
                      value={String(selected.data.sectionTitle ?? "")}
                      onChange={(e) =>
                        updateSelectedData("sectionTitle", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <Label>Nội dung giới thiệu</Label>
                      <AiSuggestButton
                        suggestion="Sen Spa đồng hành cùng bạn xây dựng lộ trình chăm sóc da rõ ràng, an toàn và phù hợp ngân sách."
                        onApply={(value) =>
                          updateSelectedData("description", value)
                        }
                      />
                    </div>
                    <Textarea
                      rows={6}
                      value={String(selected.data.description ?? "")}
                      onChange={(e) =>
                        updateSelectedData("description", e.target.value)
                      }
                    />
                  </div>
                </>
              ) : null}

              {selected.blockType !== "hero" &&
              selected.blockType !== "about" ? (
                <>
                  <div className="space-y-2">
                    <Label>Tiêu đề phần</Label>
                    <Input
                      className="h-10"
                      value={String(
                        selected.data.sectionTitle ??
                          selected.data.title ??
                          selected.title,
                      )}
                      onChange={(e) => {
                        if ("sectionTitle" in selected.data) {
                          updateSelectedData("sectionTitle", e.target.value);
                        } else {
                          updateSelectedData("title", e.target.value);
                        }
                      }}
                    />
                  </div>
                  {"sectionDescription" in selected.data ||
                  "description" in selected.data ? (
                    <div className="space-y-2">
                      <Label>Mô tả</Label>
                      <Textarea
                        rows={4}
                        value={String(
                          selected.data.sectionDescription ??
                            selected.data.description ??
                            "",
                        )}
                        onChange={(e) => {
                          if ("sectionDescription" in selected.data) {
                            updateSelectedData(
                              "sectionDescription",
                              e.target.value,
                            );
                          } else {
                            updateSelectedData("description", e.target.value);
                          }
                        }}
                      />
                    </div>
                  ) : null}
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                    Phần này lấy dữ liệu từ module tương ứng (dịch vụ, bảng giá,
                    gallery, FAQ...). Bạn có thể quản lý chi tiết ở menu bên
                    trái.
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Chưa có block nào.</p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
