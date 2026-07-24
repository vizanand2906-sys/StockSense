"use client";

import { FilterBar } from "@/components/layout/FilterBar";

const COLLECTIONS = [
  {
    name: "Diwali Festive 2025", emoji: "🪔", season: "Festive",
    revenue: 8400000, units: 128, margin: 42, sellThrough: 89, inventoryLeft: 14,
    best: ["Crimson Banarasi Saree", "Velvet Blouse Set", "Mustard Dupatta"],
    worst: ["Navy Palazzo Set", "Beige Cotton Kurta"],
    status: "bestseller"
  },
  {
    name: "Wedding Collection", emoji: "💍", season: "Wedding",
    revenue: 6200000, units: 84, margin: 46, sellThrough: 74, inventoryLeft: 22,
    best: ["Ivory Organza Lehenga", "Maroon Silk Saree"],
    worst: ["Sage Green Dupatta", "Blush Co-ord Set"],
    status: "performing"
  },
  {
    name: "Navratri Special", emoji: "🎪", season: "Festive",
    revenue: 4800000, units: 96, margin: 38, sellThrough: 92, inventoryLeft: 8,
    best: ["Garba Chaniya Choli", "Red Ghagra Skirt"],
    worst: ["White Kurta (Oversized)"],
    status: "bestseller"
  },
  {
    name: "Casual Everyday", emoji: "☀️", season: "Casual",
    revenue: 3100000, units: 212, margin: 34, sellThrough: 61, inventoryLeft: 84,
    best: ["Linen Dupatta Navy", "Cotton Co-ord Maroon"],
    worst: ["Rayon Kurti XS", "Muslin Palazzo XXXL"],
    status: "slow"
  },
  {
    name: "Office Wear Edit", emoji: "💼", season: "Office",
    revenue: 2400000, units: 88, margin: 40, sellThrough: 67, inventoryLeft: 42,
    best: ["Lavender Georgette Suit", "Chanderi Kurti Set"],
    worst: ["Navy Linen Blazer"],
    status: "performing"
  },
  {
    name: "New Arrivals July", emoji: "🌟", season: "New",
    revenue: 1800000, units: 42, margin: 44, sellThrough: 48, inventoryLeft: 46,
    best: ["Tissue Silk Saree", "Velvet Jacket"],
    worst: ["Muslin Coord (Pink)"],
    status: "new"
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  bestseller: { label: "🏆 Bestseller", color: "#D4A853", bg: "rgba(212,168,83,0.15)" },
  performing: { label: "✅ On Track", color: "#4ade80", bg: "rgba(74,222,128,0.15)" },
  slow: { label: "⚠️ Slow-Moving", color: "#f87171", bg: "rgba(248,113,113,0.15)" },
  new: { label: "🌟 New", color: "#A8B89A", bg: "rgba(168,184,154,0.15)" },
};

const fmt = (v: number) => `₹${(v / 100000).toFixed(1)}L`;

export default function CollectionDashboardPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Collection Dashboard" subtitle="Performance analytics for every collection" />

      {/* Summary row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "Active Collections", value: "6", sub: "Currently in season" },
          { label: "Total Revenue", value: "₹2.67Cr", sub: "All collections" },
          { label: "Avg Sell-through", value: "72%", sub: "This season" },
          { label: "Avg Gross Margin", value: "41%", sub: "Across collections" },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "20px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{k.label}</p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", marginBottom: "4px" }}>{k.value}</p>
            <p style={{ fontSize: "11px", color: "#4F5E44" }}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Collection Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "20px" }}>
        {COLLECTIONS.map((c) => {
          const cfg = statusConfig[c.status];
          return (
            <div key={c.name} className="metric-card" style={{
              background: "#364430", border: "1px solid #4F5E44",
              borderRadius: "14px", overflow: "hidden"
            }}>
              {/* Header */}
              <div style={{
                padding: "20px 24px",
                background: "linear-gradient(135deg, rgba(79,94,68,0.4) 0%, rgba(46,59,39,0.8) 100%)",
                borderBottom: "1px solid #4F5E44",
                display: "flex", justifyContent: "space-between", alignItems: "flex-start"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "32px" }}>{c.emoji}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", marginBottom: "2px" }}>{c.name}</h3>
                    <span style={{ fontSize: "11px", color: "#A8B89A", letterSpacing: "0.05em" }}>{c.season} Season</span>
                  </div>
                </div>
                <span style={{ padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, color: cfg.color, background: cfg.bg }}>
                  {cfg.label}
                </span>
              </div>

              <div style={{ padding: "20px 24px" }}>
                {/* Key metrics */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "16px" }}>
                  {[
                    { label: "Revenue", value: fmt(c.revenue), color: "#D4A853" },
                    { label: "Units Sold", value: c.units, color: "#F0EAD6" },
                    { label: "Gross Margin", value: `${c.margin}%`, color: "#4ade80" },
                    { label: "Stock Left", value: c.inventoryLeft, color: c.inventoryLeft < 15 ? "#f87171" : "#F0EAD6" },
                  ].map(m => (
                    <div key={m.label} style={{ textAlign: "center", background: "#2E3B27", borderRadius: "8px", padding: "10px" }}>
                      <p style={{ fontSize: "9px", color: "#4F5E44", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{m.label}</p>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: m.color, fontFamily: "'JetBrains Mono', monospace" }}>{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Sell-through */}
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "11px", color: "#A8B89A" }}>Sell-through Rate</span>
                    <span style={{ fontSize: "12px", color: "#F0EAD6", fontWeight: 600 }}>{c.sellThrough}%</span>
                  </div>
                  <div style={{ height: "8px", background: "#2E3B27", borderRadius: "4px" }}>
                    <div style={{
                      width: `${c.sellThrough}%`, height: "100%",
                      background: c.sellThrough >= 85 ? "#4ade80" : c.sellThrough >= 65 ? "#D4A853" : "#f87171",
                      borderRadius: "4px", transition: "width 1s ease"
                    }} />
                  </div>
                </div>

                {/* Best & Worst */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <p style={{ fontSize: "10px", color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>⭐ Best Designs</p>
                    {c.best.map(b => (
                      <p key={b} style={{ fontSize: "11px", color: "#A8B89A", padding: "2px 0", borderBottom: "1px solid rgba(79,94,68,0.3)" }}>{b}</p>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontSize: "10px", color: "#f87171", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>📉 Worst Performers</p>
                    {c.worst.map(w => (
                      <p key={w} style={{ fontSize: "11px", color: "#A8B89A", padding: "2px 0", borderBottom: "1px solid rgba(79,94,68,0.3)" }}>{w}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
