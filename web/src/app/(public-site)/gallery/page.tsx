"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { demoSite } from "@/lib/mock/data";
import { getPublicGallery } from "@/lib/mock/selectors";
import type { MediaAsset } from "@/types/domain";

export default function PublicGalleryPage() {
  const site = demoSite;
  const items = getPublicGallery(site.id);
  const [active, setActive] = useState<MediaAsset | null>(null);

  return (
    <div className="bg-white">
      <section className="border-b border-slate-100 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: site.primaryColor }}
          >
            Hình ảnh
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Không gian & khoảnh khắc
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Một vài hình ảnh về không gian trị liệu và trải nghiệm tại{" "}
            {site.businessName}.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 text-left"
            >
              <Image
                src={item.publicUrl}
                alt={item.altText || item.originalFilename}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {item.caption ? (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs text-white opacity-0 transition group-hover:opacity-100">
                  {item.caption}
                </div>
              ) : null}
            </button>
          ))}
        </div>
      </section>

      <Dialog open={Boolean(active)} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0 sm:max-w-3xl">
          <DialogHeader className="px-4 pt-4">
            <DialogTitle>
              {active?.caption || active?.altText || "Hình ảnh"}
            </DialogTitle>
          </DialogHeader>
          {active ? (
            <div className="relative aspect-[4/3] w-full bg-slate-100">
              <Image
                src={active.publicUrl}
                alt={active.altText || active.originalFilename}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
