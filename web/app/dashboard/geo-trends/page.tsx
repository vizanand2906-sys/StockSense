"use client";

import dynamic from "next/dynamic";
import { FilterBar } from "@/components/layout/FilterBar";

// Leaflet requires browser APIs — must be loaded client-side only
const BangaloreMap = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "580px", display: "flex", alignItems: "center", justifyContent: "center", background: "#2E3B27", borderRadius: "14px", border: "1px solid #4F5E44" }}>
      <div style={{ textAlign: "center" }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4F5E44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px" }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <p style={{ color: "#A8B89A", fontSize: "13px" }}>Loading Bengaluru map…</p>
      </div>
    </div>
  ),
});

export default function GeoTrendsPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar
        title="Neighbourhood Trend Map"
        subtitle="Bengaluru · Real geography · Fashion signal overlay"
      />
      <BangaloreMap />
    </div>
  );
}
