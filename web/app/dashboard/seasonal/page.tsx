"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { syntheticMarkdownData as markdownData } from "@/lib/syntheticData";

const SEASONS = [
  {
    name: "Wedding Season 2025", emoji: "💍", status: "Active",
    revenue: 27600000, units: 618, margin: 46, sellThrough: 78, inventoryLeft: 92,
    peakMonths: "Nov–Feb", nextFestival: "Dec 2025",
    topCategories: ["Lehengas (48%)", "Sarees (32%)", "Dupattas (12%)"],
    color: "#D4A853"
  },
  {
    name: "Diwali 2025", emoji: "🪔", status: "Planning",
    revenue: 18600000, units: 426, margin: 42, sellThrough: 89, inventoryLeft: 32,
    peakMonths: "Oct–Nov", nextFestival: "Oct 2025",
    topCategories: ["Kurtas (42%)", "Sarees (38%)", "Blouses (14%)"],
    color: "#C84B31"
  },
  {
    name: "Navratri 2025", emoji: "🎪", status: "Planning",
    revenue: 12900000, units: 297, margin: 38, sellThrough: 92, inventoryLeft: 16,
    peakMonths: "Sep–Oct", nextFestival: "Oct 2025",
    topCategories: ["Chaniya Choli (68%)", "Dupattas (22%)"],
    color: "#A8B89A"
  },
  {
    name: "Eid Collection", emoji: "🌙", status: "Completed",
    revenue: 9300000, units: 213, margin: 40, sellThrough: 84, inventoryLeft: 22,
    peakMonths: "Mar–Apr", nextFestival: "Mar 2026",
    topCategories: ["Salwar Suits (56%)", "Dupattas (28%)"],
    color: "#7B3F2B"
  },
  {
    name: "Summer Collection", emoji: "🌞", status: "Active",
    revenue: 7200000, units: 252, margin: 34, sellThrough: 62, inventoryLeft: 104,
    peakMonths: "Mar–Jun", nextFestival: "—",
    topCategories: ["Cotton Kurtis (58%)", "Linen Co-ords (28%)"],
    color: "#4F5E44"
  },
];


const statusColor: Record<string, string> = {
  Active: "#4ade80", Planning: "#D4A853", Completed: "#A8B89A"
};

const fmt = (v: number) => `₹${(v/100000).toFixed(1)}L`;

export default function SeasonalDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Seasonal Dashboard" subtitle="Festival sales · End-of-season analysis · Markdown planning" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Total Seasonal Revenue", value: "₹5.04Cr", badge: "+28% YoY" },
          { label: "Best Season", value: "Wedding", badge: "₹1.84Cr" },
          { label: "Avg Sell-through", value: "81%", badge: "Across all seasons" },
          { label: "End-of-Season Stock", value: "266 units", badge: "₹18.4L to markdown" },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 700, color: "#F0EAD6", marginBottom: "4px" }}>{k.value}</p>
            <span style={{ fontSize: "11px", color: "#D4A853" }}>{k.badge}</span>
          </div>
        ))}
      </div>

      {/* Season cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        {SEASONS.map((s) => (
          <div key={s.name} className="metric-card" style={{
            background: "#364430", border: "1px solid #4F5E44",
            borderRadius: "14px", overflow: "hidden",
            borderTop: `3px solid ${s.color}`
          }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #4F5E44", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "28px" }}>{s.emoji}</span>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#F0EAD6" }}>{s.name}</h3>
                  <p style={{ color: "#A8B89A", fontSize: "11px" }}>Peak: {s.peakMonths}</p>
                </div>
              </div>
              <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "20px", background: `${statusColor[s.status]}22`, color: statusColor[s.status], fontWeight: 600 }}>
                {s.status}
              </span>
            </div>

            <div style={{ padding: "16px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "14px" }}>
                {[
                  { l: "Revenue", v: fmt(s.revenue), c: "#D4A853" },
                  { l: "Units", v: s.units, c: "#F0EAD6" },
                  { l: "Margin", v: `${s.margin}%`, c: "#4ade80" },
                  { l: "Left", v: s.inventoryLeft, c: s.inventoryLeft > 80 ? "#f87171" : "#F0EAD6" },
                ].map(m => (
                  <div key={m.l} style={{ textAlign: "center", background: "#2E3B27", borderRadius: "6px", padding: "8px" }}>
                    <p style={{ fontSize: "9px", color: "#4F5E44", textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.l}</p>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: m.c, fontFamily: "'JetBrains Mono', monospace" }}>{m.v}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "11px", color: "#A8B89A" }}>Sell-through</span>
                  <span style={{ fontSize: "12px", color: "#F0EAD6", fontWeight: 600 }}>{s.sellThrough}%</span>
                </div>
                <div style={{ height: "6px", background: "#2E3B27", borderRadius: "3px" }}>
                  <div style={{ width: `${s.sellThrough}%`, height: "100%", background: s.color, borderRadius: "3px" }} />
                </div>
              </div>

              <div>
                <p style={{ fontSize: "10px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Top Categories</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {s.topCategories.map(c => (
                    <span key={c} style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "20px", background: "rgba(79,94,68,0.4)", color: "#A8B89A", border: "1px solid #4F5E44" }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Markdown requirements */}
      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>End-of-Season Markdown Requirements</h2>
        <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Collections requiring price reductions to clear stock</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={markdownData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
            <XAxis dataKey="collection" stroke="#A8B89A" tick={{ fontSize: 11 }} />
            <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
            <Bar dataKey="markdown" fill="#f87171" radius={[4,4,0,0]} name="% Markdown Needed" />
            <Bar dataKey="units" fill="#D4A853" radius={[4,4,0,0]} name="Units to Clear" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
