import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { CartDrawer } from "@/components/CartDrawer";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CookieProvider } from "@/context/CookieContext";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WFEP Wellness | Calmexa XR",
    template: "%s | WFEP Wellness",
  },
  description:
    "Find Hong Kong recyclable collection points and manage your member account — order history, saved locations, and recycling event reminders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${fraunces.variable} antialiased`}>
        <CookieProvider>
          <AuthProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <CartDrawer />
              <CookieBanner />
            </CartProvider>
          </AuthProvider>
        </CookieProvider>
      </body>
    </html>
  );
}
