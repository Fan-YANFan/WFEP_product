import type { Metadata } from "next";
import { CookiesPageContent } from "@/components/legal/CookiesPageContent";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

export default function CookiesPage() {
  return <CookiesPageContent />;
}
