import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laa Coffee - Order at Table",
  description: "Aplikasi pemesanan meja interaktif untuk Laa Coffee kedai kopi berkualitas",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="☕" />
      </head>
      <body>{children}</body>
    </html>
  );
}
