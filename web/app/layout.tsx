import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phulkari — Preeth Design Studios",
  description: "Boutique management dashboard for Phulkari by Preeth Design Studios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Inter', sans-serif", background: "#2E3B27", color: "#F0EAD6" }}>
        {children}
      </body>
    </html>
  );
}
