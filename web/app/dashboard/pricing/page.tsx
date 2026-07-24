"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter } from "recharts";
import { syntheticPromoData as promoData } from "@/lib/syntheticData";

const marginByCollection = [
  { name: "Wedding", fullPrice: 52, discounted: 34 },
  { name: "Festive", fullPrice: 48, discounted: 31 },
  { name: "Casual", fullPrice: 38, discounted: 24 },
  { name: "Office", fullPrice: 42, discounted: 28 },
  { name: "Summer", fullPrice: 36, discounted: 22 },
];


const aspTrend = [
  { month: "Jan", asp: 6800 }, { month: "Feb", asp: 7200 }, { month: "Mar", asp: 6900 },
  { month: "Apr", asp: 7800 }, { month: "May", asp: 7400 }, { month: "Jun", asp: 8100 },
  { month: "Jul", asp: 8350 },
];

const fmt = (v: number) => `₹${(v/100000).toFixed(1)}L`;

export default function PricingDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Pricing Dashboard" subtitle="ASP · Margins · Promotions · Markdown Effectiveness" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Avg Selling Price", value: "₹8,350", badge: "+8% vs last month" },
          { label: "Full-Price Sales", value: "71%", badge: "Of total revenue" },
          { label: "Discounted Sales", value: "29%", badge: "Of total revenue" },
          { label: "Avg Discount Depth", value: "18%", badge: "When on sale" },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", marginBottom: "4px" }}>{k.value}</p>
            <p style={{ fontSize: "11px", color: "#4ade80" }}>{k.badge}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>ASP Trend</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Average Selling Price — Jan to Jul 2025</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={aspTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis dataKey="month" stroke="#A8B89A" tick={{ fontSize: 11 }} />
              <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} tickFormatter={v => `₹${(v/1000).toFixed(1)}K`} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} formatter={(v: any) => [`₹${(v/1000).toFixed(1)}K`, "ASP"]} />
              <Line type="monotone" dataKey="asp" stroke="#D4A853" strokeWidth={2.5} dot={{ fill: "#D4A853", r: 4 }} name="ASP" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Margin by Collection</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={marginByCollection}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis dataKey="name" stroke="#A8B89A" tick={{ fontSize: 11 }} />
              <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
              <Bar dataKey="fullPrice" fill="#4ade80" radius={[4,4,0,0]} name="Full Price Margin %" />
              <Bar dataKey="discounted" fill="#f87171" radius={[4,4,0,0]} name="Discounted Margin %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Promotion Performance</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #4F5E44" }}>
              {["Promotion", "Revenue Generated", "Uplift %", "Effectiveness"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "0 12px 10px", color: "#A8B89A", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {promoData.map((p, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(79,94,68,0.4)" }}>
                <td style={{ padding: "12px", color: "#F0EAD6", fontWeight: 600 }}>{p.promo}</td>
                <td style={{ padding: "12px", color: "#D4A853", fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>{fmt(p.revenue)}</td>
                <td style={{ padding: "12px", color: "#4ade80" }}>+{p.uplift}%</td>
                <td style={{ padding: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ flex: 1, height: "6px", background: "#2E3B27", borderRadius: "3px", maxWidth: "200px" }}>
                      <div style={{ width: `${p.uplift * 2.5}%`, height: "100%", background: "#C84B31", borderRadius: "3px" }} />
                    </div>
                    <span style={{ color: "#A8B89A", fontSize: "11px" }}>{p.uplift >= 30 ? "High" : p.uplift >= 15 ? "Medium" : "Low"}</span>
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
