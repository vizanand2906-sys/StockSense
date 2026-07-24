"use client";

import { useState } from "react";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

const FILTERS = [
  { key: "date", label: "Date Range", options: ["Today", "This Week", "This Month", "This Quarter", "This Year", "Custom"] },
  { key: "collection", label: "Collection", options: ["All", "Festive", "Wedding", "Casual", "Office Wear", "Summer", "Monsoon", "Winter", "New Arrivals"] },
  { key: "category", label: "Category", options: ["All", "Sarees", "Kurtas", "Kurti Sets", "Salwar Suits", "Lehengas", "Dupattas", "Blouses", "Bottom Wear", "Co-ord Sets", "Jackets"] },
  { key: "fabric", label: "Fabric", options: ["All", "Cotton", "Silk", "Chanderi", "Linen", "Organza", "Georgette", "Rayon", "Muslin", "Banarasi", "Velvet"] },
  { key: "colour", label: "Colour", options: ["All", "Red", "Maroon", "Green", "Mustard", "Pink", "White", "Black", "Navy", "Beige", "Lavender"] },
  { key: "channel", label: "Channel", options: ["All", "In-Store", "Website", "Instagram", "WhatsApp"] },
];

interface FilterBarProps {
  title: string;
  subtitle?: string;
  onFilterChange?: (filters: Record<string, string>) => void;
}

export function FilterBar({ title, subtitle, onFilterChange }: FilterBarProps) {
  const [selected, setSelected] = useState<Record<string, string>>({ date: "This Month" });
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: string, val: string) => {
    const newSelected = { ...selected, [key]: val };
    setSelected(newSelected);
    if (onFilterChange) onFilterChange(newSelected);
  };

  const activeCount = Object.values(selected).filter(v => v !== "All" && v).length;

  return (
    <div style={{ marginBottom: "24px" }}>
      {/* Title row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "34px", fontWeight: 700, color: "#F0EAD6", lineHeight: 1.2
          }}>
            {title}
          </h1>
          {subtitle && <p style={{ color: "#A8B89A", fontSize: "15px", marginTop: "4px" }}>{subtitle}</p>}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "8px 16px",
            background: showFilters ? "rgba(200,75,49,0.2)" : "rgba(79,94,68,0.3)",
            border: `1px solid ${showFilters ? "#C84B31" : "#4F5E44"}`,
            borderRadius: "8px", color: "#F0EAD6", fontSize: "14px",
            cursor: "pointer", transition: "all 0.2s",
          }}
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeCount > 0 && (
            <span style={{ background: "#C84B31", color: "#F0EAD6", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Quick date chips */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {["Today", "This Week", "This Month", "This Quarter", "This Year"].map(opt => (
          <button
            key={opt}
            onClick={() => handleFilterChange('date', opt)}
            style={{
              padding: "5px 14px", borderRadius: "20px", fontSize: "13px",
              background: selected.date === opt ? "#C84B31" : "rgba(79,94,68,0.3)",
              color: selected.date === opt ? "#F0EAD6" : "#A8B89A",
              border: `1px solid ${selected.date === opt ? "#C84B31" : "#4F5E44"}`,
              cursor: "pointer", transition: "all 0.2s", fontWeight: selected.date === opt ? 600 : 400
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div style={{
          marginTop: "12px", padding: "16px",
          background: "#364430", borderRadius: "12px",
          border: "1px solid #4F5E44",
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px"
        }}>
          {FILTERS.map(f => (
            <div key={f.key}>
              <label style={{ fontSize: "11px", color: "#D4A853", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "6px" }}>
                {f.label}
              </label>
              <div style={{ position: "relative" }}>
                <select
                  value={selected[f.key] || "All"}
                  onChange={e => handleFilterChange(f.key, e.target.value)}
                  style={{
                    width: "100%", padding: "7px 28px 7px 10px",
                    background: "#2E3B27", border: "1px solid #4F5E44",
                    borderRadius: "6px", color: "#F0EAD6", fontSize: "13px",
                    appearance: "none", cursor: "pointer", outline: "none"
                  }}
                >
                  {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", color: "#A8B89A", pointerEvents: "none" }} />
              </div>
            </div>
          ))}
          <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: "8px", paddingTop: "8px" }}>
            <button
              onClick={() => {
                const resetState = { date: "This Month" };
                setSelected(resetState);
                if (onFilterChange) onFilterChange(resetState);
              }}
              style={{ padding: "6px 14px", background: "transparent", border: "1px solid #4F5E44", borderRadius: "6px", color: "#A8B89A", fontSize: "12px", cursor: "pointer" }}
            >
              Reset
            </button>
            <button
              onClick={() => setShowFilters(false)}
              style={{ padding: "6px 14px", background: "#C84B31", border: "none", borderRadius: "6px", color: "#F0EAD6", fontSize: "12px", cursor: "pointer" }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
