import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const experimental_ppr = true;

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading in [postid]/layout...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
