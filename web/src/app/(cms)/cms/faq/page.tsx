"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";
import { AiSuggestButton } from "../_components/ai-suggest-button";
import { MockSubmitButton } from "../_components/mock-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { demoSite } from "@/lib/mock/data";
import { getFaqsBySiteId } from "@/lib/mock/selectors";
import type { FaqItem } from "@/types/domain";

export default function FaqPage() {
  const [items, setItems] = useState<FaqItem[]>(() =>
    getFaqsBySiteId(demoSite.id),
  );
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function addFaq() {
    if (!question.trim() || !answer.trim()) {
      toast.error("Vui lòng nhập câu hỏi và câu trả lời.");
      return;
    }
    setItems((prev) => [
      ...prev,
      {
        id: `faq-new-${Date.now()}`,
        siteId: demoSite.id,
        question,
        answer,
        sortOrder: prev.length + 1,
        status: "active",
      },
    ]);
    setQuestion("");
    setAnswer("");
    toast.success("Đã thêm câu hỏi (mock UI).");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Câu hỏi thường gặp"
        description="FAQ hiển thị dạng xổ xuống trên trang chủ và trang liên hệ."
        actions={
          <AiSuggestButton
            label="Sinh FAQ bằng AI"
            title="Gợi ý FAQ"
            suggestion={
              "Sen Spa có cần đặt lịch trước không?\nNên đặt trước 2–4 giờ, đặc biệt cuối tuần.\n\nCó tư vấn da miễn phí không?\nCó, kỹ thuật viên soi da và tư vấn trước khi làm."
            }
            onApply={(value) => {
              const lines = value.split("\n").filter(Boolean);
              if (lines[0]) setQuestion(lines[0]);
              if (lines[1]) setAnswer(lines.slice(1).join(" "));
            }}
          />
        }
      />

      <SectionCard title="Thêm câu hỏi">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Câu hỏi</Label>
            <Input
              className="h-10"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Sen Spa có giữ xe không?"
            />
          </div>
          <div className="space-y-2">
            <Label>Câu trả lời</Label>
            <Textarea
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Có chỗ giữ xe máy miễn phí..."
            />
          </div>
          <Button
            type="button"
            className="bg-teal-600 hover:bg-teal-700"
            onClick={addFaq}
          >
            <Plus className="size-4" />
            Thêm FAQ
          </Button>
        </div>
      </SectionCard>

      <SectionCard title="Danh sách FAQ" contentClassName="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-teal-700">
                  Câu hỏi {index + 1}
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {item.question}
                </p>
                <p className="mt-2 text-sm text-slate-600">{item.answer}</p>
              </div>
              <MockSubmitButton
                message="Đã xóa FAQ (mock UI)."
                variant="outline"
              >
                Xóa
              </MockSubmitButton>
            </div>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}
