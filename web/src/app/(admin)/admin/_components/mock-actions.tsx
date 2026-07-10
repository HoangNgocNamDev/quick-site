"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function SaveDraftButton({
  label = "Lưu bản nháp",
  message = "Đã lưu bản nháp (mock UI).",
}: {
  label?: string;
  message?: string;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      type="button"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        window.setTimeout(() => {
          setLoading(false);
          toast.success(message);
        }, 500);
      }}
    >
      {loading ? "Đang lưu..." : label}
    </Button>
  );
}

export function PublishButton({
  label = "Công khai website",
  confirmTitle = "Công khai website?",
  confirmDescription = "Nội dung bản nháp sẽ được đưa lên website công khai.",
  successMessage = "Đã công khai website (mock UI).",
}: {
  label?: string;
  confirmTitle?: string;
  confirmDescription?: string;
  successMessage?: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button type="button" className="bg-teal-600 hover:bg-teal-700" />
        }
      >
        {label}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => toast.success(successMessage)}
            className="bg-teal-600 hover:bg-teal-700"
          >
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function MockSubmitButton({
  children,
  message = "Đã lưu thành công (mock UI).",
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  message?: string;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost";
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      disabled={loading}
      onClick={() => {
        setLoading(true);
        window.setTimeout(() => {
          setLoading(false);
          toast.success(message);
        }, 450);
      }}
    >
      {loading ? "Đang xử lý..." : children}
    </Button>
  );
}
