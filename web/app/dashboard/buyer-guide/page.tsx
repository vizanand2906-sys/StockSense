"use client";

import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import {
  Download, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown,
  Loader2, ShoppingBag, Ban, Package, Calendar, Sparkles,
  MapPin, BarChart2, Zap, Tag, ChevronRight, Info,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface BuyItem {
  name: string;
  category: string;
  units: number;
  sellThrough: number;
  confidence: "High" | "Medium" | "Low";
  trend: string;
  sizes: { s: number; m: number; l: number; xl: number };
  reason: string;
}

interface AvoidItem {
  name: string;
  reason: string;
  type: "declining" | "weather" | "overstock";
}

interface BudgetSlice {
  name: string;
  value: number;
  color: string;
}

interface GuideData {
  seasonLabel: string;
  seasonNote: string;
  totalBudget: string;
  buyItems: BuyItem[];
  avoidItems: AvoidItem[];
  budget: BudgetSlice[];
  sizeCorrectionNote: string;
  sizeCorrectionFrom: string;
  sizeCorrectionTo: string;
  estimatedSaving: string;
  hotspotArea: string;
  topTrend: string;
}

// ─── Seeded Pseudo-Random ───────────────────────────────────────────────────────

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function pick<T>(arr: T[], r: () => number): T {
  return arr[Math.floor(r() * arr.length)];
}

function rInt(min: number, max: number, r: () => number) {
  return Math.floor(r() * (max - min + 1)) + min;
}

// ─── Guide Generator ───────────────────────────────────────────────────────────

const BUY_POOL: Omit<BuyItem, "units" | "sellThrough" | "confidence" | "sizes">[] = [
  { name: "Ikat Silk Anarkali Co-Ord", category: "Ethnic / Full Body", trend: "Rising in Bangalore", reason: "Navratri demand building; Koramangala micro-influencer virality up 38% this week." },
  { name: "Organza Floral Flutter Set", category: "Ethnic / Upper Body", trend: "Peaking", reason: "Whitefield IT-crowd demand for weekend brunch & office-party crossovers is surging." },
  { name: "Chiffon Hand-Embroidered Lehenga", category: "Bridal / Full Body", trend: "Strong Rising", reason: "Wedding season pre-buy; Jayanagar boutiques report walk-in inquiries doubling in 3 weeks." },
  { name: "Tiered Georgette Midi Kurti", category: "Casual / Upper Body", trend: "Rising", reason: "Workwear-to-casual crossover very popular in HSR Layout & Electronic City." },
  { name: "Wide-Leg Linen Palazzo", category: "Casual / Lower Body", trend: "Steady", reason: "Consistent demand from Malleshwaram & Sadashivanagar 30–45 age group." },
  { name: "Velvet Off-Shoulder Blouse", category: "Party / Upper Body", trend: "Peaking", reason: "Evening-event & wedding season driving demand in Indiranagar & Richmond Town." },
  { name: "Mandala Print Wrap Kaftan", category: "Resort / Full Body", trend: "Rising", reason: "Boutique favourite in Koramangala; niche but highly loyal repeat-purchase category." },
  { name: "Smocked Maxi Skirt (High-Slit)", category: "Premium / Lower Body", trend: "Rising", reason: "UB City and MG Road shoppers driving premium segment; Google searches up 18% WoW." },
  { name: "Bandhani Crop Top & Skirt Set", category: "Ethnic / Full Body", trend: "Rising in Bangalore", reason: "Festive season driving strong search for traditional prints among 22–30 women." },
  { name: "Sequin Blazer (Structured)", category: "Party / Upper Body", trend: "Peaking", reason: "New Year & corporate party dressing coming into focus; blazers trending on Instagram." },
  { name: "Cotton Kurta Palazzo Set", category: "Daily / Full Body", trend: "Steady", reason: "Evergreen daily-wear category. Low risk, steady sell-through in all Bangalore zones." },
  { name: "Ruffle-Hem Wrap Dress", category: "Casual / Full Body", trend: "Rising", reason: "Brunch & weekend wear trend from Indiranagar cafés is spilling into boutique demand." },
  { name: "Printed Dhoti Pants", category: "Ethnic / Lower Body", trend: "Rising", reason: "Festival fusion demand strong; younger Gen-Z buyers pairing with plain tops." },
  { name: "Mirror-Work Kurti Jacket Set", category: "Ethnic / Full Body", trend: "Peaking", reason: "Heavy search volumes from Rajajinagar and Basavanagudi; festive styling season." },
  { name: "Pashmina Blend Shawl Dupatta", category: "Accessories / Ethnic", trend: "Rising", reason: "Pre-winter accessory buying starting in North Bangalore; low risk, high margin." },
  { name: "Raw Silk Straight Kurta", category: "Ethnic / Upper Body", trend: "Steady", reason: "Classic staple with consistent sell-through across all price points. Safe buy." },
];

const AVOID_POOL: AvoidItem[] = [
  { name: "Neon Printed Tops", reason: "Trend velocity declining for 4 weeks; Myntra category clicks down 22% MoM.", type: "declining" },
  { name: "Heavy Georgette Suits", reason: "Temperature forecast above 29°C for 6+ weeks; demand suppressed until October.", type: "weather" },
  { name: "Premium Western Bodycon Dresses", reason: "Already overstocked. 9+ weeks cover remaining in current inventory.", type: "overstock" },
  { name: "Acid-Wash Denim Jackets", reason: "Trend peaked 8 weeks ago; Instagram velocity dropped 44% since then.", type: "declining" },
  { name: "Faux-Fur Coats", reason: "Seasonal mismatch; Bangalore heat makes these a 0% sell-through risk right now.", type: "weather" },
  { name: "Crop-Top Blazer Co-ords (Polyester)", reason: "Returns rate at 18% on Ajio; sizing inconsistency complaints visible.", type: "overstock" },
  { name: "Embellished Palazzo (Heavy Bead)", reason: "Demand dipped after wedding season; avoid until next festive cycle in Oct.", type: "declining" },
  { name: "Skinny Jeans (Low-Rise)", reason: "Trend declining nationally. Wide-leg & straight-leg have displaced this category.", type: "declining" },
];

const BUDGET_PALETTES = [
  ["#C84B31", "#D4A853", "#4ade80", "#818cf8", "#f87171"],
  ["#C84B31", "#4ade80", "#D4A853", "#c084fc", "#fb923c"],
  ["#4285f4", "#D4A853", "#4ade80", "#C84B31", "#c084fc"],
];

const HOTSPOTS = [
  "Koramangala & Indiranagar", "Jayanagar & JP Nagar", "Whitefield & Marathahalli",
  "HSR Layout & Electronic City", "Malleshwaram & Sadashivanagar",
  "UB City Area & MG Road", "Bannerghatta Road & BTM Layout",
];

const SEASON_CONFIGS = [
  { months: [1, 2], label: "Republic Day & Valentine's Season", note: "Romantic occasion dressing and Republic Day sales dominate. Pastels and reds are high-velocity.", topTrend: "Valentine pastels & occasion wear" },
  { months: [3, 4], label: "Ugadi & Summer Pre-Buy Season", note: "Ugadi festive wear demand is rising. Lightweight fabrics becoming critical as heat sets in.", topTrend: "Lightweight ethnic & Ugadi festive" },
  { months: [5, 6], label: "Summer Clearance & End-of-Season", note: "Clearance buying period. Invest in next-season inventory at lower risk.", topTrend: "Resort wear & linen fabrics" },
  { months: [7, 8], label: "Monsoon & Back-to-Office Season", note: "Monsoon fashion trending. Office-wear demand rises as WFH normalises post-rains.", topTrend: "Cotton kurtas & casual separates" },
  { months: [9, 10], label: "Navratri & Pre-Diwali Season", note: "Peak festive buying window. Ethnic wear, lehengas, and co-ords are extremely high velocity.", topTrend: "Festive ethnic & celebration wear" },
  { months: [11, 12], label: "Diwali, Wedding & Year-End Party Season", note: "Wedding season at peak. Party wear and bridal-adjacent categories are very high demand.", topTrend: "Wedding & party occasion wear" },
];

function generateGuide(dateStr: string): GuideData {
  const date = new Date(dateStr);
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  const r = seededRand(seed);

  const month = date.getMonth() + 1;
  const seasonCfg = SEASON_CONFIGS.find(s => s.months.includes(month)) ?? SEASON_CONFIGS[3];

  // Pick 3 unique buy items
  const shuffled = [...BUY_POOL].sort(() => r() - 0.5);
  const chosen = shuffled.slice(0, 3);

  const buyItems: BuyItem[] = chosen.map(item => ({
    ...item,
    units: rInt(6, 20, r),
    sellThrough: rInt(68, 94, r),
    confidence: pick(["High", "High", "Medium", "Low"] as const, r),
    sizes: { s: rInt(8, 18, r), m: rInt(32, 45, r), l: rInt(25, 38, r), xl: rInt(8, 18, r) },
  }));

  // Pick 3 avoid items
  const avoidShuffled = [...AVOID_POOL].sort(() => r() - 0.5);
  const avoidItems = avoidShuffled.slice(0, 3);

  // Budget
  const palette = BUDGET_PALETTES[Math.floor(r() * BUDGET_PALETTES.length)];
  const categories = ["Ethnic Festive", "Casual Daily", "Party & Evening", "Accessories", "Experimental"];
  const rawVals = categories.map(() => rInt(10, 40, r));
  const total = rawVals.reduce((a, b) => a + b, 0);
  const budget: BudgetSlice[] = categories.map((name, i) => ({
    name,
    value: Math.round((rawVals[i] / total) * 100),
    color: palette[i],
  }));

  const budgetTotal = `₹${rInt(80, 220, r)}K`;
  const hotspot = pick(HOTSPOTS, r);
  const saving = `₹${rInt(8, 22, r)},${rInt(100, 900, r)}`;

  const sizeFromOptions = ["Equal split S:M:L:XL = 25:25:25:25", "Skewed small: S:M:L:XL = 30:30:25:15", "Skewed large: S:M:L:XL = 10:25:35:30"];
  const sizeToOptions = ["Recommended: S:M:L:XL = 10:40:35:15", "Recommended: S:M:L:XL = 15:38:32:15", "Recommended: S:M:L:XL = 12:42:30:16"];
  const sizeIdx = Math.floor(r() * 3);

  return {
    seasonLabel: seasonCfg.label,
    seasonNote: seasonCfg.note,
    totalBudget: budgetTotal,
    buyItems,
    avoidItems,
    budget,
    sizeCorrectionNote: "Your past purchasing pattern doesn't match actual sales velocity. Correcting this ratio will reduce markdowns.",
    sizeCorrectionFrom: sizeFromOptions[sizeIdx],
    sizeCorrectionTo: sizeToOptions[sizeIdx],
    estimatedSaving: saving,
    hotspotArea: hotspot,
    topTrend: seasonCfg.topTrend,
  };
}

// ─── Sub-Components ─────────────────────────────────────────────────────────────

const CONFIDENCE_STYLE: Record<string, { bg: string; border: string; color: string; label: string }> = {
  High:   { bg: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.4)", color: "#4ade80", label: "High Confidence" },
  Medium: { bg: "rgba(212,168,83,0.12)", border: "rgba(212,168,83,0.4)", color: "#D4A853", label: "Med Confidence" },
  Low:    { bg: "rgba(248,113,113,0.10)", border: "rgba(248,113,113,0.3)", color: "#f87171", label: "Low Confidence" },
};

const AVOID_ICON: Record<string, React.ReactNode> = {
  declining: <TrendingDown size={18} style={{ color: "#f87171" }} />,
  weather:   <AlertTriangle size={18} style={{ color: "#fb923c" }} />,
  overstock: <Package size={18} style={{ color: "#818cf8" }} />,
};

function SizeBar({ s, m, l, xl }: { s: number; m: number; l: number; xl: number }) {
  const total = s + m + l + xl;
  const pct = (v: number) => `${Math.round((v / total) * 100)}%`;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#A8B89A", marginBottom: "4px" }}>
        <span>Size Breakdown</span>
        <span>S:{pct(s)} M:{pct(m)} L:{pct(l)} XL:{pct(xl)}</span>
      </div>
      <div style={{ display: "flex", height: "6px", borderRadius: "4px", overflow: "hidden", gap: "2px" }}>
        <div style={{ width: pct(s), background: "#A8B89A", borderRadius: "4px" }} />
        <div style={{ width: pct(m), background: "#C84B31", borderRadius: "4px" }} />
        <div style={{ width: pct(l), background: "#D4A853", borderRadius: "4px" }} />
        <div style={{ width: pct(xl), background: "#4ade80", borderRadius: "4px" }} />
      </div>
      <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
        {[["S", "#A8B89A"], ["M", "#C84B31"], ["L", "#D4A853"], ["XL", "#4ade80"]].map(([lbl, col]) => (
          <span key={lbl} style={{ fontSize: "10px", color: col as string, display: "flex", alignItems: "center", gap: "3px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: col as string, display: "inline-block" }} />
            {lbl}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ letter, title }: { letter: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
      <span style={{
        width: "26px", height: "26px", borderRadius: "50%",
        background: "#C84B31", color: "#F0EAD6", fontSize: "12px", fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>{letter}</span>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 700, color: "#F0EAD6" }}>{title}</h2>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────

export default function BuyerGuidePage() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [isGenerating, setIsGenerating] = useState(false);
  const [guideReady, setGuideReady] = useState(false);

  const guide = useMemo(() => generateGuide(selectedDate), [selectedDate]);

  const handleGenerate = () => {
    setGuideReady(false);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGuideReady(true);
    }, 1800);
  };

  // Auto-regenerate when date changes while guide is visible
  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    if (guideReady) {
      setGuideReady(false);
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setGuideReady(true);
      }, 1200);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "60px" }}>

      {/* ─── Header ─── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <ShoppingBag size={22} style={{ color: "#C84B31" }} />
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: "#F0EAD6" }}>
              Pre-Market Buyer Guide
            </h1>
          </div>
          {guideReady && (
            <p style={{ fontSize: "13px", color: "#A8B89A", display: "flex", alignItems: "center", gap: "6px" }}>
              <MapPin size={12} style={{ color: "#C84B31" }} />
              Bangalore · Guide for market visit on <strong style={{ color: "#D4A853", marginLeft: "4px" }}>{new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong>
            </p>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* Date Picker */}
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "#364430", border: "1px solid #4F5E44",
            borderRadius: "10px", padding: "8px 14px",
          }}>
            <Calendar size={14} style={{ color: "#D4A853", flexShrink: 0 }} />
            <span style={{ fontSize: "12px", color: "#A8B89A", whiteSpace: "nowrap" }}>Market visit:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={e => handleDateChange(e.target.value)}
              style={{
                background: "transparent", border: "none", outline: "none",
                color: "#F0EAD6", fontSize: "13px", fontWeight: 600, cursor: "pointer",
                colorScheme: "dark",
              }}
            />
          </div>

          {/* Generate / Download */}
          {!guideReady ? (
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "9px 20px", borderRadius: "10px", fontWeight: 700,
                fontSize: "13px", cursor: isGenerating ? "not-allowed" : "pointer",
                background: isGenerating ? "rgba(200,75,49,0.4)" : "#C84B31",
                border: "none", color: "#F0EAD6",
                transition: "background 0.2s",
              }}
            >
              {isGenerating
                ? <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> Analysing…</>
                : <><Zap size={14} /> Generate Guide</>}
            </button>
          ) : (
            <button
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "9px 20px", borderRadius: "10px", fontWeight: 600,
                fontSize: "13px", cursor: "pointer",
                background: "transparent", border: "1px solid #4F5E44", color: "#A8B89A",
              }}
            >
              <Download size={14} /> Download PDF
            </button>
          )}
        </div>
      </div>

      {/* ─── Empty State ─── */}
      {!guideReady && !isGenerating && (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "80px 20px", textAlign: "center",
          background: "#364430", border: "1px dashed #4F5E44", borderRadius: "14px",
        }}>
          <ShoppingBag size={48} style={{ color: "#4F5E44", marginBottom: "16px" }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", marginBottom: "8px" }}>
            Ready for your next market trip?
          </h2>
          <p style={{ color: "#A8B89A", fontSize: "13px", maxWidth: "400px", lineHeight: 1.6 }}>
            Select your market visit date above and generate a personalised buying guide based on Bangalore trend signals, your sales patterns, and current inventory.
          </p>
        </div>
      )}

      {/* ─── Loading State ─── */}
      {isGenerating && (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "80px 20px", textAlign: "center",
          background: "#364430", border: "1px solid #4F5E44", borderRadius: "14px",
        }}>
          <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
          <Loader2 size={48} style={{ color: "#C84B31", marginBottom: "16px", animation: "spin 1s linear infinite" }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", marginBottom: "8px" }}>
            Building your recommendations…
          </h2>
          <p style={{ color: "#A8B89A", fontSize: "13px" }}>
            Analysing 90 days of sales data and Bangalore trend signals for {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { month: "long", day: "numeric" })}.
          </p>
        </div>
      )}

      {/* ─── Guide Content ─── */}
      {guideReady && (
        <div style={{ display: "flex", flexDirection: "column", gap: "36px", animation: "fadeIn 0.4s ease" }}>
          <style>{`
            @keyframes fadeIn { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
            @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
          `}</style>

          {/* Season Context Banner */}
          <div style={{
            background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.3)",
            borderRadius: "12px", padding: "16px 20px",
            display: "flex", alignItems: "flex-start", gap: "12px",
          }}>
            <Sparkles size={20} style={{ color: "#D4A853", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <p style={{ fontWeight: 700, color: "#D4A853", fontSize: "14px", marginBottom: "4px" }}>
                {guide.seasonLabel}
              </p>
              <p style={{ fontSize: "12px", color: "#A8B89A", lineHeight: 1.6 }}>
                {guide.seasonNote}{" "}
                <strong style={{ color: "#F0EAD6" }}>Top trend signal: {guide.topTrend}.</strong>{" "}
                Hottest zone this week: <strong style={{ color: "#C84B31" }}>{guide.hotspotArea}</strong>.
              </p>
            </div>
          </div>

          {/* ─── Section A: Budget Allocation ─── */}
          <section>
            <SectionLabel letter="A" title="Budget Allocation" />
            <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: "32px" }}>
              <div style={{ width: "220px", height: "220px", flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={guide.budget} innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {guide.budget.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip
                      formatter={(v) => `${v}%`}
                      contentStyle={{ background: "#2E3B27", border: "1px solid #4F5E44", borderRadius: "8px", color: "#F0EAD6", fontSize: "12px" }}
                    />
                    <Legend
                      formatter={(value) => <span style={{ fontSize: "11px", color: "#A8B89A" }}>{value}</span>}
                      wrapperStyle={{ fontSize: "11px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ flex: 1, minWidth: "220px" }}>
                <p style={{ fontSize: "12px", color: "#A8B89A", marginBottom: "14px", lineHeight: 1.6 }}>
                  Optimal budget split for <strong style={{ color: "#D4A853" }}>{guide.totalBudget}</strong> buying cycle, calibrated to Bangalore trend signals and your store's category performance.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {guide.budget.map(item => (
                    <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "8px", borderBottom: "1px solid rgba(79,94,68,0.3)" }}>
                      <span style={{ fontSize: "13px", color: "#F0EAD6", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: item.color, display: "inline-block", flexShrink: 0 }} />
                        {item.name}
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: item.color }}>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─── Section B: What to Buy ─── */}
          <section>
            <SectionLabel letter="B" title="What to Buy" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {guide.buyItems.map((item) => {
                const conf = CONFIDENCE_STYLE[item.confidence];
                return (
                  <div key={item.name} style={{
                    background: "#364430", border: "1px solid #4F5E44",
                    borderLeft: `4px solid ${conf.color}`,
                    borderRadius: "12px", padding: "20px",
                    display: "flex", flexDirection: "column", gap: "14px",
                  }}>
                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#F0EAD6", lineHeight: 1.3 }}>{item.name}</h3>
                      <span style={{
                        fontSize: "10px", padding: "2px 8px", borderRadius: "8px", fontWeight: 700, whiteSpace: "nowrap",
                        background: conf.bg, border: `1px solid ${conf.border}`, color: conf.color,
                      }}>{conf.label}</span>
                    </div>

                    {/* Category + Trend */}
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "6px", background: "rgba(79,94,68,0.3)", border: "1px solid #4F5E44", color: "#A8B89A" }}>
                        {item.category}
                      </span>
                      <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "6px", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", display: "flex", alignItems: "center", gap: "3px" }}>
                        <TrendingUp size={10} /> {item.trend}
                      </span>
                    </div>

                    {/* Units + Sell-through */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div style={{ background: "#2E3B27", borderRadius: "8px", padding: "10px 12px" }}>
                        <p style={{ fontSize: "10px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>Recommend</p>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 700, color: "#C84B31" }}>{item.units} units</p>
                      </div>
                      <div style={{ background: "#2E3B27", borderRadius: "8px", padding: "10px 12px" }}>
                        <p style={{ fontSize: "10px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>Est. Sell-through</p>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 700, color: "#4ade80" }}>{item.sellThrough}%</p>
                      </div>
                    </div>

                    {/* Size bar */}
                    <SizeBar s={item.sizes.s} m={item.sizes.m} l={item.sizes.l} xl={item.sizes.xl} />

                    {/* Reason */}
                    <div style={{ display: "flex", gap: "8px", padding: "10px 12px", background: "rgba(200,75,49,0.07)", border: "1px solid rgba(200,75,49,0.2)", borderRadius: "8px" }}>
                      <Info size={13} style={{ color: "#D4A853", flexShrink: 0, marginTop: "1px" }} />
                      <p style={{ fontSize: "11px", color: "#A8B89A", lineHeight: 1.5 }}>{item.reason}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ─── Section C: Size Curve Correction ─── */}
          <section>
            <SectionLabel letter="C" title="Size Curve Correction" />
            <div style={{ background: "rgba(212,168,83,0.06)", border: "1px solid rgba(212,168,83,0.25)", borderRadius: "12px", padding: "24px" }}>
              <p style={{ fontSize: "13px", color: "#A8B89A", marginBottom: "20px", lineHeight: 1.6 }}>
                {guide.sizeCorrectionNote}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <AlertTriangle size={16} style={{ color: "#fb923c" }} />
                    <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#fb923c" }}>What you've been buying</h3>
                  </div>
                  <p style={{ fontSize: "12px", color: "#A8B89A", marginBottom: "8px" }}>{guide.sizeCorrectionFrom}</p>
                  <div style={{ display: "flex", height: "10px", borderRadius: "5px", overflow: "hidden", gap: "2px", opacity: 0.5 }}>
                    <div style={{ flex: 1, background: "#94a3b8" }} />
                    <div style={{ flex: 1, background: "#64748b" }} />
                    <div style={{ flex: 1, background: "#475569" }} />
                    <div style={{ flex: 1, background: "#334155" }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <CheckCircle2 size={16} style={{ color: "#4ade80" }} />
                    <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#4ade80" }}>What actually sells</h3>
                  </div>
                  <p style={{ fontSize: "12px", color: "#F0EAD6", fontWeight: 600, marginBottom: "8px" }}>{guide.sizeCorrectionTo}</p>
                  <div style={{ display: "flex", height: "10px", borderRadius: "5px", overflow: "hidden", gap: "2px" }}>
                    <div style={{ flex: 1, background: "#A8B89A" }} />
                    <div style={{ flex: 4, background: "#C84B31" }} />
                    <div style={{ flex: 3, background: "#D4A853" }} />
                    <div style={{ flex: 1.5, background: "#4ade80" }} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid rgba(212,168,83,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <p style={{ fontSize: "12px", color: "#A8B89A" }}>Adjusting your ratio before placing orders will reduce end-of-season markdowns.</p>
                <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "8px", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", fontWeight: 700 }}>
                  {guide.estimatedSaving} est. saved per cycle
                </span>
              </div>
            </div>
          </section>

          {/* ─── Section D: What to Avoid ─── */}
          <section>
            <SectionLabel letter="D" title="What to Avoid This Trip" />
            <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", overflow: "hidden" }}>
              {guide.avoidItems.map((item, i) => (
                <div key={item.name} style={{
                  padding: "16px 20px", display: "flex", gap: "14px", alignItems: "flex-start",
                  borderBottom: i < guide.avoidItems.length - 1 ? "1px solid rgba(79,94,68,0.4)" : "none",
                  transition: "background 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(79,94,68,0.2)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(248,113,113,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {AVOID_ICON[item.type]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#F0EAD6" }}>{item.name}</h4>
                      <span style={{ fontSize: "10px", padding: "1px 7px", borderRadius: "6px", background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", color: "#f87171", fontWeight: 600 }}>
                        {item.type === "declining" ? "Declining" : item.type === "weather" ? "Weather Risk" : "Overstock"}
                      </span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#A8B89A", lineHeight: 1.5 }}>{item.reason}</p>
                  </div>
                  <Ban size={16} style={{ color: "#f87171", flexShrink: 0, marginTop: "2px", opacity: 0.6 }} />
                </div>
              ))}
            </div>
          </section>

          {/* Footer note */}
          <p style={{ fontSize: "11px", color: "#4F5E44", textAlign: "center" }}>
            Guide generated for market visit on {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · Bangalore metro signals · Simulated data
          </p>
        </div>
      )}
    </div>
  );
}
