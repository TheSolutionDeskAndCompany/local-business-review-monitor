import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ReviewReady",
  description: "Your reviews in one inbox. Reply fast. Stay ahead.",
  openGraph: { 
    title: "ReviewReady", 
    description: "Your reviews in one inbox.", 
    images: ["/og-image.png"], 
    url: "https://reviewready.ca", 
    siteName: "ReviewReady" 
  },
  icons: {
    icon: [
      { url: "/bubble-check-solid-16.png", sizes: "16x16", type: "image/png" },
      { url: "/bubble-check-solid-32.png", sizes: "32x32", type: "image/png" },
      { url: "/bubble-check-solid-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.variable} font-sans h-full bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
