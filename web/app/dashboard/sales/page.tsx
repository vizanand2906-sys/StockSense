"use client";

import { useState } from "react";

import { FilterBar } from "@/components/layout/FilterBar";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

import { syntheticDailyData, syntheticHourlyData as hourlyData, syntheticRevenueData as monthlyData, syntheticCategoryData as categoryData, syntheticFestivalData as festivalData } from "@/lib/syntheticData";

const formatKpiLakhs = (v: number) => `₹${(v / 100000).toFixed(2)}L`;
const formatKpiNumber = (v: number) => `₹${v.toLocaleString('en-IN')}`;



const fmt = (v: number) => `₹${(v / 100000).toFixed(0)}L`;
const fmtK = (v: number) => `₹${(v / 1000).toFixed(0)}K`;

export default function SalesDashboardPage() {
  const [filter, setFilter] = useState("This Month");

  const getFilteredData = () => {
    if (filter === "Today") return syntheticDailyData.slice(-1);
    if (filter === "This Week") return syntheticDailyData.slice(-7);
    if (filter === "This Month") return syntheticDailyData;
    return syntheticDailyData;
  };

  const filteredData = getFilteredData();
  const totalSales = filteredData.reduce((sum, d) => sum + d.sales, 0);
  const totalOrders = filteredData.reduce((sum, d) => sum + d.orders, 0);
  const aov = totalOrders > 0 ? Math.floor(totalSales / totalOrders) : 0;
  
  // Use last 7 days for the daily chart if "Today" is selected (otherwise it looks empty)
  const chartData = (filter === "Today" ? syntheticDailyData.slice(-7) : filteredData).map(d => ({ day: d.dayOfWeek, sales: d.sales }));

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar 
        title="Sales Dashboard" 
        subtitle="Revenue · Orders · Growth · Category Breakdown" 
        onFilterChange={(f) => setFilter(f.date || "This Month")}
      />

      {/* Summary KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: `Revenue (${filter})`, value: formatKpiNumber(totalSales), badge: "+18%", up: true },
          { label: "Orders", value: totalOrders.toString(), badge: "+12%", up: true },
          { label: "Avg Order Value", value: formatKpiNumber(aov), badge: "+2%", up: true },
          { label: "YoY Growth", value: "+31%", badge: "vs last year", up: true },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "24px", fontWeight: 700, color: "#F0EAD6", marginBottom: "6px" }}>{k.value}</p>
            <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "20px", background: k.up ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)", color: k.up ? "#4ade80" : "#f87171" }}>
              {k.badge}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        {/* Hourly Sales */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Average Hourly Sales (Peak Analysis)</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Avg peak time across 4 weeks: 5pm (₹52K)</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="hrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4A853" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4A853" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis dataKey="hour" stroke="#A8B89A" tick={{ fontSize: 10 }} />
              <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} tickFormatter={fmtK} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} formatter={(v: any) => [fmtK(v), "Sales"]} />
              <Area type="monotone" dataKey="sales" stroke="#D4A853" fill="url(#hrGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Sales */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Daily Sales — {filter}</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Peak: Saturday (₹2.45L)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis dataKey="day" stroke="#A8B89A" tick={{ fontSize: 11 }} />
              <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} tickFormatter={fmt} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} formatter={(v: any) => [fmt(v), "Sales"]} />
              <Bar dataKey="sales" fill="#C84B31" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly YoY */}
      <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Year-over-Year Revenue Growth</h2>
        <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>2024 vs 2025 · Monthly comparison</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
            <XAxis dataKey="month" stroke="#A8B89A" tick={{ fontSize: 11 }} />
            <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} tickFormatter={fmt} />
            <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} formatter={(v: any) => [fmt(v), ""]} />
            <Legend wrapperStyle={{ color: "#A8B89A", fontSize: "12px" }} />
            <Line type="monotone" dataKey="target" stroke="#4F5E44" strokeWidth={2} name="Target" strokeDasharray="5 5" dot={false} />
            <Line type="monotone" dataKey="revenue" stroke="#C84B31" strokeWidth={2.5} name="Revenue" dot={{ fill: "#C84B31", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Sales by Category */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Sales by Category</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis type="number" stroke="#A8B89A" tick={{ fontSize: 10 }} tickFormatter={fmt} />
              <YAxis type="category" dataKey="name" stroke="#A8B89A" tick={{ fontSize: 11 }} width={80} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} formatter={(v: any) => [fmt(v), "Revenue"]} />
              <Bar dataKey="revenue" fill="#D4A853" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Festival Season */}
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Festival Season Sales</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {festivalData.map((f, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ color: "#F0EAD6", fontSize: "13px" }}>{f.name}</span>
                  <span style={{ color: "#D4A853", fontSize: "13px", fontWeight: 600 }}>{fmt(f.revenue)}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ flex: 1, height: "6px", background: "#2E3B27", borderRadius: "3px" }}>
                    <div style={{ width: `${(f.revenue / 18400000) * 100}%`, height: "100%", background: f.color, borderRadius: "3px" }} />
                  </div>
                  <span style={{ color: "#A8B89A", fontSize: "11px", minWidth: "50px" }}>{f.orders} orders</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
