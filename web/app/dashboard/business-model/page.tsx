"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const projectionData = [
  { month: "Month 1", mrr: 12000, stores: 3 },
  { month: "Month 3", mrr: 48000, stores: 12 },
  { month: "Month 6", mrr: 160000, stores: 40 },
  { month: "Month 12", mrr: 600000, stores: 150 },
  { month: "Month 18", mrr: 1600000, stores: 400 },
  { month: "Month 24", mrr: 4000000, stores: 1000 },
];

const fmtMRR = (v: number) => v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : `₹${(v / 1000).toFixed(0)}K`;

export default function BusinessModelPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Business Model" subtitle="StockSense · Revenue Mechanism · Subscription SaaS" />

      {/* Primary hypothesis */}
      <div style={{ marginBottom: "28px", padding: "24px 28px", borderRadius: "14px", background: "#364430", border: "1px solid #C84B3144", borderLeft: "4px solid #C84B31" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C84B31", marginBottom: "10px" }}>Primary Revenue Hypothesis</p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", color: "#F0EAD6", lineHeight: 1.4 }}>
          Independent ethnic wear boutique owners pay a monthly subscription for buying intelligence 
          that tells them what to stock <em style={{ color: "#D4A853" }}>before</em> they go to the wholesale market.
        </p>
      </div>

      {/* Pricing tiers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          {
            tier: "Starter", price: "₹2,000/mo", segment: "Segment B — Balanced owners",
            features: ["Weekly trend digest", "Basic buying guide", "Sales dashboard", "Up to 200 SKUs"],
            color: "#4F5E44", wtp: "₹2,000–₹3,500/mo confirmed"
          },
          {
            tier: "Growth", price: "₹4,000/mo", segment: "Segment A — Trend-chasers",
            features: ["Daily trend signals", "Full buying guide + size correction", "CRM + WhatsApp outreach", "Unlimited SKUs", "Priority support"],
            color: "#C84B31", wtp: "₹3,000–₹6,000/mo confirmed", highlight: true
          },
          {
            tier: "Pro", price: "₹6,000/mo", segment: "Multi-store / franchise",
            features: ["Everything in Growth", "Multi-store dashboard", "Cross-store trend signals", "Dedicated onboarding"],
            color: "#D4A853", wtp: "Future tier"
          },
        ].map((t, i) => (
          <div key={i} style={{
            padding: "24px", borderRadius: "12px",
            background: t.highlight ? "#2E3B27" : "#364430",
            border: `1px solid ${t.color}${t.highlight ? "99" : "44"}`,
            borderTop: `4px solid ${t.color}`,
          }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: t.color, marginBottom: "8px" }}>{t.tier}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "28px", fontWeight: 700, color: "#F0EAD6", marginBottom: "4px" }}>{t.price}</p>
            <p style={{ fontSize: "12px", color: "#A8B89A", marginBottom: "16px" }}>{t.segment}</p>
            <div style={{ marginBottom: "16px" }}>
              {t.features.map((f, j) => (
                <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ color: t.color, fontSize: "12px", marginTop: "1px" }}>✓</span>
                  <span style={{ color: "#F0EAD6", fontSize: "12px" }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "8px 12px", borderRadius: "6px", background: t.color + "15", border: `1px solid ${t.color}33` }}>
              <p style={{ fontSize: "10px", color: t.color, fontWeight: 700 }}>{t.wtp}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        {/* MRR projection */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>MRR Projection</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Conservative · Growth tier avg ₹4,000/store/month</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis dataKey="month" stroke="#A8B89A" tick={{ fontSize: 9 }} />
              <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} tickFormatter={fmtMRR} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} formatter={(v: number) => [fmtMRR(v), "MRR"]} />
              <Bar dataKey="mrr" fill="#C84B31" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Unit economics */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Unit Economics</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { label: "ARPU (avg)", value: "₹4,000/mo", note: "Blended Starter + Growth" },
              { label: "Annual contract value", value: "₹48,000/store", note: "Per boutique" },
              { label: "Gross margin (SaaS)", value: "~80%", note: "Post-infra costs" },
              { label: "Payback period (est.)", value: "< 2 months", note: "CAC via direct sales low" },
              { label: "LTV (3-year avg)", value: "₹1,44,000", note: "At 24-month avg retention" },
              { label: "Churn deterrent", value: "Billing data lock-in", note: "Higher switching cost over time" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(79,94,68,0.4)" }}>
                <div>
                  <p style={{ color: "#F0EAD6", fontSize: "13px", fontWeight: 600 }}>{item.label}</p>
                  <p style={{ color: "#A8B89A", fontSize: "11px" }}>{item.note}</p>
                </div>
                <span style={{ color: "#D4A853", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: "14px" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BMC summary */}
      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Business Model Canvas — Key Blocks</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
          {[
            { label: "Customer Segments", content: "Independent ethnic wear boutiques · ₹20L–₹50L annual revenue · Trend-chasers (Seg A) + Balanced owners (Seg B) · Urban Bengaluru, expanding to Tier 1" },
            { label: "Value Proposition", content: "Demand intelligence before market day · Trend forecast + buying guide + size correction · Same capability as large retail chains — at ₹4,000/month" },
            { label: "Channels", content: "Direct founder sales (current) · WhatsApp community · Wholesale market presence · Referral from boutique networks" },
            { label: "Revenue Streams", content: "Monthly SaaS subscription · ₹2,000–₹6,000/month per store · No transaction fees · No setup cost" },
            { label: "Key Resources", content: "Billing data integrations (Vyapar, Marg) · Social signal pipeline · LLM attribute tagger · Cross-store network effects" },
            { label: "Cost Structure", content: "Infrastructure (AWS/cloud) · API costs (Instagram, weather) · Founder salaries · Sales & onboarding" },
          ].map((block, i) => (
            <div key={i} style={{ padding: "14px", background: "#2E3B27", borderRadius: "8px" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#D4A853", marginBottom: "8px" }}>{block.label}</p>
              <p style={{ color: "#F0EAD6", fontSize: "12px", lineHeight: 1.6 }}>{block.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
