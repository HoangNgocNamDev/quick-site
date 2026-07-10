import Link from "next/link";
import { MapPin, Palette } from "lucide-react";
import { PageHeader } from "../_components/page-header";
import { SectionCard } from "../_components/section-card";

const items = [
  {
    href: "/cms/settings/brand",
    title: "Thương hiệu",
    description: "Tên doanh nghiệp, logo, màu sắc, slogan.",
    icon: Palette,
  },
  {
    href: "/cms/settings/contact",
    title: "Thông tin liên hệ",
    description: "Số điện thoại, Zalo, Facebook, địa chỉ, giờ mở cửa.",
    icon: MapPin,
  },
];

export default function SettingsHubPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Cài đặt website"
        description="Chọn nhóm thông tin bạn muốn chỉnh."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <SectionCard className="h-full transition hover:border-teal-200">
              <div className="grid size-11 place-items-center rounded-xl bg-teal-50 text-teal-700">
                <item.icon className="size-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{item.description}</p>
            </SectionCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
