import type { Metadata } from "next";
import { FloatingActions } from "./_components/floating-actions";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { demoSite } from "@/lib/mock/data";

export const metadata: Metadata = {
  title: demoSite.seoTitle ?? demoSite.businessName,
  description: demoSite.seoDescription ?? demoSite.shortDescription ?? "",
  openGraph: {
    title: demoSite.seoTitle ?? demoSite.businessName,
    description: demoSite.seoDescription ?? demoSite.shortDescription ?? "",
    images: demoSite.ogImageUrl ? [demoSite.ogImageUrl] : undefined,
  },
};

export default function PublicSiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader site={demoSite} />
      <main>{children}</main>
      <SiteFooter site={demoSite} />
      <FloatingActions site={demoSite} />
    </div>
  );
}
