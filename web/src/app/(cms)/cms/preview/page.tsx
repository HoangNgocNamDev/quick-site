"use client";

import { useState } from "react";
import Link from "next/link";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";
import { PublishButton } from "../_components/mock-actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const devices = [
  { id: "desktop", label: "Máy tính", width: "100%", icon: Monitor },
  { id: "tablet", label: "Máy tính bảng", width: "768px", icon: Tablet },
  { id: "mobile", label: "Điện thoại", width: "390px", icon: Smartphone },
] as const;

export default function PreviewPage() {
  const [device, setDevice] =
    useState<(typeof devices)[number]["id"]>("desktop");
  const current = devices.find((d) => d.id === device) ?? devices[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Xem trước website"
        description="Xem bản nháp trước khi công khai. Preview này dùng dữ liệu mock."
        actions={
          <>
            <Button variant="outline" render={<Link href="/" target="_blank" />}>
              Mở tab mới
            </Button>
            <PublishButton />
          </>
        }
      />

      <SectionCard
        title="Chọn thiết bị"
        actions={
          <div className="flex flex-wrap gap-2">
            {devices.map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={device === item.id ? "default" : "outline"}
                className={
                  device === item.id ? "bg-teal-600 hover:bg-teal-700" : ""
                }
                onClick={() => setDevice(item.id)}
              >
                <item.icon className="size-4" />
                {item.label}
              </Button>
            ))}
          </div>
        }
      >
        <div className="overflow-auto rounded-2xl bg-slate-100 p-4">
          <div
            className={cn(
              "mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all",
            )}
            style={{ width: current.width, maxWidth: "100%" }}
          >
            <iframe
              title="Preview website"
              src="/"
              className="h-[70vh] w-full"
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
