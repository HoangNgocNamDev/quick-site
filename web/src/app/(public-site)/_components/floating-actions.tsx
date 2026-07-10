import { MessageCircle, Phone, Share2 } from "lucide-react";
import type { Site } from "@/types/domain";

export function FloatingActions({ site }: { site: Site }) {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-2 sm:right-6 sm:bottom-6">
      <a
        href={`tel:${site.phone}`}
        className="grid size-12 place-items-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 transition hover:scale-105"
        aria-label="Gọi điện"
      >
        <Phone className="size-5" />
      </a>
      {site.zalo ? (
        <a
          href={site.zalo}
          target="_blank"
          rel="noreferrer"
          className="grid size-12 place-items-center rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/30 transition hover:scale-105"
          aria-label="Zalo"
        >
          <MessageCircle className="size-5" />
        </a>
      ) : null}
      {site.facebook ? (
        <a
          href={site.facebook}
          target="_blank"
          rel="noreferrer"
          className="grid size-12 place-items-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition hover:scale-105"
          aria-label="Facebook"
        >
          <Share2 className="size-5" />
        </a>
      ) : null}
    </div>
  );
}
