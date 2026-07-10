import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { ContactForm } from "../_components/contact-form";
import { demoSite } from "@/lib/mock/data";
import { getActiveServices } from "@/lib/mock/selectors";

export const metadata: Metadata = {
  title: `Liên hệ | ${demoSite.businessName}`,
  description: `Đặt lịch và để lại thông tin liên hệ với ${demoSite.businessName}.`,
};

export default function PublicContactPage() {
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
            Liên hệ
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
            Đặt lịch tư vấn
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Để lại thông tin hoặc gọi trực tiếp. {site.businessName} sẽ phản hồi
            trong giờ làm việc.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-5">
          <div className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-900">
              Thông tin liên hệ
            </h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-2 font-medium text-slate-900"
              >
                <Phone className="size-4" style={{ color: site.primaryColor }} />
                {site.phone}
              </a>
              {site.email ? <p>{site.email}</p> : null}
              <p className="flex items-start gap-2">
                <MapPin
                  className="mt-0.5 size-4 shrink-0"
                  style={{ color: site.primaryColor }}
                />
                {site.address}
              </p>
              <p>
                <span className="font-medium text-slate-900">Giờ mở cửa:</span>{" "}
                {site.openingHours}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.zalo ? (
                <a
                  href={site.zalo}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: site.primaryColor }}
                >
                  Nhắn Zalo
                </a>
              ) : null}
              {site.facebook ? (
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Facebook
                </a>
              ) : null}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm lg:col-span-3">
            <h2 className="text-xl font-semibold text-slate-900">
              Gửi form liên hệ
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Điền thông tin bên dưới. Chúng tôi sẽ gọi lại sớm.
            </p>
            <div className="mt-6">
              <ContactForm
                services={services}
                primaryColor={site.primaryColor}
              />
            </div>
          </div>
        </div>

        {site.mapEmbedUrl ? (
          <div className="mx-auto mt-6 max-w-6xl overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-sm">
            <iframe
              title="Bản đồ"
              src={site.mapEmbedUrl}
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}
