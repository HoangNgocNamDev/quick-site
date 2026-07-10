import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatPriceDisplay } from "@/lib/format";
import { demoSite } from "@/lib/mock/data";
import { getActiveServices } from "@/lib/mock/selectors";

export const metadata: Metadata = {
  title: `Dịch vụ | ${demoSite.businessName}`,
  description: `Danh sách liệu trình và dịch vụ tại ${demoSite.businessName}.`,
};

export default function PublicServicesPage() {
  const site = demoSite;
  const services = getActiveServices(site.id);

  return (
    <div className="bg-[#F7F8FA]">
      <section className="border-b border-slate-100 bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: site.primaryColor }}
          >
            Dịch vụ
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Liệu trình tại {site.businessName}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Chọn liệu trình phù hợp hoặc để lại số điện thoại để được tư vấn
            miễn phí theo tình trạng da.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className="overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10] bg-slate-100">
                {service.imageUrl ? (
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : null}
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {service.name}
                  </h2>
                  {service.duration ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {service.duration}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {service.longDescription || service.shortDescription}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p
                    className="text-base font-semibold"
                    style={{ color: site.primaryColor }}
                  >
                    {formatPriceDisplay(
                      service.priceType,
                      service.priceMin,
                      service.priceMax,
                    )}
                  </p>
                  <Link
                    href="/contact"
                    className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                    style={{ backgroundColor: site.primaryColor }}
                  >
                    Đặt lịch tư vấn
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
