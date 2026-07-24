"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

import { syntheticRevenueData as revenueData, syntheticCollectionData as collectionData } from "@/lib/syntheticData";

const KPI_CARDS = [
  { label: "Today's Revenue", value: "₹1,24,500", change: "+18%", up: true, sub: "vs yesterday" },
  { label: "Orders Today", value: "34", change: "+8", up: true, sub: "vs yesterday" },
  { label: "Monthly Revenue", value: "₹41.3L", change: "+22%", up: true, sub: "vs last month" },
  { label: "YTD Revenue", value: "₹2.1Cr", change: "+31%", up: true, sub: "vs last year" },
  { label: "Gross Profit", value: "₹11.2L", change: "+19%", up: true, sub: "This month" },
  { label: "Gross Margin %", value: "39.4%", change: "+2.1pp", up: true, sub: "vs last month" },
  { label: "Avg Order Value", value: "₹8,350", change: "+5%", up: true, sub: "This month" },
  { label: "Units per Order", value: "2.3", change: "−0.1", up: false, sub: "This month" },
  { label: "Conversion Rate", value: "28%", change: "+3pp", up: true, sub: "Walk-ins this week" },
  { label: "Returning Customers", value: "41%", change: "+6pp", up: true, sub: "This month" },
  { label: "Inventory Value", value: "₹64.2L", change: "−4%", up: false, sub: "Current" },
  { label: "Sell-through Rate", value: "67%", change: "+9%", up: true, sub: "This season" },
];


const topCollections = [
  { name: "Diwali Festive 2025", revenue: "₹8.4L", units: 128, margin: "42%", sellThrough: "89%" },
  { name: "Wedding Collection", revenue: "₹6.2L", units: 84, margin: "46%", sellThrough: "74%" },
  { name: "Navratri Special", revenue: "₹4.8L", units: 96, margin: "38%", sellThrough: "92%" },
  { name: "Summer Breeze", revenue: "₹3.1L", units: 67, margin: "35%", sellThrough: "61%" },
  { name: "New Arrivals July", revenue: "₹2.4L", units: 42, margin: "44%", sellThrough: "48%" },
];

const slowMoving = [
  { name: "Monsoon Chic Kurta", days: 112, units: 18, value: "₹1.2L" },
  { name: "Linen Co-ord Set (XS)", days: 98, units: 6, value: "₹48K" },
  { name: "Navy Banarasi Dupatta", days: 94, units: 22, value: "₹66K" },
];

const fmt = (v: number) => `₹${(v / 100000).toFixed(1)}L`;

export default function ExecutiveDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar
        title="Executive Dashboard"
        subtitle="Phulkari by Preeth Design Studios · Business Overview"
      />

      {/* KPI Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        {KPI_CARDS.map((kpi) => (
          <div key={kpi.label} className="metric-card" style={{
            background: "#364430", border: "1px solid #4F5E44",
            borderRadius: "12px", padding: "20px",
          }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>{kpi.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", marginBottom: "6px" }}>{kpi.value}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{
                fontSize: "11px", fontWeight: 600, padding: "2px 6px", borderRadius: "20px",
                background: kpi.up ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)",
                color: kpi.up ? "#4ade80" : "#f87171"
              }}>
                {kpi.change}
              </span>
              <span style={{ fontSize: "11px", color: "#4F5E44" }}>{kpi.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue vs Target Chart */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px", marginBottom: "24px" }}>
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Revenue vs Target</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "20px" }}>Monthly comparison · Jan–Jul 2025</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C84B31" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C84B31" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis dataKey="month" stroke="#A8B89A" tick={{ fontSize: 11 }} />
              <YAxis stroke="#A8B89A" tick={{ fontSize: 11 }} tickFormatter={fmt} />
              <Tooltip
                contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }}
                formatter={(v: any) => [fmt(v), ""]}
              />
              <Area type="monotone" dataKey="target" stroke="#D4A853" strokeDasharray="5 5" fill="none" strokeWidth={2} name="Target" />
              <Area type="monotone" dataKey="revenue" stroke="#C84B31" fill="url(#revGrad)" strokeWidth={2} name="Revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Sales by Collection</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "12px" }}>Revenue split this month</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={collectionData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {collectionData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
            {collectionData.map(c => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                <span style={{ color: "#A8B89A", flex: 1 }}>{c.name}</span>
                <span style={{ color: "#F0EAD6", fontWeight: 600 }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Collections + Slow Moving */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Top Performing Collections</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #4F5E44" }}>
                {["Collection", "Revenue", "Units", "Margin", "Sell-thru"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "0 8px 8px", color: "#A8B89A", fontWeight: 600, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topCollections.map((c, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(79,94,68,0.4)" }}>
                  <td style={{ padding: "10px 8px", color: "#F0EAD6" }}>{c.name}</td>
                  <td style={{ padding: "10px 8px", color: "#D4A853", fontWeight: 600 }}>{c.revenue}</td>
                  <td style={{ padding: "10px 8px", color: "#A8B89A" }}>{c.units}</td>
                  <td style={{ padding: "10px 8px", color: "#4ade80" }}>{c.margin}</td>
                  <td style={{ padding: "10px 8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ flex: 1, height: "4px", background: "#2E3B27", borderRadius: "2px" }}>
                        <div style={{ width: c.sellThrough, height: "100%", background: "#C84B31", borderRadius: "2px" }} />
                      </div>
                      <span style={{ color: "#F0EAD6", fontSize: "11px", minWidth: "30px" }}>{c.sellThrough}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>⚠️ Slow-Moving Inventory</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Items older than 90 days — review for markdowns</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {slowMoving.map((item, i) => (
              <div key={i} style={{ padding: "16px", background: "rgba(200,75,49,0.1)", border: "1px solid rgba(200,75,49,0.3)", borderRadius: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "#F0EAD6", fontWeight: 600, fontSize: "13px" }}>{item.name}</span>
                  <span style={{ color: "#f87171", fontSize: "12px", fontWeight: 600 }}>{item.days} days</span>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                  <span style={{ color: "#A8B89A", fontSize: "12px" }}>{item.units} units</span>
                  <span style={{ color: "#D4A853", fontSize: "12px", fontWeight: 600 }}>{item.value} locked</span>
                </div>
              </div>
            ))}
          </div>
          <button style={{ marginTop: "16px", width: "100%", padding: "10px", background: "rgba(200,75,49,0.2)", border: "1px solid #C84B31", borderRadius: "8px", color: "#C84B31", fontSize: "13px", cursor: "pointer" }}>
            View Markdown Recommendations →
          </button>
        </div>
      </div>
    </div>
  );
}
