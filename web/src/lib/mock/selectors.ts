import type {
  Domain,
  FaqItem,
  Lead,
  MediaAsset,
  PageItem,
  PriceItem,
  Service,
  Site,
  SiteBlock,
  Tenant,
  Testimonial,
  User,
} from "@/types/domain";
import {
  blocks,
  domains,
  faqs,
  leads,
  mediaAssets,
  pages,
  priceItems,
  services,
  sites,
  tenants,
  testimonials,
  users,
} from "./data";

export function getTenantById(id: string): Tenant | undefined {
  return tenants.find((t) => t.id === id);
}

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getOwnerByTenantId(tenantId: string): User | undefined {
  return users.find(
    (u) => u.tenantId === tenantId && u.role === "customer_owner",
  );
}

export function getSiteByTenantId(tenantId: string): Site | undefined {
  return sites.find((s) => s.tenantId === tenantId);
}

export function getSiteById(id: string): Site | undefined {
  return sites.find((s) => s.id === id);
}

export function getDomainsBySiteId(siteId: string): Domain[] {
  return domains.filter((d) => d.siteId === siteId);
}

export function getPrimaryDomain(siteId: string): Domain | undefined {
  return domains.find((d) => d.siteId === siteId && d.isPrimary);
}

export function getPagesBySiteId(siteId: string): PageItem[] {
  return pages.filter((p) => p.siteId === siteId);
}

export function getBlocksBySiteId(siteId: string): SiteBlock[] {
  return blocks
    .filter((b) => b.siteId === siteId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getServicesBySiteId(siteId: string): Service[] {
  return services
    .filter((s) => s.siteId === siteId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getActiveServices(siteId: string): Service[] {
  return getServicesBySiteId(siteId).filter((s) => s.status === "active");
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getPricesBySiteId(siteId: string): PriceItem[] {
  return priceItems
    .filter((p) => p.siteId === siteId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getMediaBySiteId(siteId: string): MediaAsset[] {
  return mediaAssets
    .filter((m) => m.siteId === siteId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPublicGallery(siteId: string): MediaAsset[] {
  return getMediaBySiteId(siteId).filter(
    (m) => m.status === "active" && m.isInPublicGallery,
  );
}

export function getFaqsBySiteId(siteId: string): FaqItem[] {
  return faqs
    .filter((f) => f.siteId === siteId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getTestimonialsBySiteId(siteId: string): Testimonial[] {
  return testimonials
    .filter((t) => t.siteId === siteId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getLeadsBySiteId(siteId: string): Lead[] {
  return leads
    .filter((l) => l.siteId === siteId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function getLeadsByTenantId(tenantId: string): Lead[] {
  return leads
    .filter((l) => l.tenantId === tenantId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function getLeadById(id: string): Lead | undefined {
  return leads.find((l) => l.id === id);
}

export function getAllLeads(): Lead[] {
  return [...leads].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getPublicUrl(siteId: string): string {
  const domain = getPrimaryDomain(siteId);
  return domain ? `https://${domain.domain}` : "#";
}

export function getAdminStats() {
  return {
    totalTenants: tenants.length,
    publishedSites: sites.filter((s) => s.status === "published").length,
    newLeads: leads.filter((l) => l.status === "new").length,
    trialTenants: tenants.filter((t) => t.status === "trial").length,
  };
}

export function getCmsStats(siteId: string) {
  const siteLeads = getLeadsBySiteId(siteId);
  return {
    newLeads: siteLeads.filter((l) => l.status === "new").length,
    totalLeads: siteLeads.length,
    services: getActiveServices(siteId).length,
    images: getMediaBySiteId(siteId).filter((m) => m.status === "active")
      .length,
  };
}
