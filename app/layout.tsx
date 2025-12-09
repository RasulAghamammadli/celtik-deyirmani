import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/layout/sidebar-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Çəltik Dəyirmanı - Admin Panel",
  description: "Çəltik dəyirmanı idarəetmə sistemi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body className={inter.className}>
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  );
}

