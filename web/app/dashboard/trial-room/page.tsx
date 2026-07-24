"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const TRIED_PRODUCTS = [
  { name: "Ivory Organza Lehenga", tried: 48, purchased: 24, conversion: 50 },
  { name: "Crimson Banarasi Saree", tried: 42, purchased: 28, conversion: 67 },
  { name: "Mustard Chanderi Kurti Set", tried: 38, purchased: 22, conversion: 58 },
  { name: "Velvet Festive Blouse", tried: 36, purchased: 30, conversion: 83 },
  { name: "Maroon Co-ord Set", tried: 32, purchased: 12, conversion: 38 },
];

const REJECTED_REASONS = [
  { reason: "Wrong Size", count: 68, color: "#C84B31" },
  { reason: "Didn't Like Fit", count: 52, color: "#D4A853" },
  { reason: "Too Expensive", count: 38, color: "#A8B89A" },
  { reason: "Didn't Like Colour", count: 28, color: "#7B3F2B" },
  { reason: "Other", count: 14, color: "#4F5E44" },
];

export default function TrialRoomDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Trial Room Dashboard" subtitle="Tried · Purchased · Rejection Insights" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Garments Tried Today", value: "124", badge: "Across all customers" },
          { label: "Garments Purchased", value: "68", badge: "After trial" },
          { label: "Trial-to-Purchase", value: "55%", badge: "+3% vs last week" },
          { label: "Avg Garments Tried", value: "3.2", badge: "Per customer" },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", marginBottom: "4px" }}>{k.value}</p>
            <p style={{ fontSize: "11px", color: "#4F5E44" }}>{k.badge}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px", marginBottom: "24px" }}>
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Most Tried Products & Conversion</h2>
          {TRIED_PRODUCTS.map((p, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "#F0EAD6", fontSize: "13px", fontWeight: 600 }}>{p.name}</span>
                <div style={{ display: "flex", gap: "16px", fontSize: "12px" }}>
                  <span style={{ color: "#A8B89A" }}>Tried: {p.tried}</span>
                  <span style={{ color: "#4ade80" }}>Bought: {p.purchased}</span>
                  <span style={{ color: "#D4A853", fontWeight: 700 }}>{p.conversion}%</span>
                </div>
              </div>
              <div style={{ display: "flex", height: "8px", borderRadius: "4px", overflow: "hidden", background: "#2E3B27" }}>
                <div style={{ width: `${p.conversion}%`, height: "100%", background: "linear-gradient(90deg, #C84B31, #D4A853)" }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Rejection Reasons</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={REJECTED_REASONS} cx="50%" cy="50%" outerRadius={80} dataKey="count" paddingAngle={3}>
                {REJECTED_REASONS.map((r, i) => <Cell key={i} fill={r.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {REJECTED_REASONS.map((r) => (
              <div key={r.reason} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "2px", background: r.color }} />
                  <span style={{ color: "#A8B89A" }}>{r.reason}</span>
                </div>
                <span style={{ color: "#F0EAD6", fontWeight: 600 }}>{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Most Rejected Products</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { name: "Maroon Co-ord Set", reason: "Wrong Size (XL sold out)", tried: 32, purchased: 12 },
            { name: "Linen Kurti (XS)", reason: "Didn't Like Fit", tried: 24, purchased: 6 },
            { name: "Organza Saree (Beige)", reason: "Too Expensive", tried: 20, purchased: 4 },
          ].map((p, i) => (
            <div key={i} style={{ background: "#2E3B27", borderRadius: "10px", padding: "16px", borderLeft: "3px solid #f87171" }}>
              <p style={{ color: "#F0EAD6", fontWeight: 600, marginBottom: "4px" }}>{p.name}</p>
              <p style={{ color: "#f87171", fontSize: "12px", marginBottom: "10px" }}>⚠️ {p.reason}</p>
              <div style={{ display: "flex", gap: "16px", fontSize: "12px" }}>
                <span style={{ color: "#A8B89A" }}>Tried: {p.tried}</span>
                <span style={{ color: "#4ade80" }}>Bought: {p.purchased}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
