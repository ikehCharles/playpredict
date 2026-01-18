import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, BottomNav } from "@/src/components/common";
import ThemeConfigProvider from "../components/hooks/AntTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Play Predict",
  description: "Earn while predicting on your favorite sports",
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
        <ThemeConfigProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pb-20 md:pb-6">
            {children}
          </main>
          <BottomNav />
        </div>
        </ThemeConfigProvider>
      </body>
    </html>
  );
}
