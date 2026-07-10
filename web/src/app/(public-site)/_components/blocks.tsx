import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Leaf,
  MapPin,
  Phone,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { ContactForm } from "./contact-form";
import { formatPriceDisplay } from "@/lib/format";
import type {
  FaqItem,
  MediaAsset,
  PriceItem,
  Service,
  Site,
  SiteBlock,
  Testimonial,
} from "@/types/domain";

const iconMap = {
  sparkles: Sparkles,
  leaf: Leaf,
  heart: Heart,
  users: Users,
} as const;

function SectionShell({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-4 py-16 sm:px-6 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function HeroBlock({
  block,
  site,
}: {
  block: SiteBlock;
  site: Site;
}) {
  const data = block.data;
  const title = String(data.title ?? site.businessName);
  const subtitle = String(data.subtitle ?? site.shortDescription ?? "");
  const bg = String(data.backgroundImageUrl ?? "");
  const badge = String(data.badgeText ?? "");
  const primaryText = String(data.primaryButtonText ?? "Liên hệ");
  const secondaryText = String(data.secondaryButtonText ?? "Xem dịch vụ");

  return (
    <section className="relative min-h-[78vh] overflow-hidden">
      {bg ? (
        <Image
          src={bg}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: site.primaryColor }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6">
        {badge ? (
          <span className="mb-4 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur">
            {badge}
          </span>
        ) : null}
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={site.zalo ?? `tel:${site.phone}`}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg"
            style={{ backgroundColor: site.primaryColor }}
          >
            {primaryText}
          </a>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AboutBlock({
  block,
  site,
}: {
  block: SiteBlock;
  site: Site;
}) {
  const data = block.data;
  const highlights = (data.highlights as Array<{
    icon: keyof typeof iconMap;
    title: string;
    description: string;
  }>) ?? [];
  const imageUrl = String(data.imageUrl ?? "");

  return (
    <SectionShell className="bg-white">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p
            className="text-sm font-semibold tracking-wide uppercase"
            style={{ color: site.primaryColor }}
          >
            Giới thiệu
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {String(data.sectionTitle ?? "Về chúng tôi")}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {String(data.description ?? site.shortDescription ?? "")}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = iconMap[item.icon] ?? Sparkles;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                >
                  <div
                    className="grid size-10 place-items-center rounded-xl text-white"
                    style={{ backgroundColor: site.primaryColor }}
                  >
                    <Icon className="size-5" />
                  </div>
                  <p className="mt-3 font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {imageUrl ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src={imageUrl}
              alt={site.businessName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}

export function ServicesHighlightBlock({
  block,
  site,
  services,
}: {
  block: SiteBlock;
  site: Site;
  services: Service[];
}) {
  const selectedIds = (block.data.selectedServiceIds as string[]) ?? [];
  const items = services
    .filter((s) => selectedIds.includes(s.id) && s.status === "active")
    .slice(0, 6);

  if (items.length === 0) return null;

  return (
    <SectionShell id="services" className="bg-[#F7F8FA]">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          {String(block.data.sectionTitle ?? "Dịch vụ nổi bật")}
        </h2>
        <p className="mt-3 text-slate-600">
          {String(block.data.sectionDescription ?? "")}
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((service) => (
          <article
            key={service.id}
            className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
          >
            <div className="relative aspect-[4/3] bg-slate-100">
              {service.imageUrl ? (
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : null}
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                {service.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {service.shortDescription}
              </p>
              <p
                className="mt-4 text-sm font-semibold"
                style={{ color: site.primaryColor }}
              >
                {formatPriceDisplay(
                  service.priceType,
                  service.priceMin,
                  service.priceMax,
                )}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/services"
          className="inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: site.primaryColor }}
        >
          {String(block.data.buttonText ?? "Xem tất cả dịch vụ")}
        </Link>
      </div>
    </SectionShell>
  );
}

export function PriceHighlightBlock({
  block,
  site,
  prices,
}: {
  block: SiteBlock;
  site: Site;
  prices: PriceItem[];
}) {
  const selectedIds = (block.data.selectedPriceIds as string[]) ?? [];
  const items = prices
    .filter((p) => selectedIds.includes(p.id) && p.status === "active")
    .slice(0, 6);

  if (items.length === 0) return null;

  return (
    <SectionShell className="bg-white">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          {String(block.data.sectionTitle ?? "Bảng giá")}
        </h2>
        <p className="mt-3 text-slate-600">
          {String(block.data.sectionDescription ?? "")}
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
              index % 2 === 0 ? "bg-white" : "bg-slate-50/80"
            }`}
          >
            <div>
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-sm text-slate-500">
                {item.description}
                {item.note ? ` · ${item.note}` : ""}
              </p>
            </div>
            <p
              className="text-sm font-semibold sm:text-base"
              style={{ color: site.primaryColor }}
            >
              {formatPriceDisplay(item.priceType, item.priceMin, item.priceMax)}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function GalleryPreviewBlock({
  block,
  media,
}: {
  block: SiteBlock;
  media: MediaAsset[];
}) {
  const selectedIds = (block.data.selectedMediaIds as string[]) ?? [];
  const items = media
    .filter((m) => selectedIds.includes(m.id) && m.status === "active")
    .slice(0, 8);

  if (items.length === 0) return null;

  return (
    <SectionShell className="bg-[#F7F8FA]">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            {String(block.data.sectionTitle ?? "Hình ảnh")}
          </h2>
          <p className="mt-2 text-slate-600">Không gian và khoảnh khắc tại spa.</p>
        </div>
        <Link
          href="/gallery"
          className="text-sm font-semibold text-teal-700 hover:underline"
        >
          Xem tất cả →
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square overflow-hidden rounded-2xl bg-slate-200"
          >
            <Image
              src={item.publicUrl}
              alt={item.altText || item.originalFilename}
              fill
              className="object-cover transition duration-500 hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function TestimonialsBlock({
  block,
  testimonials,
  site,
}: {
  block: SiteBlock;
  testimonials: Testimonial[];
  site: Site;
}) {
  const selectedIds = (block.data.selectedTestimonialIds as string[]) ?? [];
  const items = testimonials
    .filter((t) => selectedIds.includes(t.id) && t.status === "active")
    .slice(0, 6);

  if (items.length === 0) return null;

  return (
    <SectionShell className="bg-white">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          {String(block.data.sectionTitle ?? "Cảm nhận khách hàng")}
        </h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-3xl border border-slate-100 bg-slate-50/70 p-6"
          >
            <div className="flex gap-1">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              “{item.comment}”
            </p>
            <p
              className="mt-5 text-sm font-semibold"
              style={{ color: site.primaryColor }}
            >
              {item.customerName}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function FaqBlock({
  block,
  faqs,
  site,
}: {
  block: SiteBlock;
  faqs: FaqItem[];
  site: Site;
}) {
  const selectedIds = (block.data.selectedFaqIds as string[]) ?? [];
  const items = faqs
    .filter((f) => selectedIds.includes(f.id) && f.status === "active")
    .slice(0, 10);

  if (items.length === 0) return null;

  return (
    <SectionShell className="bg-[#F7F8FA]">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          {String(block.data.sectionTitle ?? "Câu hỏi thường gặp")}
        </h2>
      </div>
      <div className="mx-auto mt-8 max-w-3xl space-y-3">
        {items.map((item) => (
          <details
            key={item.id}
            className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm open:shadow-md"
          >
            <summary className="cursor-pointer list-none font-semibold text-slate-900 marker:content-none">
              <span className="flex items-center justify-between gap-3">
                {item.question}
                <span
                  className="grid size-7 place-items-center rounded-full text-white transition group-open:rotate-45"
                  style={{ backgroundColor: site.primaryColor }}
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

export function ContactCtaBlock({
  block,
  site,
  services,
}: {
  block: SiteBlock;
  site: Site;
  services: Service[];
}) {
  const showForm = Boolean(block.data.showContactForm);

  return (
    <SectionShell id="contact" className="bg-white">
      <div className="grid gap-8 overflow-hidden rounded-[2rem] lg:grid-cols-2">
        <div
          className="flex flex-col justify-center p-8 text-white sm:p-10"
          style={{ backgroundColor: site.primaryColor }}
        >
          <h2 className="text-3xl font-semibold tracking-tight">
            {String(block.data.title ?? "Liên hệ với chúng tôi")}
          </h2>
          <p className="mt-4 text-white/85">
            {String(block.data.description ?? "")}
          </p>
          <div className="mt-8 space-y-3 text-sm">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-2 font-medium"
            >
              <Phone className="size-4" />
              {site.phone}
            </a>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {site.address}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {site.zalo ? (
              <a
                href={site.zalo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold"
                style={{ color: site.primaryColor }}
              >
                Nhắn Zalo
              </a>
            ) : null}
            {site.facebook ? (
              <a
                href={site.facebook}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Facebook
              </a>
            ) : null}
          </div>
        </div>
        <div className="border border-slate-100 bg-slate-50/70 p-6 sm:p-8">
          {showForm ? (
            <ContactForm
              services={services.filter((s) => s.status === "active")}
              primaryColor={site.primaryColor}
            />
          ) : (
            <div className="flex h-full flex-col justify-center">
              <p className="text-lg font-semibold text-slate-900">
                Gọi hoặc nhắn tin để đặt lịch
              </p>
              <a
                href={`tel:${site.phone}`}
                className="mt-4 inline-flex w-fit rounded-full px-5 py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: site.primaryColor }}
              >
                {String(block.data.buttonText ?? "Gọi ngay")}
              </a>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}

export function MapBlock({
  block,
  site,
}: {
  block: SiteBlock;
  site: Site;
}) {
  const mapUrl = String(block.data.mapEmbedUrl ?? site.mapEmbedUrl ?? "");
  const address = String(block.data.addressText ?? site.address);
  const hours = String(block.data.openingHours ?? site.openingHours);
  const parking = String(block.data.parkingNote ?? "");

  return (
    <SectionShell className="bg-[#F7F8FA]">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Địa chỉ & giờ mở cửa
          </h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-teal-700" />
              {address}
            </p>
            <p>
              <span className="font-medium text-slate-900">Giờ mở cửa:</span>{" "}
              {hours}
            </p>
            {parking ? (
              <p>
                <span className="font-medium text-slate-900">Gửi xe:</span>{" "}
                {parking}
              </p>
            ) : null}
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          {mapUrl ? (
            <iframe
              title="Bản đồ"
              src={mapUrl}
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-80 items-center justify-center p-6 text-center text-sm text-slate-500">
              {address}
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
