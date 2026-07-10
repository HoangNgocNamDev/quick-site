import Link from "next/link";
import { MapPin, Phone, Share2 } from "lucide-react";
import type { Site } from "@/types/domain";

export function SiteFooter({ site }: { site: Site }) {
  return (
    <footer className="border-t border-teal-900/10 bg-[#0B3B36] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{site.businessName}</p>
          <p className="mt-3 text-sm text-white/70">{site.shortDescription}</p>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-white/90">
            Liên kết
          </p>
          <div className="mt-3 space-y-2 text-sm text-white/70">
            <Link href="/services" className="block hover:text-white">
              Dịch vụ
            </Link>
            <Link href="/gallery" className="block hover:text-white">
              Hình ảnh
            </Link>
            <Link href="/contact" className="block hover:text-white">
              Liên hệ
            </Link>
          </div>
        </div>
        <div className="space-y-3 text-sm text-white/70">
          <p className="text-sm font-semibold tracking-wide text-white/90">
            Liên hệ
          </p>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {site.address}
          </p>
          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-2 hover:text-white"
          >
            <Phone className="size-4" />
            {site.phone}
          </a>
          {site.facebook ? (
            <a
              href={site.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <Share2 className="size-4" />
              Facebook
            </a>
          ) : null}
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {site.businessName}. Powered by QuickSite.
      </div>
    </footer>
  );
}
