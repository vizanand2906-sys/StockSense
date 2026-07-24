import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StockSense Demo — Phulkari by Preeth",
  description: "Live product demo for Phulkari boutique",
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0f1a0c" }}>
      {children}
    </div>
  );
}
