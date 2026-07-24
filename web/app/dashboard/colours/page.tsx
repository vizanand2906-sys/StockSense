"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";

const COLOURS = [
  { name: "Red", hex: "#C84B31", sales: 428000, inventory: 84, popular: true },
  { name: "Maroon", hex: "#7B3F2B", sales: 312000, inventory: 62, popular: true },
  { name: "Green", hex: "#3B6B3A", sales: 284000, inventory: 48, popular: false },
  { name: "Mustard", hex: "#D4A853", sales: 396000, inventory: 72, popular: true },
  { name: "Pink", hex: "#e86ba0", sales: 248000, inventory: 96, popular: false },
  { name: "White", hex: "#F0EAD6", sales: 198000, inventory: 114, popular: false },
  { name: "Black", hex: "#2a2a2a", sales: 224000, inventory: 56, popular: false },
  { name: "Navy", hex: "#1a2550", sales: 186000, inventory: 88, popular: false },
  { name: "Beige", hex: "#c8b89a", sales: 164000, inventory: 42, popular: false },
  { name: "Lavender", hex: "#b57bee", sales: 142000, inventory: 38, popular: false },
];

const radarData = COLOURS.slice(0, 6).map(c => ({
  colour: c.name,
  sales: Math.round(c.sales / 10000),
  inventory: c.inventory,
}));

const fmt = (v: number) => `₹${(v / 1000).toFixed(0)}K`;

export default function ColourDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Colour Dashboard" subtitle="Sales & inventory performance by colour" />

      {/* Top colours highlight */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
        {COLOURS.filter(c => c.popular).map(c => (
          <div key={c.name} style={{
            background: "#364430", border: `1px solid ${c.hex}66`,
            borderRadius: "12px", padding: "16px 20px",
            display: "flex", alignItems: "center", gap: "12px",
            flex: "1", minWidth: "180px"
          }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: c.hex, boxShadow: `0 0 12px ${c.hex}66` }} />
            <div>
              <p style={{ color: "#A8B89A", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>🔥 Popular</p>
              <p style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "16px" }}>{c.name}</p>
              <p style={{ color: "#D4A853", fontSize: "12px" }}>{fmt(c.sales)} sales</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        {/* Sales by colour */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Sales by Colour</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={COLOURS} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis type="number" stroke="#A8B89A" tick={{ fontSize: 9 }} tickFormatter={fmt} />
              <YAxis type="category" dataKey="name" stroke="#A8B89A" tick={{ fontSize: 11 }} width={65} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} formatter={(v: any) => [fmt(v), "Sales"]} />
              <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
                {COLOURS.map((c, i) => (
                  <rect key={i} fill={c.hex} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory by colour */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Inventory by Colour</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={COLOURS} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis type="number" stroke="#A8B89A" tick={{ fontSize: 9 }} />
              <YAxis type="category" dataKey="name" stroke="#A8B89A" tick={{ fontSize: 11 }} width={65} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
              <Bar dataKey="inventory" fill="#A8B89A" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Colour cards grid */}
      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Colour Performance Matrix</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
          {COLOURS.map(c => {
            const maxSales = Math.max(...COLOURS.map(x => x.sales));
            const pct = Math.round((c.sales / maxSales) * 100);
            return (
              <div key={c.name} style={{
                background: "#2E3B27", borderRadius: "10px", padding: "16px",
                border: `1px solid ${c.popular ? c.hex + "66" : "#4F5E44"}`,
                textAlign: "center"
              }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: c.hex, margin: "0 auto 10px",
                  boxShadow: c.popular ? `0 0 16px ${c.hex}55` : "none"
                }} />
                <p style={{ color: "#F0EAD6", fontWeight: 600, fontSize: "13px", marginBottom: "6px" }}>{c.name}</p>
                <p style={{ color: "#D4A853", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace" }}>{fmt(c.sales)}</p>
                <p style={{ color: "#A8B89A", fontSize: "11px", marginBottom: "8px" }}>{c.inventory} units</p>
                <div style={{ height: "4px", background: "#364430", borderRadius: "2px" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: c.hex, borderRadius: "2px", opacity: 0.8 }} />
                </div>
                {c.popular && <p style={{ color: "#D4A853", fontSize: "9px", marginTop: "6px", letterSpacing: "0.1em" }}>🔥 POPULAR</p>}
                {c.inventory < 50 && !c.popular && <p style={{ color: "#f87171", fontSize: "9px", marginTop: "6px" }}>↘ SLOW</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
