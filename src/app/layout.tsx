import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CouponHub - Best SaaS Deals & Coupon Codes",
  description: "Save money on your favorite software tools with verified coupon codes and exclusive deals. Find discounts for design tools, productivity apps, marketing software and more.",
  keywords: "coupon codes, saas deals, software discounts, promo codes, design tools, productivity apps",
  openGraph: {
    title: "CouponHub - Best SaaS Deals & Coupon Codes",
    description: "Save money on your favorite software tools with verified coupon codes and exclusive deals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
