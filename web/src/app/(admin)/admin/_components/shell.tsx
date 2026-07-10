"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    items: [
      {
        href: "/admin",
        label: "Tổng quan",
        icon: <LayoutDashboard className="size-4" />,
      },
    ],
  },
  {
    label: "Vận hành",
    items: [
      {
        href: "/admin/tenants",
        label: "Khách hàng",
        icon: <Building2 className="size-4" />,
      },
      {
        href: "/admin/leads",
        label: "Khách để lại liên hệ",
        icon: <MessageSquareText className="size-4" />,
      },
    ],
  },
];

export function AdminShell({
  userName,
  userEmail,
  children,
}: {
  userName: string;
  userEmail: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === href;
    if (pathname === href) return true;
    if (!pathname.startsWith(`${href}/`)) return false;

    const siblings = navGroups
      .flatMap((g) => g.items)
      .map((i) => i.href)
      .filter((h) => h !== href && h.startsWith(`${href}/`));

    return !siblings.some(
      (h) => pathname === h || pathname.startsWith(`${h}/`),
    );
  };

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

  const nav = (
    <nav className="space-y-5" aria-label="Điều hướng Admin">
      {navGroups.map((group, groupIndex) => (
        <div key={group.label ?? `group-${groupIndex}`}>
          {group.label ? (
            <p className="mb-1.5 px-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              {group.label}
            </p>
          ) : null}
          <div className="space-y-0.5">
            {group.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group relative flex items-center gap-2.5 rounded-xl px-2.5 py-[7px] text-[13px] font-medium transition-all",
                    active
                      ? "bg-white text-teal-800 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_6px_16px_rgba(13,148,136,0.08)] ring-1 ring-teal-100/90"
                      : "text-slate-600 hover:bg-white/75 hover:text-slate-900",
                  )}
                >
                  {active ? (
                    <span className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-teal-500" />
                  ) : null}
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-lg transition-colors",
                      active
                        ? "bg-teal-50 text-teal-700"
                        : "bg-transparent text-slate-400 group-hover:bg-slate-100/80 group-hover:text-slate-600",
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  const brand = (
    <Link href="/admin" className="flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-sm font-bold text-white shadow-[0_6px_16px_rgba(13,148,136,0.28)]">
        A
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[14px] font-semibold tracking-tight text-slate-900">
          QuickSite Admin
        </span>
        <span className="mt-0.5 block truncate text-[11px] text-slate-500">
          Nền tảng quản trị
        </span>
      </span>
    </Link>
  );

  const userCard = (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-center gap-2.5">
        <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal-100 to-cyan-50 text-[11px] font-semibold text-teal-800 ring-1 ring-teal-100">
          {initials || "QS"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-slate-900">
            {userName}
          </p>
          <p className="truncate text-[11px] text-slate-500">{userEmail}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="mt-2.5 h-8 w-full justify-start gap-2 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-800"
        render={<Link href="/login" />}
      >
        <LogOut className="size-3.5" />
        Đăng xuất
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-slate-900">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_0%_-10%,rgba(204,251,241,0.55),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(224,242,254,0.4),transparent_50%)]"
      />

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] border-r border-slate-200/80 bg-white/80 px-3 py-4 backdrop-blur-xl md:flex md:flex-col">
        <div className="px-2 pb-4">{brand}</div>
        <div className="flex-1 overflow-y-auto px-0.5 pb-3 [scrollbar-width:thin]">
          {nav}
        </div>
        <div className="pt-2">{userCard}</div>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"
            aria-label="Đóng menu"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[300px] flex-col bg-white p-4 shadow-2xl shadow-slate-900/15">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1" onClick={() => setOpen(false)}>
                {brand}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 rounded-xl"
                onClick={() => setOpen(false)}
                aria-label="Đóng"
              >
                <X className="size-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto pb-4">{nav}</div>
            {userCard}
          </aside>
        </div>
      ) : null}

      <div className="relative md:pl-[260px]">
        <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 px-4 backdrop-blur-xl sm:px-7">
          <div className="flex h-14 items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2.5">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl md:hidden"
                onClick={() => setOpen(true)}
                aria-label="Mở menu"
              >
                <Menu className="size-5" />
              </Button>
              <div className="min-w-0">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Platform Admin
                </p>
                <p className="truncate text-sm font-semibold text-slate-900">
                  Xin chào, {userName.split(" ").slice(-1)[0]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="hidden items-center gap-1.5 rounded-full border border-teal-100 bg-teal-50/90 px-2.5 py-1 text-[11px] font-medium text-teal-700 sm:inline-flex">
                <span className="size-1.5 rounded-full bg-teal-500" />
                Mock UI · chưa gắn API
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white px-1.5 py-1 pr-2.5 shadow-sm sm:flex">
                <div className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-teal-100 to-cyan-50 text-[10px] font-semibold text-teal-800">
                  {initials || "QS"}
                </div>
                <div className="min-w-0">
                  <p className="max-w-[120px] truncate text-[12px] font-semibold text-slate-800">
                    {userName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-5 sm:px-7 sm:py-7">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
