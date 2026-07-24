"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const fmtCr = (v: number) => `₹${(v / 10000000).toFixed(0)}Cr`;

const segmentData = [
  { name: "Trend-Chasers (Seg A)", boutiques: 1050000, wtp: 4500, color: "#C84B31" },
  { name: "Balanced Owners (Seg B)", boutiques: 2100000, wtp: 2750, color: "#D4A853" },
  { name: "Traditionalists (Seg C)", boutiques: 3850000, wtp: 0, color: "#4F5E44" },
];

const timingData = [
  { year: "2018", trendCycle: 90, leadTime: 21, gap: 69 },
  { year: "2020", trendCycle: 60, leadTime: 18, gap: 42 },
  { year: "2022", trendCycle: 21, leadTime: 14, gap: 7 },
  { year: "2024", trendCycle: 7, leadTime: 14, gap: -7 },
  { year: "2026", trendCycle: 3, leadTime: 12, gap: -9 },
];

export default function MarketPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Market Opportunity" subtitle="India Independent Apparel Retail · Demand Intelligence Gap" />

      {/* Hero numbers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Independent Boutiques in India", value: "7 Million", badge: "Addressable universe", up: true },
          { label: "With Access to Demand Intel", value: "≈ 0", badge: "Current state", up: false },
          { label: "Serviceable Market (Seg A+B)", value: "31.5L boutiques", badge: "Urban, trend-driven", up: true },
          { label: "Annual Revenue Opportunity", value: "₹378 Cr+", badge: "At ₹4,000/mo avg", up: true },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", marginBottom: "6px" }}>{k.value}</p>
            <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "20px", background: k.up ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)", color: k.up ? "#4ade80" : "#f87171" }}>
              {k.badge}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        {/* Segment breakdown */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Customer Segments</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Jayanagar field research · 3 distinct segments identified</p>
          {segmentData.map((s, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: "#F0EAD6", fontSize: "13px", fontWeight: 600 }}>{s.name}</span>
                <span style={{ color: s.color, fontSize: "13px", fontWeight: 700 }}>
                  {s.wtp > 0 ? `WTP ₹${s.wtp.toLocaleString()}/mo` : "Not targetted"}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ flex: 1, height: "8px", background: "#2E3B27", borderRadius: "4px" }}>
                  <div style={{ width: `${(s.boutiques / 7000000) * 100}%`, height: "100%", background: s.color, borderRadius: "4px" }} />
                </div>
                <span style={{ color: "#A8B89A", fontSize: "11px", minWidth: "60px" }}>
                  {(s.boutiques / 100000).toFixed(1)}L stores
                </span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "20px", padding: "14px 16px", background: "#2E3B27", borderRadius: "10px", border: "1px solid #C84B3133" }}>
            <p style={{ fontSize: "12px", color: "#A8B89A", marginBottom: "6px" }}>StockSense targets Segments A + B only</p>
            <p style={{ fontSize: "14px", color: "#C84B31", fontWeight: 700 }}>3.15 million boutiques · ₹378 Cr annual TAM</p>
          </div>
        </div>

        {/* The timing gap */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Why Now?</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Trend cycle (days) vs. supplier lead time (days) · 2018–2026</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timingData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis dataKey="year" stroke="#A8B89A" tick={{ fontSize: 11 }} />
              <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} label={{ value: "Days", angle: -90, position: "insideLeft", fill: "#A8B89A", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
              <Bar dataKey="trendCycle" fill="#C84B31" name="Trend cycle (days)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="leadTime" fill="#4F5E44" name="Supplier lead time (days)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ marginTop: "12px", padding: "12px 14px", background: "#C84B3115", border: "1px solid #C84B3133", borderRadius: "8px" }}>
            <p style={{ fontSize: "12px", color: "#C84B31", fontWeight: 700 }}>
              ⚠️ In 2026, trends peak in 2–3 days. Stock takes 12–14 days to arrive. The gap has never been wider.
            </p>
          </div>
        </div>
      </div>

      {/* Supporting evidence */}
      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>From the Field — Jayanagar, Bengaluru</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { quote: "Customers walk in showing me hyper-specific internet aesthetics on their phones at least 10–12 times a week.", name: "Boutique owner, Jayanagar", context: "Problem frequency confirmed" },
            { quote: "I lost ₹20,000 trying to chase a neon trend that was already fading by the time the physical stock arrived. Timing is everything.", name: "Tanvi, Boutique owner", context: "₹15K–₹50K per bad call" },
            { quote: "If an app could give me a one-week warning on trends, I would gladly pay ₹4,000 a month to avoid making bad bulk commitments.", name: "Boutique owner, Jayanagar", context: "WTP confirmed — Seg A" },
          ].map((q, i) => (
            <div key={i} style={{ padding: "18px", background: "#2E3B27", borderRadius: "10px", borderLeft: "3px solid #D4A853" }}>
              <p style={{ color: "#F0EAD6", fontSize: "13px", fontStyle: "italic", lineHeight: 1.6, marginBottom: "10px" }}>"{q.quote}"</p>
              <p style={{ color: "#D4A853", fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>— {q.name}</p>
              <span style={{ fontSize: "10px", color: "#4ade80", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{q.context}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
