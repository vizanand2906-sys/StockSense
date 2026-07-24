"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { syntheticAgingData as agingData } from "@/lib/syntheticData";

const CATEGORIES = [
  { name: "Sarees", total: 284, available: 198, reserved: 24, newArrivals: 32, aging: 30, value: "₹28.4L" },
  { name: "Kurtas", total: 412, available: 312, reserved: 48, newArrivals: 52, aging: 0, value: "₹16.5L" },
  { name: "Lehengas", total: 68, available: 44, reserved: 12, newArrivals: 8, aging: 4, value: "₹10.2L" },
  { name: "Kurti Sets", total: 328, available: 248, reserved: 36, newArrivals: 44, aging: 0, value: "₹13.1L" },
  { name: "Salwar Suits", total: 196, available: 142, reserved: 22, newArrivals: 18, aging: 14, value: "₹7.8L" },
  { name: "Dupattas", total: 524, available: 412, reserved: 48, newArrivals: 64, aging: 0, value: "₹5.2L" },
];

const SIZE_MATRIX = {
  sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  categories: [
    { name: "Sarees", stock: [12, 28, 42, 38, 22, 8, 2], status: ["ok","ok","ok","ok","ok","low","low"] },
    { name: "Kurtas", stock: [24, 48, 68, 72, 52, 28, 12], status: ["ok","ok","ok","ok","ok","ok","ok"] },
    { name: "Lehengas", stock: [4, 8, 12, 10, 8, 2, 0], status: ["low","ok","ok","ok","ok","low","oos"] },
    { name: "Kurti Sets", stock: [18, 36, 52, 48, 38, 16, 6], status: ["ok","ok","ok","ok","ok","ok","low"] },
    { name: "Salwar Suits", stock: [8, 22, 34, 36, 28, 10, 4], status: ["low","ok","ok","ok","ok","ok","low"] },
    { name: "Dupattas", stock: [44, 82, 124, 118, 88, 48, 28], status: ["ok","ok","ok","ok","ok","ok","ok"] },
  ]
};


const fmt = (v: number) => `₹${(v / 100000).toFixed(0)}L`;

const statusColor = (s: string) =>
  s === "oos" ? "#f87171" : s === "low" ? "#D4A853" : "#4ade80";

export default function InventoryDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Inventory Dashboard" subtitle="Stock health · Aging · Size matrix" />

      {/* Summary KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Total Pieces", value: "1,812", sub: "Across all categories" },
          { label: "Inventory Value", value: "₹64.2L", sub: "At cost price" },
          { label: "Available Stock", value: "1,356", sub: "Ready to sell" },
          { label: "Reserved Stock", value: "190", sub: "Orders in process" },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "24px", fontWeight: 700, color: "#F0EAD6", marginBottom: "4px" }}>{k.value}</p>
            <p style={{ fontSize: "11px", color: "#4F5E44" }}>{k.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px", marginBottom: "24px" }}>
        {/* Category Breakdown */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Inventory by Category</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #4F5E44" }}>
                {["Category", "Total", "Available", "Reserved", "New", "Aging", "Value"].map(h => (
                  <th key={h} style={{ textAlign: "right", padding: "0 8px 8px", color: "#A8B89A", fontWeight: 600, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((c, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(79,94,68,0.4)" }}>
                  <td style={{ padding: "12px 8px", color: "#F0EAD6", fontWeight: 600, textAlign: "left" }}>{c.name}</td>
                  <td style={{ padding: "12px 8px", color: "#F0EAD6", textAlign: "right" }}>{c.total}</td>
                  <td style={{ padding: "12px 8px", color: "#4ade80", textAlign: "right" }}>{c.available}</td>
                  <td style={{ padding: "12px 8px", color: "#D4A853", textAlign: "right" }}>{c.reserved}</td>
                  <td style={{ padding: "12px 8px", color: "#A8B89A", textAlign: "right" }}>{c.newArrivals}</td>
                  <td style={{ padding: "12px 8px", textAlign: "right" }}>
                    {c.aging > 0 ? <span style={{ color: "#f87171" }}>{c.aging}</span> : <span style={{ color: "#4F5E44" }}>0</span>}
                  </td>
                  <td style={{ padding: "12px 8px", color: "#D4A853", fontWeight: 600, textAlign: "right" }}>{c.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Aging Chart */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Aging Inventory</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Units by days in stock</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={agingData} layout="vertical">
              <XAxis type="number" stroke="#A8B89A" tick={{ fontSize: 9 }} />
              <YAxis type="category" dataKey="bracket" stroke="#A8B89A" tick={{ fontSize: 10 }} width={80} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
              <Bar dataKey="units" fill="#C84B31" radius={[0, 4, 4, 0]}
                   label={{ position: "right", fill: "#A8B89A", fontSize: 10 }}
              />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ marginTop: "16px", padding: "12px", background: "rgba(200,75,49,0.1)", border: "1px solid rgba(200,75,49,0.3)", borderRadius: "8px" }}>
            <p style={{ color: "#f87171", fontSize: "12px", fontWeight: 600 }}>⚠️ 90 units aged 90+ days</p>
            <p style={{ color: "#A8B89A", fontSize: "11px", marginTop: "2px" }}>₹5.2L capital at risk</p>
          </div>
        </div>
      </div>

      {/* Size Matrix */}
      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6" }}>Size Matrix</h2>
          <div style={{ display: "flex", gap: "12px", fontSize: "11px" }}>
            {[{ label: "In Stock", color: "#4ade80" }, { label: "Low Stock", color: "#D4A853" }, { label: "Out of Stock", color: "#f87171" }].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "2px", background: l.color }} />
                <span style={{ color: "#A8B89A" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px 12px", color: "#A8B89A", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid #4F5E44" }}>Category</th>
                {SIZE_MATRIX.sizes.map(s => (
                  <th key={s} style={{ textAlign: "center", padding: "8px 12px", color: "#A8B89A", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid #4F5E44" }}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZE_MATRIX.categories.map((cat, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(79,94,68,0.3)" }}>
                  <td style={{ padding: "10px 12px", color: "#F0EAD6", fontWeight: 600 }}>{cat.name}</td>
                  {cat.stock.map((units, j) => (
                    <td key={j} style={{ padding: "10px 12px", textAlign: "center" }}>
                      <div style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: "36px", height: "28px", borderRadius: "6px",
                        background: `${statusColor(cat.status[j])}22`,
                        border: `1px solid ${statusColor(cat.status[j])}55`,
                        color: statusColor(cat.status[j]),
                        fontSize: "12px", fontWeight: 600,
                        fontFamily: "'JetBrains Mono', monospace"
                      }}>
                        {units === 0 ? "—" : units}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
