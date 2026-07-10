"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import type { Site } from "@/types/domain";

const links = [
  { href: "/", label: "Trang chủ" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/gallery", label: "Hình ảnh" },
  { href: "/contact", label: "Liên hệ" },
];

export function SiteHeader({ site }: { site: Site }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0B3B36]/90 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span
            className="grid size-9 place-items-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: site.primaryColor }}
          >
            {site.businessName.slice(0, 1)}
          </span>
          <div>
            <p className="text-sm font-semibold tracking-wide">
              {site.businessName}
            </p>
            <p className="hidden text-xs text-white/70 sm:block">
              {site.slogan}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`tel:${site.phone}`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: site.primaryColor }}
          >
            <Phone className="size-4" />
            Gọi ngay
          </a>
        </nav>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full bg-white/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Mở menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#0B3B36] px-4 py-4 md:hidden">
          <div className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm text-white/90 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phone}`}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-white"
              style={{ backgroundColor: site.primaryColor }}
            >
              <Phone className="size-4" />
              {site.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
