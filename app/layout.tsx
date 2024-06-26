import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
        <header className="bg-gray-900 flex items-center p-5 text-white">
        <Link href="/"><h1 className="text-xl">Blog</h1></Link>

      </header>
    <main className="min-h-screen text-white bg-gray-950">
        {children}
    </main>
        </body>
    </html>
  );
}
