"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface AiSuggestButtonProps {
  label?: string;
  title?: string;
  description?: string;
  suggestion: string;
  onApply?: (value: string) => void;
}

export function AiSuggestButton({
  label = "Gợi ý bằng AI",
  title = "Nội dung gợi ý",
  description = "Đây là nội dung mock. Bạn có thể chỉnh lại trước khi áp dụng.",
  suggestion,
  onApply,
}: AiSuggestButtonProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(suggestion);
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button type="button" variant="outline" size="sm" />}
        onClick={() => {
          setLoading(true);
          window.setTimeout(() => {
            setValue(suggestion);
            setLoading(false);
          }, 400);
        }}
      >
        <Sparkles className="size-4" />
        {label}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {loading ? (
          <p className="text-sm text-slate-500">Đang tạo gợi ý...</p>
        ) : (
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={8}
            className="resize-none"
          />
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button
            type="button"
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => {
              onApply?.(value);
              toast.success("Đã áp dụng nội dung gợi ý (mock UI).");
              setOpen(false);
            }}
          >
            Áp dụng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
