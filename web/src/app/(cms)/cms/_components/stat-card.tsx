import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  note?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  note,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden rounded-2xl border-slate-200/80 bg-white py-0 shadow-[0_1px_2px_rgba(15,23,42,0.03),0_10px_28px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/[0.03]",
        className,
      )}
    >
      <CardContent className="relative px-5 py-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/70 to-transparent" />
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-[1.75rem] font-semibold tracking-tight text-slate-900 tabular-nums">
              {value}
            </p>
            {note ? (
              <p className="mt-2 text-xs font-medium text-teal-700/90">{note}</p>
            ) : null}
          </div>
          {icon ? (
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 text-teal-700 ring-1 ring-teal-100/90">
              {icon}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
