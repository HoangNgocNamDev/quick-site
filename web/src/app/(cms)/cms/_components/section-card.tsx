import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <Card
      className={cn(
        "gap-0 rounded-2xl border-slate-200/80 bg-white py-0 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_10px_28px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/[0.03]",
        className,
      )}
    >
      {title || description || actions ? (
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 border-b border-slate-100 bg-gradient-to-b from-slate-50/90 to-white px-5 py-4">
          <div className="min-w-0 space-y-1">
            {title ? (
              <CardTitle className="text-[15px] font-semibold tracking-tight text-slate-900">
                {title}
              </CardTitle>
            ) : null}
            {description ? (
              <CardDescription className="text-sm leading-6 text-slate-500">
                {description}
              </CardDescription>
            ) : null}
          </div>
          {actions ? (
            <div className="shrink-0 self-center">{actions}</div>
          ) : null}
        </CardHeader>
      ) : null}
      <CardContent className={cn("px-5 py-5", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}
