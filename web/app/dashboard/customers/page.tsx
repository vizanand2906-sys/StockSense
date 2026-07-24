"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { syntheticLoyaltyData as loyaltyData } from "@/lib/syntheticData";

const SEGMENTS = [
  { name: "New Customers", value: 148, pct: 36, color: "#A8B89A", avg: "₹4,200" },
  { name: "Returning Customers", value: 124, pct: 30, color: "#C84B31", avg: "₹8,400" },
  { name: "VIP Customers", value: 42, pct: 10, color: "#D4A853", avg: "₹24,800" },
  { name: "Festival Shoppers", value: 68, pct: 17, color: "#7B3F2B", avg: "₹6,200" },
  { name: "Frequent Buyers", value: 28, pct: 7, color: "#4F5E44", avg: "₹18,400" },
];

const BEHAVIOUR = [
  { label: "Avg Basket Size", value: "₹8,350", icon: "🛍️" },
  { label: "Preferred Category", value: "Sarees", icon: "🥻" },
  { label: "Fav Colour", value: "Red / Mustard", icon: "🎨" },
  { label: "Fav Fabric", value: "Silk, Chanderi", icon: "🪡" },
  { label: "Fav Size", value: "M / L", icon: "📐" },
  { label: "Fav Price Range", value: "₹3K–₹8K", icon: "💰" },
  { label: "Purchase Frequency", value: "3.2x / year", icon: "📅" },
  { label: "Avg Between Purchases", value: "38 days", icon: "⏱️" },
];


export default function CustomerDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Customer Dashboard" subtitle="Segments · Behaviour · Loyalty Program" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Total Customers", value: "410", badge: "+42 this month" },
          { label: "Active Members", value: "284", badge: "69% of base" },
          { label: "Reward Points", value: "2,84,000", badge: "Issued" },
          { label: "Redemption Rate", value: "29%", badge: "+4% this month" },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", marginBottom: "6px" }}>{k.value}</p>
            <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "20px", background: "rgba(74,222,128,0.15)", color: "#4ade80" }}>{k.badge}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "24px", marginBottom: "24px" }}>
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Customer Segments</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={SEGMENTS} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                {SEGMENTS.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
            {SEGMENTS.map(s => (
              <div key={s.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "2px", background: s.color }} />
                  <span style={{ color: "#A8B89A", fontSize: "12px" }}>{s.name}</span>
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <span style={{ color: "#F0EAD6", fontSize: "12px", fontWeight: 600 }}>{s.value}</span>
                  <span style={{ color: "#4F5E44", fontSize: "11px" }}>{s.avg} avg</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Customer Behaviour Insights</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {BEHAVIOUR.map(b => (
              <div key={b.label} style={{ background: "#2E3B27", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{b.icon}</div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#F0EAD6", marginBottom: "4px" }}>{b.value}</p>
                <p style={{ fontSize: "10px", color: "#A8B89A" }}>{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Loyalty Program — Points & Redemptions</h2>
        <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Monthly trend</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={loyaltyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
            <XAxis dataKey="month" stroke="#A8B89A" tick={{ fontSize: 11 }} />
            <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
            <Bar dataKey="points" fill="#C84B31" radius={[4,4,0,0]} name="Points Issued" />
            <Bar dataKey="redemptions" fill="#D4A853" radius={[4,4,0,0]} name="Points Redeemed" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>🌟 VIP Customers</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Tap WhatsApp to reach a customer directly</p>
          {[
            { name: "Mrs. Priya Sharma", spend: "₹2,84,000", visits: 12, points: 28400, tag: "Mirror-work fan", lastSeen: "8 days ago", msg: "Hi Priya 🌸 We just got the Mirror-work Anarkali you loved last Diwali. Come see it this weekend — we've kept one aside for you!" },
            { name: "Ms. Anita Kapoor", spend: "₹1,96,000", visits: 9, points: 19600, tag: "Festive buyer", lastSeen: "22 days ago", msg: "Hi Anita 🎉 New pastel festive collection just arrived at Phulkari! Thought of you — these are perfect for the season." },
            { name: "Mrs. Deepa Menon", spend: "₹1,68,000", visits: 8, points: 16800, tag: "Silk & Chanderi", lastSeen: "45 days ago ⚠️", msg: "Hi Deepa 🪡 We've been missing you! Just got beautiful Chanderi pieces — your favourite. Come visit us soon." },
          ].map((c, i) => (
            <div key={i} style={{ padding: "14px 0", borderBottom: "1px solid rgba(79,94,68,0.4)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#C84B31", display: "flex", alignItems: "center", justifyContent: "center", color: "#F0EAD6", fontWeight: 700, fontSize: "14px", flexShrink: 0 }}>
                  {c.name.split(" ")[1][0]}
                </div>
                <div>
                  <p style={{ color: "#F0EAD6", fontWeight: 600, fontSize: "13px" }}>{c.name}</p>
                  <p style={{ color: "#A8B89A", fontSize: "11px" }}>{c.tag} · Last seen: {c.lastSeen}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                <span style={{ color: "#D4A853", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>{c.spend}</span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(c.msg)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "6px 12px", borderRadius: "8px", background: "#25D36622", border: "1px solid #25D36655", color: "#25D366", fontSize: "11px", fontWeight: 700, textDecoration: "none", cursor: "pointer", whiteSpace: "nowrap" }}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>🎂 Birthdays & 🤝 Referrals</h2>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontSize: "11px", color: "#D4A853", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Birthday Rewards (This Week)</p>
            {["Mrs. Lakshmi R.", "Ms. Sonal Gupta", "Mrs. Neha Verma"].map((n, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(79,94,68,0.3)" }}>
                <span style={{ color: "#F0EAD6", fontSize: "12px" }}>🎂 {n}</span>
                <span style={{ color: "#D4A853", fontSize: "11px" }}>15% Birthday Offer</span>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "#4ade80", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Referral Program</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { label: "Referrals Made", value: "64" },
                { label: "Converted", value: "28" },
                { label: "Revenue Attributed", value: "₹2.8L" },
                { label: "Conversion Rate", value: "44%" },
              ].map(r => (
                <div key={r.label} style={{ background: "#2E3B27", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                  <p style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "16px", fontFamily: "'JetBrains Mono', monospace" }}>{r.value}</p>
                  <p style={{ color: "#A8B89A", fontSize: "10px" }}>{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
