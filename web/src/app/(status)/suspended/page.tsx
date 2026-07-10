import { SuspendedSitePage } from "../_components/status-pages";
import { demoSite } from "@/lib/mock/data";

export default function SuspendedPage() {
  return <SuspendedSitePage businessName={demoSite.businessName} />;
}
