import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "AI E-Health — Hypertension Risk Predictor",
  description:
    "Application éducative universitaire pour estimer le risque d'hypertension. Educational project — not a medical diagnostic tool.",
  keywords: [
    "AI E-Health",
    "Hypertension",
    "ضغط الدم",
    "Hypertension artérielle",
    "Educational AI",
    "DevOps",
    "Next.js",
  ],
  authors: [{ name: "AI E-Health Team" }],
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
