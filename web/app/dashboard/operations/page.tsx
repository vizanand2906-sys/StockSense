"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { syntheticPeakHoursData as peakHoursData } from "@/lib/syntheticData";

const STAFF = [
  { name: "Priyanka S.", revenue: 840000, orders: 68, conversion: 42, aov: 12350, rating: 4.8, upsell: 38 },
  { name: "Meena R.", revenue: 720000, orders: 84, conversion: 38, aov: 8571, rating: 4.6, upsell: 24 },
  { name: "Kavitha L.", revenue: 620000, orders: 72, conversion: 35, aov: 8611, rating: 4.5, upsell: 18 },
  { name: "Ananya M.", revenue: 480000, orders: 62, conversion: 32, aov: 7742, rating: 4.3, upsell: 12 },
];


const fmt = (v: number) => `₹${(v/100000).toFixed(1)}L`;

export default function OperationsDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Boutique Operations Dashboard" subtitle="Walk-ins · Staff Performance · Store Metrics" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Walk-ins Today", value: "82", badge: "↑12 vs yesterday" },
          { label: "Conversion Rate", value: "41%", badge: "+3% this week" },
          { label: "Avg Shopping Time", value: "42 min", badge: "Typical" },
          { label: "Trial Room Usage", value: "68%", badge: "Of walk-ins" },
          { label: "Avg Order Value", value: "₹9,200", badge: "+8% vs last week" },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "18px" }}>
            <p style={{ fontSize: "10px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 700, color: "#F0EAD6", marginBottom: "4px" }}>{k.value}</p>
            <span style={{ fontSize: "11px", color: "#4ade80" }}>{k.badge}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "4px" }}>Peak Shopping Hours</h2>
          <p style={{ color: "#A8B89A", fontSize: "12px", marginBottom: "16px" }}>Walk-ins by hour · Today</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4F5E44" />
              <XAxis dataKey="hour" stroke="#A8B89A" tick={{ fontSize: 10 }} />
              <YAxis stroke="#A8B89A" tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6" }} />
              <Bar dataKey="walkins" fill="#D4A853" radius={[4,4,0,0]} name="Walk-ins" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "16px" }}>Staff Performance</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #4F5E44" }}>
                {["Associate", "Revenue", "Orders", "Conv %", "AOV", "Rating", "Upsell"].map(h => (
                  <th key={h} style={{ textAlign: "right", padding: "0 6px 8px", color: "#A8B89A", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STAFF.map((s, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(79,94,68,0.4)" }}>
                  <td style={{ padding: "10px 6px", color: "#F0EAD6", fontWeight: 600, textAlign: "left", display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: ["#C84B31","#D4A853","#A8B89A","#7B3F2B"][i], display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#F0EAD6", flexShrink: 0 }}>
                      {s.name[0]}
                    </div>
                    {s.name}
                  </td>
                  <td style={{ padding: "10px 6px", color: "#D4A853", fontWeight: 600, textAlign: "right" }}>{fmt(s.revenue)}</td>
                  <td style={{ padding: "10px 6px", color: "#F0EAD6", textAlign: "right" }}>{s.orders}</td>
                  <td style={{ padding: "10px 6px", color: "#4ade80", textAlign: "right" }}>{s.conversion}%</td>
                  <td style={{ padding: "10px 6px", color: "#F0EAD6", textAlign: "right" }}>₹{(s.aov/1000).toFixed(1)}K</td>
                  <td style={{ padding: "10px 6px", textAlign: "right" }}>
                    <span style={{ color: "#D4A853" }}>★ {s.rating}</span>
                  </td>
                  <td style={{ padding: "10px 6px", color: "#A8B89A", textAlign: "right" }}>{s.upsell}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
