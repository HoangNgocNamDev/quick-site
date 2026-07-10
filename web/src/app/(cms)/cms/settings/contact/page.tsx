import { PageHeader } from "../../_components/page-header";
import { SectionCard } from "../../_components/section-card";
import { SaveDraftButton } from "../../_components/mock-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { demoSite } from "@/lib/mock/data";

export default function ContactSettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader
        title="Thông tin liên hệ"
        description="Số điện thoại, mạng xã hội và địa chỉ hiển thị trên website."
        actions={<SaveDraftButton />}
      />

      <SectionCard title="Liên hệ chính">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại *</Label>
            <Input id="phone" defaultValue={demoSite.phone} className="h-10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={demoSite.email ?? ""}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zalo">Zalo</Label>
            <Input id="zalo" defaultValue={demoSite.zalo ?? ""} className="h-10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              id="facebook"
              defaultValue={demoSite.facebook ?? ""}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              defaultValue={demoSite.instagram ?? ""}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tiktok">TikTok</Label>
            <Input
              id="tiktok"
              defaultValue={demoSite.tiktok ?? ""}
              className="h-10"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Địa chỉ & giờ mở cửa">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              defaultValue={demoSite.address}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hours">Giờ mở cửa</Label>
            <Input
              id="hours"
              defaultValue={demoSite.openingHours}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="map">Google Map embed URL</Label>
            <Textarea
              id="map"
              defaultValue={demoSite.mapEmbedUrl ?? ""}
              rows={3}
            />
            <p className="text-xs text-slate-500">
              Dán link nhúng bản đồ từ Google Maps. Nếu để trống, website chỉ hiện địa chỉ dạng chữ.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
