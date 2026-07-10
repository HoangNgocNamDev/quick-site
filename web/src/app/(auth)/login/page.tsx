import Link from "next/link";
import { Building2, LayoutDashboard, Store } from "lucide-react";

const entries = [
  {
    href: "/admin/login",
    title: "Platform Admin",
    description: "Quản lý khách hàng, website và lead toàn hệ thống.",
    icon: LayoutDashboard,
  },
  {
    href: "/cms/login",
    title: "Customer CMS",
    description: "Chủ website đăng nhập để chỉnh nội dung và xem lead.",
    icon: Store,
  },
  {
    href: "/",
    title: "Public website demo",
    description: "Xem website mẫu Sen Spa (route group public-site).",
    icon: Building2,
    note: "Mở từ trang chủ demo",
  },
];

export default function LoginHubPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8FA] px-4 py-12">
      <div className="w-full max-w-3xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-teal-600 text-lg font-bold text-white">
            Q
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            QuickSite MVP
          </h1>
          <p className="mt-2 text-slate-500">
            Chọn khu vực bạn muốn xem trong bản UI mock.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {entries.map((item) => (
            <Link
              key={item.href + item.title}
              href={item.href}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
            >
              <div className="grid size-10 place-items-center rounded-xl bg-teal-50 text-teal-700">
                <item.icon className="size-5" />
              </div>
              <h2 className="mt-4 font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-500">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
