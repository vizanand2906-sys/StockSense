"use client";

import { FilterBar } from "@/components/layout/FilterBar";
import { useState } from "react";

const PRODUCTS = [
  {
    code: "PKS-001", name: "Silk Banarasi Saree — Crimson",
    collection: "Wedding", fabric: "Silk", embroidery: "Zari Weave",
    colour: "Red", sizes: ["S","M","L","XL"], unitsSold: 48, revenue: "₹2,16,000",
    margin: "44%", stockRemaining: 12, sellThrough: "80%", daysInventory: 42, returnRate: "2%",
    emoji: "🥻"
  },
  {
    code: "PKK-014", name: "Chanderi Kurti Set — Mustard",
    collection: "Festive", fabric: "Chanderi", embroidery: "Block Print",
    colour: "Mustard", sizes: ["XS","S","M","L","XL","XXL"], unitsSold: 72, revenue: "₹1,44,000",
    margin: "38%", stockRemaining: 28, sellThrough: "72%", daysInventory: 28, returnRate: "4%",
    emoji: "👘"
  },
  {
    code: "PKL-007", name: "Organza Lehenga — Ivory",
    collection: "Wedding", fabric: "Organza", embroidery: "Hand Embroidery",
    colour: "White", sizes: ["S","M","L","XL"], unitsSold: 24, revenue: "₹3,84,000",
    margin: "52%", stockRemaining: 6, sellThrough: "80%", daysInventory: 58, returnRate: "8%",
    emoji: "👗"
  },
  {
    code: "PKD-022", name: "Linen Dupatta — Navy",
    collection: "Casual", fabric: "Linen", embroidery: "Phulkari Embroidery",
    colour: "Navy", sizes: ["One Size"], unitsSold: 96, revenue: "₹57,600",
    margin: "62%", stockRemaining: 44, sellThrough: "68%", daysInventory: 15, returnRate: "1%",
    emoji: "🧣"
  },
  {
    code: "PKS-038", name: "Georgette Salwar Suit — Lavender",
    collection: "Office Wear", fabric: "Georgette", embroidery: "Chikankari",
    colour: "Lavender", sizes: ["S","M","L","XL","XXL"], unitsSold: 56, revenue: "₹1,12,000",
    margin: "40%", stockRemaining: 22, sellThrough: "71%", daysInventory: 34, returnRate: "5%",
    emoji: "👚"
  },
  {
    code: "PKC-051", name: "Cotton Co-ord Set — Maroon",
    collection: "Casual", fabric: "Cotton", embroidery: "Mirror Work",
    colour: "Maroon", sizes: ["XS","S","M","L","XL"], unitsSold: 38, revenue: "₹95,000",
    margin: "35%", stockRemaining: 18, sellThrough: "67%", daysInventory: 48, returnRate: "3%",
    emoji: "👔"
  },
];

const COLOUR_MAP: Record<string, string> = {
  Red: "#C84B31", Mustard: "#D4A853", White: "#F0EAD6",
  Navy: "#1a2550", Lavender: "#b57bee", Maroon: "#7B3F2B"
};

export default function ProductDashboardPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("unitsSold");

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <FilterBar title="Product Dashboard" subtitle="Individual design performance · All collections" />

      {/* Search + Sort */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by product name or code…"
          style={{
            flex: 1, padding: "10px 16px",
            background: "#364430", border: "1px solid #4F5E44",
            borderRadius: "8px", color: "#F0EAD6", fontSize: "13px", outline: "none"
          }}
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{ padding: "10px 16px", background: "#364430", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6", fontSize: "13px", outline: "none", cursor: "pointer" }}
        >
          <option value="unitsSold">Sort: Units Sold</option>
          <option value="revenue">Sort: Revenue</option>
          <option value="margin">Sort: Margin</option>
          <option value="daysInventory">Sort: Days in Stock</option>
        </select>
      </div>

      {/* Product Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "20px" }}>
        {filtered.map((p) => (
          <div key={p.code} className="metric-card" style={{
            background: "#364430", border: "1px solid #4F5E44",
            borderRadius: "14px", overflow: "hidden"
          }}>
            {/* Card header with colour indicator */}
            <div style={{
              height: "80px",
              background: `linear-gradient(135deg, ${COLOUR_MAP[p.colour] || "#4F5E44"}33 0%, #2E3B27 100%)`,
              borderBottom: "1px solid #4F5E44",
              display: "flex", alignItems: "center", padding: "0 20px", gap: "16px"
            }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "10px",
                background: `${COLOUR_MAP[p.colour] || "#4F5E44"}44`,
                border: `2px solid ${COLOUR_MAP[p.colour] || "#4F5E44"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "24px", flexShrink: 0
              }}>
                {p.emoji}
              </div>
              <div>
                <p style={{ color: "#A8B89A", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.code}</p>
                <p style={{ color: "#F0EAD6", fontWeight: 600, fontSize: "14px", lineHeight: 1.3 }}>{p.name}</p>
              </div>
            </div>

            <div style={{ padding: "16px 20px" }}>
              {/* Tags */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                {[p.collection, p.fabric, p.embroidery, p.colour].map(tag => (
                  <span key={tag} style={{ padding: "2px 8px", background: "rgba(79,94,68,0.4)", borderRadius: "20px", fontSize: "10px", color: "#A8B89A", border: "1px solid #4F5E44" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Sizes */}
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "10px", color: "#A8B89A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>Available Sizes</p>
                <div style={{ display: "flex", gap: "4px" }}>
                  {p.sizes.map(s => (
                    <span key={s} style={{ padding: "2px 8px", background: "#2E3B27", border: "1px solid #4F5E44", borderRadius: "4px", fontSize: "11px", color: "#F0EAD6" }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "16px" }}>
                {[
                  { label: "Units Sold", value: p.unitsSold, color: "#4ade80" },
                  { label: "Revenue", value: p.revenue, color: "#D4A853" },
                  { label: "Margin", value: p.margin, color: "#4ade80" },
                  { label: "Stock Left", value: p.stockRemaining, color: p.stockRemaining < 10 ? "#f87171" : "#F0EAD6" },
                  { label: "Days Stocked", value: p.daysInventory, color: p.daysInventory > 90 ? "#f87171" : "#F0EAD6" },
                  { label: "Return Rate", value: p.returnRate, color: parseFloat(p.returnRate) > 6 ? "#f87171" : "#4ade80" },
                ].map(m => (
                  <div key={m.label} style={{ background: "#2E3B27", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
                    <p style={{ fontSize: "9px", color: "#4F5E44", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{m.label}</p>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: m.color, fontFamily: "'JetBrains Mono', monospace" }}>{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Sell-through bar */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "10px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sell-through</span>
                  <span style={{ fontSize: "12px", color: "#F0EAD6", fontWeight: 600 }}>{p.sellThrough}</span>
                </div>
                <div style={{ height: "6px", background: "#2E3B27", borderRadius: "3px" }}>
                  <div style={{ width: p.sellThrough, height: "100%", background: "linear-gradient(90deg, #C84B31, #D4A853)", borderRadius: "3px" }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
