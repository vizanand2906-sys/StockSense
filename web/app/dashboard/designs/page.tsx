"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DESIGNS = [
  { code: "PKS-001", name: "Crimson Banarasi Silk Saree", emoji: "🥻", sold: 48, revenue: 216000, margin: 44, views: 2840, wishlist: 312, repeatBuys: 8, returns: 2, stockLeft: 12 },
  { code: "PKL-007", name: "Ivory Organza Lehenga", emoji: "👗", sold: 24, revenue: 384000, margin: 52, views: 1960, wishlist: 248, repeatBuys: 4, returns: 4, stockLeft: 6 },
  { code: "PKK-014", name: "Mustard Chanderi Kurti Set", emoji: "👘", sold: 72, revenue: 144000, margin: 38, views: 3240, wishlist: 428, repeatBuys: 18, returns: 6, stockLeft: 28 },
  { code: "PKD-022", name: "Navy Phulkari Dupatta", emoji: "🧣", sold: 96, revenue: 57600, margin: 62, views: 1840, wishlist: 196, repeatBuys: 24, returns: 1, stockLeft: 44 },
  { code: "PKC-051", name: "Maroon Mirror Work Co-ord", emoji: "👔", sold: 38, revenue: 95000, margin: 35, views: 1420, wishlist: 168, repeatBuys: 6, returns: 3, stockLeft: 18 },
  { code: "PKB-088", name: "Velvet Festive Blouse", emoji: "👙", sold: 124, revenue: 74400, margin: 58, views: 4120, wishlist: 582, repeatBuys: 32, returns: 4, stockLeft: 8 },
];

export default function DesignPerformancePage() {
  const maxRevenue = Math.max(...DESIGNS.map(d => d.revenue));

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Design Performance Dashboard" subtitle="Track every individual design · Sales · Wishlist · Returns" />

      {/* Chart: Revenue by design */}
      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Revenue by Design</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={DESIGNS.map(d => ({ name: d.code, revenue: d.revenue, margin: d.margin }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
            <XAxis dataKey="name" stroke="#A8B89A" tick={{ fontSize: 10 }} />
            <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
            <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} formatter={(v: any) => [`₹${(v/1000).toFixed(0)}K`, ""]} />
            <Bar dataKey="revenue" fill="#C84B31" radius={[4, 4, 0, 0]} name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Design performance table */}
      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px", overflowX: "auto" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Individual Design Metrics</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", minWidth: "900px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #4F5E44" }}>
              {["Design", "Sold", "Revenue", "Margin", "Views", "Wishlist", "Repeat Buys", "Returns", "Stock Left", "Trend"].map(h => (
                <th key={h} style={{ textAlign: h === "Design" ? "left" : "center", padding: "0 10px 10px", color: "#A8B89A", fontWeight: 600, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DESIGNS.map((d, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(79,94,68,0.3)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(79,94,68,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "12px 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "20px" }}>{d.emoji}</span>
                    <div>
                      <p style={{ color: "#F0EAD6", fontWeight: 600, fontSize: "12px" }}>{d.name}</p>
                      <p style={{ color: "#4F5E44", fontSize: "10px" }}>{d.code}</p>
                    </div>
                  </div>
                </td>
                <td style={{ textAlign: "center", color: "#4ade80", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{d.sold}</td>
                <td style={{ textAlign: "center", color: "#D4A853", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>₹{(d.revenue/1000).toFixed(0)}K</td>
                <td style={{ textAlign: "center", color: "#4ade80" }}>{d.margin}%</td>
                <td style={{ textAlign: "center", color: "#A8B89A" }}>{d.views.toLocaleString()}</td>
                <td style={{ textAlign: "center", color: "#D4A853" }}>❤️ {d.wishlist}</td>
                <td style={{ textAlign: "center", color: "#A8B89A" }}>🔁 {d.repeatBuys}</td>
                <td style={{ textAlign: "center" }}>
                  <span style={{ color: d.returns > 3 ? "#f87171" : "#4ade80" }}>{d.returns}</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span style={{ color: d.stockLeft < 10 ? "#f87171" : "#F0EAD6", fontWeight: 600 }}>{d.stockLeft}</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "60px", height: "20px", position: "relative" }}>
                      <svg viewBox="0 0 60 20" style={{ width: "60px", height: "20px" }}>
                        <polyline
                          points={[0,16,12,10,24,13,36,6,48,8,60,4].join(' ')}
                          fill="none" stroke="#C84B31" strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Engagement summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginTop: "24px" }}>
        {[
          { label: "Total Design Views", value: "15,420", icon: "👁️" },
          { label: "Total Wishlist Adds", value: "1,934", icon: "❤️" },
          { label: "Repeat Purchases", value: "92", icon: "🔁" },
          { label: "Return Rate (avg)", value: "3.3%", icon: "↩️" },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>{k.icon}</div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 700, color: "#F0EAD6", marginBottom: "4px" }}>{k.value}</p>
            <p style={{ fontSize: "11px", color: "#A8B89A" }}>{k.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
