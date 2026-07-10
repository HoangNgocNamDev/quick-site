export type UserRole = "platform_admin" | "customer_owner";
export type UserStatus = "active" | "inactive";

export type TenantStatus = "trial" | "active" | "suspended" | "cancelled";
export type PlanType = "basic" | "standard" | "pro";
export type SiteStatus = "draft" | "published" | "unpublished";
export type DomainType = "subdomain" | "custom";
export type DomainStatus = "pending" | "active" | "failed";

export type PriceType = "fixed" | "from" | "range" | "contact";
export type ContentStatus = "active" | "inactive" | "archived";
export type LeadStatus = "new" | "contacted" | "won" | "lost" | "spam";

export type BlockType =
  | "hero"
  | "about"
  | "services_highlight"
  | "price_highlight"
  | "gallery_preview"
  | "testimonials"
  | "faq"
  | "contact_cta"
  | "map"
  | "footer";

export type ButtonActionType = "call" | "zalo" | "facebook" | "scroll" | "link";

export interface User {
  id: string;
  tenantId: string | null;
  email: string;
  fullName: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  lastLoginAt: string | null;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  industry: string;
  status: TenantStatus;
  plan: PlanType;
  note: string | null;
  ownerUserId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Site {
  id: string;
  tenantId: string;
  templateId: string;
  name: string;
  businessName: string;
  status: SiteStatus;
  logoUrl: string | null;
  faviconUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  slogan: string | null;
  shortDescription: string | null;
  industry: string;
  phone: string;
  email: string | null;
  zalo: string | null;
  facebook: string | null;
  tiktok: string | null;
  instagram: string | null;
  address: string;
  mapEmbedUrl: string | null;
  openingHours: string;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImageUrl: string | null;
  lastPublishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Domain {
  id: string;
  tenantId: string;
  siteId: string;
  domain: string;
  type: DomainType;
  status: DomainStatus;
  isPrimary: boolean;
  createdAt: string;
}

export interface Template {
  id: string;
  name: string;
  industry: string;
  thumbnailUrl: string;
  description: string;
}

export interface PageItem {
  id: string;
  siteId: string;
  title: string;
  slug: string;
  pageType: "home" | "services" | "gallery" | "contact";
  status: "active" | "inactive";
  seoTitle: string | null;
  seoDescription: string | null;
  ogImageUrl: string | null;
  updatedAt: string;
}

export interface ButtonAction {
  type: ButtonActionType;
  value: string;
}

export interface SiteBlock {
  id: string;
  siteId: string;
  pageId: string;
  blockType: BlockType;
  title: string;
  sortOrder: number;
  isVisible: boolean;
  data: Record<string, unknown>;
}

export interface Service {
  id: string;
  siteId: string;
  name: string;
  shortDescription: string;
  longDescription: string | null;
  imageUrl: string | null;
  priceType: PriceType;
  priceMin: number | null;
  priceMax: number | null;
  duration: string | null;
  isFeatured: boolean;
  status: ContentStatus;
  sortOrder: number;
}

export interface PriceItem {
  id: string;
  siteId: string;
  name: string;
  description: string | null;
  priceType: PriceType;
  priceMin: number | null;
  priceMax: number | null;
  unit: string | null;
  note: string | null;
  isFeatured: boolean;
  status: ContentStatus;
  sortOrder: number;
}

export interface MediaAsset {
  id: string;
  siteId: string;
  originalFilename: string;
  publicUrl: string;
  altText: string | null;
  caption: string | null;
  status: "active" | "archived";
  isInPublicGallery: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface FaqItem {
  id: string;
  siteId: string;
  question: string;
  answer: string;
  sortOrder: number;
  status: "active" | "inactive";
}

export interface Testimonial {
  id: string;
  siteId: string;
  customerName: string;
  rating: number;
  comment: string;
  avatarUrl: string | null;
  status: "active" | "inactive";
  sortOrder: number;
}

export interface Lead {
  id: string;
  tenantId: string;
  siteId: string;
  fullName: string;
  phone: string;
  email: string | null;
  message: string;
  interestedServiceId: string | null;
  sourcePage: string | null;
  status: LeadStatus;
  internalNote: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogItem {
  id: string;
  tenantId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  actorName: string;
  createdAt: string;
}
