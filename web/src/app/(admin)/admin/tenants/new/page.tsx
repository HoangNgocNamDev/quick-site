"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PageHeader } from "../../_components/page-header";
import { SectionCard } from "../../_components/section-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { templates } from "@/lib/mock/data";

export default function CreateTenantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordMode, setPasswordMode] = useState("generate");
  const [templateId, setTemplateId] = useState(templates[0]?.id ?? "");
  const [plan, setPlan] = useState("standard");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const slug = String(form.get("slug") || "").trim();

    if (!name || !email || !slug || !templateId || !plan) {
      toast.error("Vui lòng điền đủ các trường bắt buộc.");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      toast.success("Đã tạo khách hàng và website mặc định (mock UI).");
      router.push("/admin/tenants/tenant-1");
    }, 600);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Tạo khách hàng mới"
        description="Tạo đơn vị, tài khoản chủ website và website mặc định từ template."
      />

      <SectionCard>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Tên khách hàng *</Label>
              <Input id="name" name="name" placeholder="Sen Spa" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Ngành nghề</Label>
              <Input
                id="industry"
                name="industry"
                placeholder="Spa & Làm đẹp"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Subdomain *</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="slug"
                  name="slug"
                  placeholder="sen-spa"
                  className="h-10"
                />
                <span className="text-sm whitespace-nowrap text-slate-500">
                  .yourdomain.vn
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerName">Họ tên chủ website *</Label>
              <Input
                id="ownerName"
                name="ownerName"
                placeholder="Lan Nguyễn"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email chủ website *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="owner@example.com"
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="0909..."
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Gói thuê bao *</Label>
              <select
                id="plan"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm"
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="pro">Pro</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Template *</Label>
              <div className="grid gap-3 sm:grid-cols-3">
                {templates.map((template) => {
                  const selected = templateId === template.id;
                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => setTemplateId(template.id)}
                      className={`rounded-xl border p-3 text-left transition ${
                        selected
                          ? "border-teal-500 bg-teal-50 ring-2 ring-teal-100"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div
                        className="mb-3 h-20 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${template.thumbnailUrl})` }}
                      />
                      <p className="text-sm font-semibold text-slate-900">
                        {template.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {template.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="passwordMode">Mật khẩu ban đầu</Label>
              <select
                id="passwordMode"
                value={passwordMode}
                onChange={(e) => setPasswordMode(e.target.value)}
                className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm"
              >
                <option value="generate">Tạo tự động</option>
                <option value="manual">Nhập thủ công</option>
              </select>
              {passwordMode === "manual" ? (
                <Input
                  name="password"
                  type="text"
                  placeholder="Mật khẩu tạm thời"
                  className="mt-2 h-10"
                />
              ) : (
                <p className="text-xs text-slate-500">
                  Hệ thống sẽ tạo mật khẩu tạm và hiển thị một lần sau khi tạo.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-5">
            <Button variant="outline" render={<Link href="/admin/tenants" />}>
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {loading ? "Đang tạo..." : "Tạo khách hàng"}
            </Button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
