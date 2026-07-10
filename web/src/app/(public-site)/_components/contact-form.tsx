"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Service } from "@/types/domain";

export function ContactForm({
  services,
  primaryColor,
}: {
  services: Service[];
  primaryColor: string;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const fullName = String(form.get("fullName") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!fullName || !phone || !message) {
      toast.error("Vui lòng nhập họ tên, số điện thoại và nội dung.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setDone(true);
      toast.success("Gửi thành công! Chúng tôi sẽ liên hệ sớm.");
      e.currentTarget.reset();
    }, 500);
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-800">
          Đã nhận thông tin của bạn
        </p>
        <p className="mt-2 text-sm text-emerald-700">
          Cảm ơn bạn. Đội ngũ sẽ gọi lại trong giờ làm việc.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => setDone(false)}
        >
          Gửi thêm yêu cầu khác
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Họ tên *</Label>
          <Input id="fullName" name="fullName" className="h-11" placeholder="Nguyễn A" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại *</Label>
          <Input id="phone" name="phone" className="h-11" placeholder="0909..." />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          className="h-11"
          placeholder="you@example.com"
        />
      </div>
      {services.length > 0 ? (
        <div className="space-y-2">
          <Label htmlFor="service">Dịch vụ quan tâm</Label>
          <select
            id="service"
            name="service"
            className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-sm"
            defaultValue=""
          >
            <option value="">Chọn dịch vụ (không bắt buộc)</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="message">Nội dung nhu cầu *</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Bạn muốn tư vấn liệu trình nào, thời gian nào tiện..."
        />
      </div>
      {/* honeypot mock */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <Button
        type="submit"
        disabled={loading}
        className="h-11 w-full text-white hover:opacity-90"
        style={{ backgroundColor: primaryColor }}
      >
        {loading ? "Đang gửi..." : "Gửi thông tin"}
      </Button>
    </form>
  );
}
