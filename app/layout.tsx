import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE } from "./site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE.year} ${SITE.name} | Free Federal Tax Estimator`,
  description: SITE.description,
  keywords: [
    "tax calculator",
    "income tax calculator",
    "2025 tax brackets",
    "federal tax calculator",
    "tax refund calculator",
    "self employment tax calculator",
  ],
  verification: {
    google: "qlPMVO_Hb-be3_hFHNT9SBbsHO-b_wCOfWfLmTb4EQc",
  },
  openGraph: {
    title: `${SITE.year} Tax Calculator | Free Federal Tax Estimator`,
    description: "Calculate your federal income tax for free. See your tax bracket, estimate your refund, and plan for tax season.",
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
      <body className={`${inter.variable} antialiased bg-slate-50`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
