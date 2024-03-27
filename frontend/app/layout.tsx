import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import NextTopLoader from "nextjs-toploader";

import Providers from "@/components/shared/Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booksctore",
  description: "Embark on Your Future-Ready Journey Today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#f8f8f8]`}
        style={{ scrollBehavior: "smooth" }}
      >
        <Providers>
          <NextTopLoader color="#16a34a" />
          <Toaster position="top-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
