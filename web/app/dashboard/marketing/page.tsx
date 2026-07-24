"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const CHANNELS = [
  {
    name: "Instagram", emoji: "📸", color: "#E1306C",
    reach: 48200, engagement: 8.4, orders: 284, revenue: 2840000, roas: 4.2
  },
  {
    name: "Facebook Ads", emoji: "👥", color: "#1877F2",
    reach: 32400, engagement: 4.2, orders: 168, revenue: 1680000, roas: 3.1
  },
  {
    name: "Google Ads", emoji: "🔍", color: "#4285F4",
    reach: 28800, engagement: 2.8, orders: 142, revenue: 1420000, roas: 2.8
  },
  {
    name: "WhatsApp", emoji: "💬", color: "#25D366",
    reach: 12400, engagement: 62.4, orders: 214, revenue: 1926000, roas: 6.8
  },
  {
    name: "Email", emoji: "📧", color: "#D4A853",
    reach: 8400, engagement: 24.8, orders: 96, revenue: 864000, roas: 4.1
  },
  {
    name: "Influencers", emoji: "🌟", color: "#C84B31",
    reach: 124000, engagement: 6.2, orders: 198, revenue: 1782000, roas: 3.6
  },
];

const monthlyMarketing = [
  { month: "Jan", instagram: 180000, whatsapp: 120000, google: 90000 },
  { month: "Feb", instagram: 220000, whatsapp: 148000, google: 110000 },
  { month: "Mar", instagram: 280000, whatsapp: 168000, google: 130000 },
  { month: "Apr", instagram: 320000, whatsapp: 192000, google: 148000 },
  { month: "May", instagram: 248000, whatsapp: 180000, google: 124000 },
  { month: "Jun", instagram: 368000, whatsapp: 214000, google: 168000 },
  { month: "Jul", instagram: 284000, whatsapp: 196000, google: 142000 },
];

const fmt = (v: number) => `₹${(v/100000).toFixed(1)}L`;

export default function MarketingDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Marketing Dashboard" subtitle="Campaign Performance · ROAS · Reach · Orders Generated" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Total Reach", value: "2,54,200", badge: "All channels" },
          { label: "Total Orders", value: "1,102", badge: "From marketing" },
          { label: "Marketing Revenue", value: "₹95.1L", badge: "Attributed" },
          { label: "Best ROAS", value: "6.8x", badge: "WhatsApp" },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", marginBottom: "4px" }}>{k.value}</p>
            <p style={{ fontSize: "11px", color: "#D4A853" }}>{k.badge}</p>
          </div>
        ))}
      </div>

      {/* Channel cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {CHANNELS.map((c) => (
          <div key={c.name} className="metric-card" style={{
            background: "#364430", border: "1px solid #4F5E44",
            borderRadius: "12px", padding: "20px",
            borderLeft: `3px solid ${c.color}`
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "24px" }}>{c.emoji}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#F0EAD6" }}>{c.name}</h3>
              </div>
              <span style={{ padding: "3px 8px", borderRadius: "20px", background: `${c.color}22`, color: c.color, fontSize: "12px", fontWeight: 700 }}>
                {c.roas}x ROAS
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
              {[
                { l: "Reach", v: c.reach.toLocaleString() },
                { l: "Engagement", v: `${c.engagement}%` },
                { l: "Orders", v: c.orders },
                { l: "Revenue", v: fmt(c.revenue) },
              ].map(m => (
                <div key={m.l} style={{ background: "#2E3B27", borderRadius: "8px", padding: "10px" }}>
                  <p style={{ fontSize: "9px", color: "#4F5E44", textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.l}</p>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#F0EAD6", fontFamily: "'JetBrains Mono', monospace" }}>{m.v}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Monthly Revenue by Channel</h2>
        <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Instagram · WhatsApp · Google Ads</p>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={monthlyMarketing}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
            <XAxis dataKey="month" stroke="#A8B89A" tick={{ fontSize: 11 }} />
            <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} tickFormatter={fmt} />
            <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} formatter={(v: number) => [fmt(v), ""]} />
            <Line type="monotone" dataKey="instagram" stroke="#E1306C" strokeWidth={2} name="Instagram" dot={false} />
            <Line type="monotone" dataKey="whatsapp" stroke="#25D366" strokeWidth={2} name="WhatsApp" dot={false} />
            <Line type="monotone" dataKey="google" stroke="#4285F4" strokeWidth={2} name="Google" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
