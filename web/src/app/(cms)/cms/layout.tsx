import { CmsShell } from "./_components/shell";
import { currentOwner, demoSite } from "@/lib/mock/data";

export const dynamic = "force-dynamic";

export default function CmsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CmsShell
      brandHint={demoSite.businessName}
      userName={currentOwner.fullName}
      userEmail={currentOwner.email}
    >
      {children}
    </CmsShell>
  );
}
