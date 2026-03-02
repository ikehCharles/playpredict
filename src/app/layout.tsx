import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AntTheme as ThemeConfigProvider } from "@hooks";
import LayoutContent from "./LayoutContent";
import { ServiceWorkerRegistration } from "@common";

export const viewport: Viewport = {
  themeColor: "#5E17EB",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "PlayPredict",
  description: "Earn while predicting on your favorite sports",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "PlayPredict",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">

        <ServiceWorkerRegistration />
        <ThemeConfigProvider>
          <LayoutContent>{children}</LayoutContent>
        </ThemeConfigProvider>
      </body>
    </html>
  );
}
