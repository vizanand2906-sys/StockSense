"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const RETURN_REASONS = [
  { reason: "Size Issue", count: 84, color: "#C84B31" },
  { reason: "Colour Difference", count: 52, color: "#D4A853" },
  { reason: "Fit Issue", count: 48, color: "#A8B89A" },
  { reason: "Quality Concern", count: 28, color: "#7B3F2B" },
  { reason: "Damaged Product", count: 12, color: "#4F5E44" },
];

const byCategory = [
  { name: "Sarees", returns: 18, returnRate: 3.2 },
  { name: "Lehengas", returns: 24, returnRate: 7.8 },
  { name: "Kurti Sets", returns: 14, returnRate: 4.1 },
  { name: "Salwar Suits", returns: 22, returnRate: 6.2 },
  { name: "Dupattas", returns: 4, returnRate: 1.4 },
  { name: "Co-ord Sets", returns: 12, returnRate: 5.6 },
];

const byFabric = [
  { name: "Organza", returns: 28, rate: 9.2 },
  { name: "Velvet", returns: 16, rate: 6.8 },
  { name: "Georgette", returns: 22, rate: 5.4 },
  { name: "Silk", returns: 18, rate: 4.2 },
  { name: "Cotton", returns: 8, rate: 2.1 },
];

import { syntheticDailyData } from "@/lib/syntheticData";

const totalReturns = syntheticDailyData.reduce((sum, d) => sum + d.returns, 0);


export default function ReturnsDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Returns Dashboard" subtitle="Track returns by design · category · fabric · reason" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Total Returns (Month)", value: totalReturns.toString(), badge: "↑8 vs last month" },
          { label: "Overall Return Rate", value: "4.8%", badge: "Industry avg: 6%" },
          { label: "Revenue Impacted", value: "₹4.2L", badge: "Refunded / exchanged" },
          { label: "Exchange Rate", value: "68%", badge: "Of total returns" },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", marginBottom: "4px" }}>{k.value}</p>
            <p style={{ fontSize: "11px", color: "#4F5E44" }}>{k.badge}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Returns by Category</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={byCategory} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis type="number" stroke="#A8B89A" tick={{ fontSize: 10 }} />
              <YAxis type="category" dataKey="name" stroke="#A8B89A" tick={{ fontSize: 11 }} width={80} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
              <Bar dataKey="returnRate" fill="#C84B31" radius={[0,4,4,0]} name="Return Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Return Reasons</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={RETURN_REASONS} cx="50%" cy="50%" outerRadius={85} dataKey="count" paddingAngle={3}>
                {RETURN_REASONS.map((r, i) => <Cell key={i} fill={r.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginTop: "8px" }}>
            {RETURN_REASONS.map(r => (
              <div key={r.reason} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "2px", background: r.color, flexShrink: 0 }} />
                <span style={{ color: "#A8B89A", flex: 1 }}>{r.reason}</span>
                <span style={{ color: "#F0EAD6" }}>{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>⚠️ High-Return Fabrics</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {byFabric.map((f, i) => (
              <div key={i} style={{
                padding: "14px 16px",
                background: f.rate > 7 ? "rgba(200,75,49,0.1)" : "#2E3B27",
                border: `1px solid ${f.rate > 7 ? "rgba(200,75,49,0.4)" : "#4F5E44"}`,
                borderRadius: "8px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ color: "#F0EAD6", fontWeight: 600 }}>{f.name}</span>
                  <span style={{ color: f.rate > 7 ? "#f87171" : "#4ade80", fontWeight: 700 }}>{f.rate}%</span>
                </div>
                <div style={{ height: "4px", background: "#364430", borderRadius: "2px" }}>
                  <div style={{ width: `${(f.rate / 10) * 100}%`, height: "100%", background: f.rate > 7 ? "#f87171" : "#4ade80", borderRadius: "2px" }} />
                </div>
                <p style={{ color: "#A8B89A", fontSize: "11px", marginTop: "4px" }}>{f.returns} returns this month</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Returns by Collection</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { name: "Festive Collection", returns: 28, rate: "3.2%", action: "" },
              { name: "Wedding Collection", returns: 22, rate: "8.1%", action: "⚠️ Review" },
              { name: "Casual Collection", returns: 14, rate: "2.8%", action: "" },
              { name: "Office Wear", returns: 18, rate: "5.6%", action: "" },
              { name: "New Arrivals", returns: 12, rate: "4.2%", action: "" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(79,94,68,0.4)", alignItems: "center" }}>
                <div>
                  <span style={{ color: "#F0EAD6", fontSize: "13px" }}>{c.name}</span>
                  {c.action && <span style={{ marginLeft: "8px", fontSize: "11px", color: "#f87171" }}>{c.action}</span>}
                </div>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <span style={{ color: "#A8B89A", fontSize: "12px" }}>{c.returns} units</span>
                  <span style={{ color: parseFloat(c.rate) > 7 ? "#f87171" : "#4ade80", fontWeight: 700, fontSize: "12px", minWidth: "40px", textAlign: "right" }}>{c.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
