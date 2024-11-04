import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import config from "@/blog.config.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
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
          <Link href="/">
            <h1 className="text-xl">{config.title}</h1>
          </Link>
        </header>
        <main className="min-h-screen text-white bg-gray-950">{children}</main>
        <footer className="bg-gray-900 h-20 text-white text-sm flex items-center justify-center">
          <p>Copyright &copy; 2024, {config.title}</p>
        </footer>
      </body>
    </html>
  );
}
