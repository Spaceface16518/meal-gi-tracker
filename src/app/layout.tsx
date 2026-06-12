import type { Metadata, Viewport } from "next";
import { PwaRegistration } from "@/app/pwa-registration";
import "./globals.css";

const appName = "Meal Signal";
const appDescription =
  "Private meal and GI event tracking for reviewing likely food irritant signals.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : undefined;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: appName,
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: appDescription,
  keywords: [
    "meal tracker",
    "GI symptom tracker",
    "food diary",
    "irritant analysis",
  ],
  authors: [{ name: "Meal Signal" }],
  creator: "Meal Signal",
  publisher: "Meal Signal",
  category: "health",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: appName,
  },
  openGraph: {
    title: appName,
    description: appDescription,
    siteName: appName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: appName,
    description: appDescription,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f7f8f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <PwaRegistration />
      </body>
    </html>
  );
}
