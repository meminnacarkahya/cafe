import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getMenuData } from "@/lib/menu-loader";
import { MenuProvider } from "./MenuProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Anasayfa - Veluna Coffee & Lounge (Batıkent)",
  description:
    "Veluna Coffee & Lounge, lezzetli yemek-kahve ve keyifli bir atmosfer sunuyor. Kahve, yemek ve nargile keyfini bir arada. Arkadaşlarınızla buluşmak için ideal bir mekan.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuData = await getMenuData();
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MenuProvider initialData={menuData}>{children}</MenuProvider>
      </body>
    </html>
  );
}
