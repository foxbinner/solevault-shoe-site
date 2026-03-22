import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-store";
import PromoBar from "@/components/PromoBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Cursor from "@/components/ui/Cursor";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "SoleVault — Premium Footwear",
  description:
    "Shop the finest premium footwear — running, trail, casual, and more.",
  keywords: "shoes, footwear, sneakers, running, premium, online store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${dmSans.variable} ${cormorant.variable} min-h-full bg-[--bg] font-sans text-[--text] antialiased`}
      >
        <CartProvider>
          <Cursor />
          <div className="relative min-h-screen">
            <PromoBar />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
