import { UnpublishedSitePage } from "../_components/status-pages";
import { demoSite } from "@/lib/mock/data";

export default function UnpublishedPage() {
  return <UnpublishedSitePage businessName={demoSite.businessName} />;
}
