import type { Metadata } from "next";
import { HomePageContent } from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "Recycling in Hong Kong",
  description:
    "Find Hong Kong recyclable collection points or book a professional door-to-door pickup. Live data from EPD via CSDI.",
};

export default function HomePage() {
  return <HomePageContent />;
}
