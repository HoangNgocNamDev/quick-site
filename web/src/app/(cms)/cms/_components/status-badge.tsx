import { Badge } from "@/components/ui/badge";
import {
  contentStatusLabel,
  leadStatusLabel,
  planLabel,
  siteStatusLabel,
  tenantStatusLabel,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import type {
  ContentStatus,
  LeadStatus,
  PlanType,
  SiteStatus,
  TenantStatus,
} from "@/types/domain";

const toneClass = {
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  blue: "border-sky-200 bg-sky-50 text-sky-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  red: "border-rose-200 bg-rose-50 text-rose-700",
  slate: "border-slate-200 bg-slate-50 text-slate-600",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
} as const;

function SoftBadge({
  children,
  tone = "slate",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneClass;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-0.5 font-medium",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </Badge>
  );
}

export function TenantStatusBadge({ status }: { status: TenantStatus }) {
  const tone: Record<TenantStatus, keyof typeof toneClass> = {
    active: "green",
    trial: "blue",
    suspended: "amber",
    cancelled: "red",
  };
  return <SoftBadge tone={tone[status]}>{tenantStatusLabel[status]}</SoftBadge>;
}

export function SiteStatusBadge({ status }: { status: SiteStatus }) {
  const tone: Record<SiteStatus, keyof typeof toneClass> = {
    published: "green",
    draft: "slate",
    unpublished: "amber",
  };
  return <SoftBadge tone={tone[status]}>{siteStatusLabel[status]}</SoftBadge>;
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const tone: Record<LeadStatus, keyof typeof toneClass> = {
    new: "blue",
    contacted: "violet",
    won: "green",
    lost: "slate",
    spam: "red",
  };
  return <SoftBadge tone={tone[status]}>{leadStatusLabel[status]}</SoftBadge>;
}

export function ContentStatusBadge({ status }: { status: ContentStatus }) {
  const tone: Record<ContentStatus, keyof typeof toneClass> = {
    active: "green",
    inactive: "slate",
    archived: "amber",
  };
  return (
    <SoftBadge tone={tone[status]}>{contentStatusLabel[status]}</SoftBadge>
  );
}

export function PlanBadge({ plan }: { plan: PlanType }) {
  return <SoftBadge tone="violet">{planLabel[plan]}</SoftBadge>;
}
