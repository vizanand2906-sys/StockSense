"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const FABRICS = [
  { name: "Silk", revenue: 8400000, inventory: 124, margin: 52, sellThrough: 78 },
  { name: "Chanderi", revenue: 5600000, inventory: 218, margin: 44, sellThrough: 72 },
  { name: "Cotton", revenue: 4200000, inventory: 312, margin: 38, sellThrough: 68 },
  { name: "Organza", revenue: 3800000, inventory: 84, margin: 56, sellThrough: 65 },
  { name: "Georgette", revenue: 3200000, inventory: 196, margin: 42, sellThrough: 71 },
  { name: "Banarasi", revenue: 2900000, inventory: 62, margin: 60, sellThrough: 84 },
  { name: "Linen", revenue: 2400000, inventory: 148, margin: 40, sellThrough: 58 },
  { name: "Rayon", revenue: 1800000, inventory: 228, margin: 32, sellThrough: 62 },
  { name: "Muslin", revenue: 1400000, inventory: 184, margin: 34, sellThrough: 55 },
  { name: "Tissue", revenue: 1200000, inventory: 48, margin: 58, sellThrough: 80 },
  { name: "Velvet", revenue: 980000, inventory: 36, margin: 62, sellThrough: 88 },
];

const radarData = FABRICS.slice(0, 6).map(f => ({
  fabric: f.name, margin: f.margin, sellThrough: f.sellThrough
}));

const fmt = (v: number) => `₹${(v / 100000).toFixed(1)}L`;
const COLOURS = ["#C84B31","#D4A853","#A8B89A","#7B3F2B","#4F5E44","#e86ba0","#1a2550","#b57bee","#3B6B3A","#c8b89a","#2a2a2a"];

export default function FabricDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Fabric Dashboard" subtitle="Revenue · Inventory · Margin · Sell-through by fabric type" />

      {/* Top 3 fabrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {FABRICS.slice(0, 3).map((f, i) => (
          <div key={f.name} style={{
            background: "#364430", border: `1px solid ${COLOURS[i]}66`,
            borderRadius: "12px", padding: "20px",
            borderTop: `3px solid ${COLOURS[i]}`
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ color: "#A8B89A", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>#{i+1} by Revenue</span>
              <span style={{ color: COLOURS[i], fontSize: "12px", fontWeight: 700 }}>{f.margin}% margin</span>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", color: "#F0EAD6", marginBottom: "4px" }}>{f.name}</h3>
            <p style={{ color: "#D4A853", fontSize: "18px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, marginBottom: "12px" }}>{fmt(f.revenue)}</p>
            <div style={{ display: "flex", gap: "16px", fontSize: "12px" }}>
              <span style={{ color: "#A8B89A" }}>{f.inventory} units</span>
              <span style={{ color: "#4ade80" }}>{f.sellThrough}% sell-through</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        {/* Revenue chart */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Revenue by Fabric</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={FABRICS} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis type="number" stroke="#A8B89A" tick={{ fontSize: 9 }} tickFormatter={fmt} />
              <YAxis type="category" dataKey="name" stroke="#A8B89A" tick={{ fontSize: 11 }} width={70} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} formatter={(v: any) => [fmt(v), "Revenue"]} />
              <Bar dataKey="revenue" fill="#C84B31" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar margin vs sell-through */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Margin vs Sell-through</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "8px" }}>Top 6 fabrics comparison</p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#4F5E44" />
              <PolarAngleAxis dataKey="fabric" tick={{ fill: "#A8B89A", fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fill: "#4F5E44", fontSize: 8 }} />
              <Radar name="Margin %" dataKey="margin" stroke="#C84B31" fill="#C84B31" fillOpacity={0.3} />
              <Radar name="Sell-through %" dataKey="sellThrough" stroke="#D4A853" fill="#D4A853" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full fabric table */}
      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>All Fabrics — Performance Summary</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #4F5E44" }}>
              {["Fabric", "Revenue", "Inventory (Units)", "Gross Margin", "Sell-through %"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "0 12px 10px", color: "#A8B89A", fontWeight: 600, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FABRICS.map((f, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(79,94,68,0.4)" }}>
                <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "2px", background: COLOURS[i], flexShrink: 0 }} />
                  <span style={{ color: "#F0EAD6", fontWeight: 600 }}>{f.name}</span>
                </td>
                <td style={{ padding: "12px", color: "#D4A853", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{fmt(f.revenue)}</td>
                <td style={{ padding: "12px", color: "#F0EAD6" }}>{f.inventory}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ color: "#4ade80", fontWeight: 600 }}>{f.margin}%</span>
                </td>
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ flex: 1, height: "6px", background: "#2E3B27", borderRadius: "3px", maxWidth: "120px" }}>
                      <div style={{ width: `${f.sellThrough}%`, height: "100%", background: COLOURS[i], borderRadius: "3px" }} />
                    </div>
                    <span style={{ color: "#F0EAD6", minWidth: "34px", fontSize: "12px" }}>{f.sellThrough}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
