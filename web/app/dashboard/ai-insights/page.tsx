"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const RECOMMENDATIONS = [
  {
    type: "restock", priority: "urgent",
    title: "Restock Silk Banarasi Sarees — M & L",
    detail: "Only 3 units left across both sizes. Sold 48 units this month — likely to sell out in 4 days at current velocity.",
  },
  {
    type: "promo", priority: "high",
    title: "Mustard Chanderi Kurti Sets — Push Window Opening",
    detail: "Consistently top-searched product with high conversion. Festival season approaching — demand velocity is accelerating and the timing for a targeted push is ideal.",
  },
  {
    type: "upsell", priority: "medium",
    title: "Dupatta Cross-Sell Opportunity at Checkout",
    detail: "Customers buying sarees are 3.4x more likely to add a matching dupatta. Average order value increases by ₹1,800 when paired — this pattern is consistent across 3 months of data.",
  },
  {
    type: "forecast", priority: "high",
    title: "Diwali Demand Spike Forecast: Oct 12–28",
    detail: "Based on 2024 patterns, expect 3.2x normal daily sales during this window. Festive kurtas, lehengas, and sarees will be most affected — pre-stock positions are currently insufficient.",
  },
  {
    type: "returns", priority: "medium",
    title: "Elevated Return Rate on Organza Lehenga (Wedding)",
    detail: "Return rate is at 8.1% — significantly above the category average of 4.2%. The primary reason reported is sizing: XS is consistently too small, XL too large. This pattern has held for 6 weeks.",
  },
  {
    type: "clearance", priority: "low",
    title: "Monsoon Chic Kurta — 112 Days Unsold",
    detail: "68 units have been sitting for 112 days without movement. At current sell-through velocity, these will conflict with new arrivals and create floor congestion within 3 weeks.",
  },
  {
    type: "seasonal", priority: "high",
    title: "Navratri: Chaniya Choli Supply Risk in Red & Green",
    detail: "Historical sell-out analysis shows Red and Green variants deplete 2 full weeks before Navratri. Current stock levels are insufficient for projected demand — a shortage in October is likely.",
  },
  {
    type: "vip", priority: "medium",
    title: "14 High-Spend Customers Have Gone Inactive",
    detail: "These customers spent an average of ₹24,800 each in past cycles. None have made a purchase in 60+ days. This group historically responds to personalised outreach with a 62% re-engagement rate.",
  },
];

const demandForecast = [
  { week: "W1 Aug", predicted: 2.1, actual: 2.0 },
  { week: "W2 Aug", predicted: 2.4, actual: 2.3 },
  { week: "W3 Aug", predicted: 2.8, actual: null },
  { week: "W4 Aug", predicted: 3.2, actual: null },
  { week: "W1 Sep", predicted: 4.1, actual: null },
  { week: "W2 Sep", predicted: 5.8, actual: null },
];

const priorityConfig: Record<string, { color: string; bg: string; label: string }> = {
  urgent: { color: "#f87171", bg: "rgba(248,113,113,0.15)", label: "URGENT" },
  high: { color: "#D4A853", bg: "rgba(212,168,83,0.15)", label: "HIGH" },
  medium: { color: "#A8B89A", bg: "rgba(168,184,154,0.15)", label: "MEDIUM" },
  low: { color: "#4F5E44", bg: "rgba(79,94,68,0.15)", label: "LOW" },
};

export default function AIInsightsDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="AI Insights Dashboard" subtitle="Actionable recommendations powered by your store data" />

      {/* AI Banner */}
      <div style={{
        padding: "20px 28px", marginBottom: "28px",
        background: "linear-gradient(135deg, rgba(200,75,49,0.2) 0%, rgba(212,168,83,0.15) 100%)",
        border: "1px solid rgba(212,168,83,0.4)",
        borderRadius: "14px",
        display: "flex", alignItems: "center", gap: "16px"
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
        <div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#F0EAD6" }}>
            AI has analysed your store data and found <span style={{ color: "#D4A853" }}>8 key insights</span>
          </h2>
          <p style={{ color: "#A8B89A", fontSize: "13px", marginTop: "4px" }}>
            Based on sales velocity, inventory aging, customer behaviour, and seasonal patterns · Updated daily
          </p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "12px" }}>
          {[
            { label: "Urgent", count: 1, color: "#f87171" },
            { label: "High", count: 3, color: "#D4A853" },
            { label: "Medium", count: 3, color: "#A8B89A" },
          ].map(b => (
            <div key={b.label} style={{ textAlign: "center", padding: "8px 12px", background: `${b.color}22`, borderRadius: "8px", border: `1px solid ${b.color}44` }}>
              <p style={{ fontSize: "20px", fontWeight: 700, color: b.color, fontFamily: "'JetBrains Mono', monospace" }}>{b.count}</p>
              <p style={{ fontSize: "10px", color: "#A8B89A" }}>{b.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
        {RECOMMENDATIONS.map((r, i) => {
          const cfg = priorityConfig[r.priority];
          return (
            <div key={i} className="metric-card" style={{
              background: "#364430", border: "1px solid #4F5E44",
              borderRadius: "12px", padding: "20px",
              borderLeft: `3px solid ${cfg.color}`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <h3 style={{ color: "#F0EAD6", fontSize: "14px", fontWeight: 600, lineHeight: 1.3, flex: 1 }}>{r.title}</h3>
                <span style={{ fontSize: "9px", padding: "2px 6px", borderRadius: "20px", background: cfg.bg, color: cfg.color, fontWeight: 700, letterSpacing: "0.1em", flexShrink: 0, marginLeft: "12px" }}>
                  {cfg.label}
                </span>
              </div>
              <p style={{ color: "#A8B89A", fontSize: "12px", lineHeight: 1.6 }}>{r.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Demand Forecast Chart */}
      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6" }}>Demand Forecast — Aug–Sep 2025</h2>
        </div>
        <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Weekly revenue forecast (₹L) · Diwali build-up detected</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={demandForecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
            <XAxis dataKey="week" stroke="#A8B89A" tick={{ fontSize: 11 }} />
            <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} tickFormatter={v => `₹${v}L`} />
            <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} formatter={(v: number) => [`₹${v}L`, ""]} />
            <Line type="monotone" dataKey="actual" stroke="#4ade80" strokeWidth={2} name="Actual" dot={{ fill: "#4ade80", r: 4 }} connectNulls={false} />
            <Line type="monotone" dataKey="predicted" stroke="#D4A853" strokeWidth={2} strokeDasharray="5 5" name="Forecast" dot={{ fill: "#D4A853", r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
        <div style={{ display: "flex", gap: "20px", marginTop: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 20, height: 2, background: "#4ade80" }} />
            <span style={{ color: "#A8B89A", fontSize: "12px" }}>Actual Revenue</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 20, height: 2, background: "#D4A853", borderTop: "2px dashed #D4A853" }} />
            <span style={{ color: "#A8B89A", fontSize: "12px" }}>AI Forecast</span>
          </div>
        </div>
      </div>
    </div>
  );
}
