import { AdminShell } from "./_components/shell";
import { currentAdmin } from "@/lib/mock/data";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminShell
      userName={currentAdmin.fullName}
      userEmail={currentAdmin.email}
    >
      {children}
    </AdminShell>
  );
}
