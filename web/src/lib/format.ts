import type {
  ContentStatus,
  LeadStatus,
  PlanType,
  PriceType,
  SiteStatus,
  TenantStatus,
} from "@/types/domain";

export function formatPriceVnd(value: number | null | undefined): string {
  if (value == null) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN").format(value) + "đ";
}

export function formatPriceDisplay(
  priceType: PriceType,
  priceMin: number | null,
  priceMax: number | null,
): string {
  switch (priceType) {
    case "fixed":
      return formatPriceVnd(priceMin);
    case "from":
      return `Từ ${formatPriceVnd(priceMin)}`;
    case "range":
      return `${formatPriceVnd(priceMin)} - ${formatPriceVnd(priceMax)}`;
    case "contact":
    default:
      return "Liên hệ";
  }
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export const tenantStatusLabel: Record<TenantStatus, string> = {
  trial: "Dùng thử",
  active: "Đang hoạt động",
  suspended: "Tạm ngưng",
  cancelled: "Đã hủy",
};

export const siteStatusLabel: Record<SiteStatus, string> = {
  draft: "Bản nháp",
  published: "Đã công khai",
  unpublished: "Đang tạm ẩn",
};

export const planLabel: Record<PlanType, string> = {
  basic: "Basic",
  standard: "Standard",
  pro: "Pro",
};

export const leadStatusLabel: Record<LeadStatus, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  won: "Thành công",
  lost: "Không chốt",
  spam: "Spam",
};

export const contentStatusLabel: Record<ContentStatus, string> = {
  active: "Đang hiện",
  inactive: "Đang ẩn",
  archived: "Đã lưu trữ",
};

export const blockTypeLabel: Record<string, string> = {
  hero: "Banner đầu trang",
  about: "Giới thiệu",
  services_highlight: "Dịch vụ nổi bật",
  price_highlight: "Bảng giá nổi bật",
  gallery_preview: "Hình ảnh nổi bật",
  testimonials: "Cảm nhận khách hàng",
  faq: "Câu hỏi thường gặp",
  contact_cta: "Nút kêu gọi liên hệ",
  map: "Bản đồ & địa chỉ",
  footer: "Chân trang",
};
