import { ComingSoonPage } from "../_components/status-pages";
import { demoSite } from "@/lib/mock/data";

export default function ComingSoonRoutePage() {
  return <ComingSoonPage businessName={demoSite.businessName} />;
}
