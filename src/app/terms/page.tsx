import type { Metadata } from "next";
import { TermsPageContent } from "@/components/legal/TermsPageContent";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

export default function TermsPage() {
  return <TermsPageContent />;
}
