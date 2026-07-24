"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import { syntheticDailyData } from "@/lib/syntheticData";

const last7Days = syntheticDailyData.slice(-7);
const weeklyTraffic = last7Days.map(d => ({
  day: d.dayOfWeek,
  visitors: d.onlineVisitors,
  conversions: d.orders,
}));

const totalWeeklyVisitors = last7Days.reduce((sum, d) => sum + d.onlineVisitors, 0);
const totalWeeklyConversions = last7Days.reduce((sum, d) => sum + d.orders, 0);
const conversionRate = ((totalWeeklyConversions / totalWeeklyVisitors) * 100).toFixed(1);

const TOP_PRODUCTS = [
  { name: "Crimson Banarasi Saree", views: 2840, sales: 48, wishlist: 312 },
  { name: "Velvet Festive Blouse", views: 2480, sales: 84, wishlist: 428 },
  { name: "Mustard Chanderi Kurti Set", views: 2240, sales: 72, wishlist: 248 },
  { name: "Ivory Organza Lehenga", views: 1960, sales: 24, wishlist: 364 },
  { name: "Navy Phulkari Dupatta", views: 1840, sales: 96, wishlist: 196 },
];

const SEARCH_TERMS = [
  { term: "banarasi silk saree", searches: 284, conversions: 22 },
  { term: "phulkari dupatta", searches: 248, conversions: 48 },
  { term: "diwali lehenga", searches: 212, conversions: 18 },
  { term: "mustard kurti set", searches: 196, conversions: 36 },
  { term: "velvet blouse design", searches: 168, conversions: 14 },
];

const fmt = (v: number) => `${(v/100).toFixed(0)}`;

export default function OnlineStoreDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Online Store Dashboard" subtitle="Traffic · Conversion · Cart Abandonment · Best Sellers" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Website Visitors (Week)", value: totalWeeklyVisitors.toLocaleString('en-IN'), badge: "+12% vs last week" },
          { label: "Conversion Rate", value: `${conversionRate}%`, badge: "+2.1pp" },
          { label: "Cart Abandonment", value: "64%", badge: "↓3% from last month" },
          { label: "Checkout Completion", value: "36%", badge: "Target: 42%" },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", marginBottom: "4px" }}>{k.value}</p>
            <p style={{ fontSize: "11px", color: "#D4A853" }}>{k.badge}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Weekly Traffic & Conversions</h2>
        <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Visitors vs Completed Orders</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={weeklyTraffic}>
            <defs>
              <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A8B89A" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#A8B89A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C84B31" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#C84B31" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
            <XAxis dataKey="day" stroke="#A8B89A" tick={{ fontSize: 11 }} />
            <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
            <Area type="monotone" dataKey="visitors" stroke="#A8B89A" fill="url(#visGrad)" strokeWidth={2} name="Visitors" />
            <Area type="monotone" dataKey="conversions" stroke="#C84B31" fill="url(#convGrad)" strokeWidth={2} name="Conversions" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Best-Selling Products Online</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {TOP_PRODUCTS.map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(79,94,68,0.4)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "18px", fontFamily: "'JetBrains Mono', monospace", color: "#D4A853", fontWeight: 700, minWidth: "20px" }}>#{i+1}</span>
                  <p style={{ color: "#F0EAD6", fontSize: "12px" }}>{p.name}</p>
                </div>
                <div style={{ display: "flex", gap: "12px", fontSize: "11px" }}>
                  <span style={{ color: "#A8B89A" }}>👁️ {p.views.toLocaleString()}</span>
                  <span style={{ color: "#4ade80" }}>✅ {p.sales}</span>
                  <span style={{ color: "#C84B31" }}>❤️ {p.wishlist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Top Search Terms</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {SEARCH_TERMS.map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ color: "#F0EAD6", fontSize: "12px" }}>🔍 "{s.term}"</span>
                  <div style={{ display: "flex", gap: "10px", fontSize: "11px" }}>
                    <span style={{ color: "#A8B89A" }}>{s.searches} searches</span>
                    <span style={{ color: "#4ade80" }}>{s.conversions} conv.</span>
                  </div>
                </div>
                <div style={{ height: "4px", background: "#2E3B27", borderRadius: "2px" }}>
                  <div style={{ width: `${(s.searches / 284) * 100}%`, height: "100%", background: "#D4A853", borderRadius: "2px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Wishlist Items (Top)</h2>
          {[
            { name: "Ivory Organza Lehenga", adds: 364, inStock: false },
            { name: "Velvet Festive Blouse", adds: 428, inStock: true },
            { name: "Crimson Banarasi Saree", adds: 312, inStock: true },
          ].map((w, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(79,94,68,0.4)", alignItems: "center" }}>
              <div>
                <p style={{ color: "#F0EAD6", fontSize: "13px" }}>❤️ {w.name}</p>
                <p style={{ color: "#A8B89A", fontSize: "11px" }}>{w.adds} wishlist adds</p>
              </div>
              <span style={{ fontSize: "11px", padding: "3px 8px", borderRadius: "20px", background: w.inStock ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)", color: w.inStock ? "#4ade80" : "#f87171" }}>
                {w.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          ))}
        </div>

        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Cart Abandonment Analysis</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { stage: "Visited Product", count: 4140, pct: 100 },
              { stage: "Added to Cart", count: 2484, pct: 60 },
              { stage: "Started Checkout", count: 1242, pct: 30 },
              { stage: "Completed Order", count: 928, pct: 22 },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ color: "#F0EAD6", fontSize: "12px" }}>{s.stage}</span>
                  <div style={{ display: "flex", gap: "12px", fontSize: "12px" }}>
                    <span style={{ color: "#A8B89A" }}>{s.count.toLocaleString()}</span>
                    <span style={{ color: "#D4A853", fontWeight: 600 }}>{s.pct}%</span>
                  </div>
                </div>
                <div style={{ height: "8px", background: "#2E3B27", borderRadius: "4px" }}>
                  <div style={{ width: `${s.pct}%`, height: "100%", background: `rgba(200,75,49,${0.3 + (s.pct/100) * 0.7})`, borderRadius: "4px" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
