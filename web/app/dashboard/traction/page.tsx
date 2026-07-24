"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const accuracyData = [
  { sample: "Raw exports (no fine-tuning)", accuracy: 78 },
  { sample: "Items with descriptive names", accuracy: 91 },
  { sample: "Post one-shot prompting", accuracy: 86 },
];

const pilotTimeline = [
  { week: "Wk 1–2", activity: "Field interviews · 3 segments · Jayanagar, Bengaluru", outcome: "Problem confirmed · WTP signals collected" },
  { week: "Wk 3–4", activity: "Technical spike · LLM tagger on Vyapar CSV exports", outcome: "78% accuracy (raw) · 91% (descriptive names)" },
  { week: "Wk 5–6", activity: "PoC build · 27 dashboard views · Synthetic data pipeline", outcome: "Full product demo-ready · Phulkari pilot onboarded" },
  { week: "Wk 7", activity: "Phulkari pilot · Live product shown · Feedback collected", outcome: "Buying guide used · WhatsApp CRM demoed · Positive signal" },
];

export default function TractionPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Traction & Validation" subtitle="What Was Built · What Was Tested · What We Learned" />

      {/* Build status */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Dashboard Views Built", value: "27", badge: "Live & running", up: true },
          { label: "LLM Tagger Accuracy", value: "91%", badge: "Descriptive SKUs", up: true },
          { label: "Field Interviews", value: "12+", badge: "3 segments · Jayanagar", up: true },
          { label: "Pilot Stores", value: "1 live", badge: "Phulkari · July 2026", up: true },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", marginBottom: "6px" }}>{k.value}</p>
            <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "20px", background: "rgba(74,222,128,0.15)", color: "#4ade80" }}>{k.badge}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        {/* LLM Tagger Results */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Technical Validation</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>LLM attribute tagger · Raw Vyapar CSV exports · No fine-tuning</p>
          {accuracyData.map((d, i) => (
            <div key={i} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "#F0EAD6", fontSize: "13px" }}>{d.sample}</span>
                <span style={{ color: d.accuracy >= 90 ? "#4ade80" : "#D4A853", fontWeight: 700, fontSize: "14px", fontFamily: "'JetBrains Mono', monospace" }}>{d.accuracy}%</span>
              </div>
              <div style={{ height: "8px", background: "#2E3B27", borderRadius: "4px" }}>
                <div style={{ width: `${d.accuracy}%`, height: "100%", background: d.accuracy >= 90 ? "#4ade80" : "#D4A853", borderRadius: "4px", transition: "width 0.5s" }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: "16px", padding: "12px 14px", background: "#2E3B27", borderRadius: "8px" }}>
            <p style={{ fontSize: "12px", color: "#A8B89A" }}>
              Tested on real Vyapar exports from 3 boutiques in Jayanagar. Pipeline confirmed viable.
              Integration with Marg and Busy billing systems follows the same architecture.
            </p>
          </div>
        </div>

        {/* What we built */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>What Is Running Today</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { feature: "Trend Intelligence Engine", status: "Live", note: "Instagram signals + sparklines + shop panel" },
              { feature: "Pre-Market Buying Guide", status: "Live", note: "Generate guide · SKU list · size correction" },
              { feature: "Sales & Revenue Dashboard", status: "Live", note: "4-week synthetic data · filter by day/week/month" },
              { feature: "Inventory Aging & Health", status: "Live", note: "Slow-movers flagged · markdown prompts" },
              { feature: "Customer CRM + WhatsApp", status: "Live", note: "VIP list · personalised WA message per customer" },
              { feature: "Executive Overview", status: "Live", note: "12 KPI cards · YoY charts · top collections" },
              { feature: "LLM Billing Data Tagger", status: "Validated", note: "78–91% accuracy on raw Vyapar exports" },
              { feature: "Cross-store Network Signal", status: "Roadmap", note: "Requires ≥10 live stores · Q4 2026" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#2E3B27", borderRadius: "8px" }}>
                <div>
                  <p style={{ color: "#F0EAD6", fontSize: "13px", fontWeight: 600 }}>{item.feature}</p>
                  <p style={{ color: "#A8B89A", fontSize: "11px" }}>{item.note}</p>
                </div>
                <span style={{
                  fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "20px",
                  background: item.status === "Live" ? "#4ade8022" : item.status === "Validated" ? "#D4A85322" : "#4F5E4422",
                  color: item.status === "Live" ? "#4ade80" : item.status === "Validated" ? "#D4A853" : "#A8B89A",
                  border: `1px solid ${item.status === "Live" ? "#4ade8044" : item.status === "Validated" ? "#D4A85344" : "#4F5E4444"}`,
                  whiteSpace: "nowrap",
                }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pilot timeline */}
      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Build & Validation Timeline</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {pilotTimeline.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr 1fr", gap: "16px", padding: "14px 0", borderBottom: "1px solid rgba(79,94,68,0.4)" }}>
              <div style={{ paddingTop: "2px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#D4A853", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.week}</span>
              </div>
              <p style={{ color: "#A8B89A", fontSize: "13px", lineHeight: 1.5 }}>{item.activity}</p>
              <p style={{ color: "#4ade80", fontSize: "13px", lineHeight: 1.5, fontWeight: 600 }}>→ {item.outcome}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Evolution — what changed */}
      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>What We Learned — The Evolution</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { week: "Week 1 Belief", text: "Dead stock is the core problem. Boutiques need inventory optimisation.", arrow: false },
            { week: "What Changed", text: "Field interviews revealed: dead stock is the consequence, not the cause. The real problem is missed trends — the customer who walked in and left empty-handed.", arrow: true },
            { week: "Where We Landed", text: "StockSense is a forward-looking intelligence tool, not a backward-looking analytics tool. We tell you what to buy tomorrow, not what you should have bought last month.", arrow: false },
          ].map((item, i) => (
            <div key={i} style={{ padding: "18px", background: "#2E3B27", borderRadius: "10px", position: "relative" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: i === 0 ? "#f87171" : i === 1 ? "#D4A853" : "#4ade80", marginBottom: "10px" }}>{item.week}</p>
              <p style={{ color: "#F0EAD6", fontSize: "13px", lineHeight: 1.7 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
