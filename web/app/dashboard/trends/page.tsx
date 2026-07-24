"use client";

import { useState, useMemo, useEffect } from "react";
import ReactDOM from "react-dom";
import { TREND_CATEGORIES, TrendCategory, AttributeTrend, TrendDirection } from "@/lib/mockTrendData";
import { WELL_GOING_PRODUCTS, WellGoingProduct, BangaloreMetrics } from "@/lib/mockProductData";
import { TrendingUp, TrendingDown, Minus, Activity, Search, X, Flame, ChevronDown, ChevronUp, ShoppingBag, Sparkles, Tag, Layers, Scissors, Star, Medal, Trophy, Leaf, Gem, PartyPopper, Award, MapPin, BarChart2, Eye, Heart, Hash, Zap, ShoppingCart, ArrowUpRight, Info } from "lucide-react";

// ─── Category Icon Map (replaces emoji) ───────────────────────────────────────

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  "texture-pattern": <Leaf size={18} />,
  "fabric-material": <Layers size={18} />,
  "shape-silhouette": <Scissors size={18} />,
  "part-detail": <Gem size={18} />,
  "style-occasion": <PartyPopper size={18} />,
};

// ─── Direction Config ──────────────────────────────────────────────────────────

const DIRECTION_CONFIG: Record<TrendDirection, {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
}> = {
  Rising: {
    label: "Rising",
    color: "#4ade80",
    bg: "rgba(74,222,128,0.12)",
    border: "rgba(74,222,128,0.35)",
    icon: <TrendingUp size={12} />,
  },
  Peaking: {
    label: "Peaking",
    color: "#D4A853",
    bg: "rgba(212,168,83,0.12)",
    border: "rgba(212,168,83,0.35)",
    icon: <Flame size={12} />,
  },
  Flat: {
    label: "Flat",
    color: "#A8B89A",
    bg: "rgba(168,184,154,0.10)",
    border: "rgba(168,184,154,0.25)",
    icon: <Minus size={12} />,
  },
  Declining: {
    label: "Declining",
    color: "#f87171",
    bg: "rgba(248,113,113,0.10)",
    border: "rgba(248,113,113,0.30)",
    icon: <TrendingDown size={12} />,
  },
};

// ─── 90-Day Smooth Sparkline SVG ───────────────────────────────────────────────

function Smooth90dSparkline({ data, direction }: { data: number[]; direction: TrendDirection }) {
  const W = 72, H = 26;
  if (!data || data.length === 0) return null;

  const max = Math.max(...data, 0.01);
  const min = Math.min(...data);
  const range = max - min || 0.01;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * (H - 6) - 3;
    return { x, y };
  });

  // Construct smooth SVG path
  let pathD = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const cpX = (curr.x + next.x) / 2;
    pathD += ` C ${cpX},${curr.y} ${cpX},${next.y} ${next.x},${next.y}`;
  }

  const color = DIRECTION_CONFIG[direction].color;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="shrink-0 overflow-visible">
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Score Bar ─────────────────────────────────────────────────────────────────

function ScoreBar({ score, direction }: { score: number; direction: TrendDirection }) {
  const color = DIRECTION_CONFIG[direction].color;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "90px" }}>
      <div style={{
        flex: 1, height: "5px", borderRadius: "3px",
        background: "rgba(79,94,68,0.4)", overflow: "hidden",
      }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: "3px", transition: "width 0.3s" }} />
      </div>
      <span style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color, minWidth: "26px", textAlign: "right", fontWeight: 700 }}>
        {score}
      </span>
    </div>
  );
}

// ─── Attribute Item Row ────────────────────────────────────────────────────────

function AttributeRow({ attr, isTop3 }: { attr: AttributeTrend; isTop3: boolean }) {
  const cfg = DIRECTION_CONFIG[attr.direction];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "24px 1fr auto 76px 95px",
      alignItems: "center",
      gap: "12px",
      padding: "10px 14px",
      borderRadius: "8px",
      background: isTop3 ? "rgba(200,75,49,0.08)" : "rgba(46,59,39,0.4)",
      border: isTop3 ? "1px solid rgba(200,75,49,0.25)" : "1px solid rgba(79,94,68,0.3)",
      transition: "all 0.15s ease",
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = isTop3 ? "rgba(200,75,49,0.14)" : "rgba(79,94,68,0.25)"; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isTop3 ? "rgba(200,75,49,0.08)" : "rgba(46,59,39,0.4)"; }}
    >
      {/* Rank */}
      <span style={{
        fontSize: "11px", fontFamily: "'JetBrains Mono', monospace",
        color: isTop3 ? "#D4A853" : "#A8B89A", fontWeight: isTop3 ? 700 : 400,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        {attr.rank === 1 ? <Trophy size={14} style={{ color: "#D4A853" }} /> :
         attr.rank === 2 ? <Medal size={14} style={{ color: "#A8B89A" }} /> :
         attr.rank === 3 ? <Award size={14} style={{ color: "#CD7F32" }} /> :
         `#${attr.rank}`}
      </span>

      {/* Name + Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
        <span style={{
          fontSize: "13px", color: "#F0EAD6", fontWeight: isTop3 ? 600 : 400,
          textTransform: "capitalize", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
        }}>
          {attr.name}
        </span>
        {isTop3 && (
          <span style={{
            fontSize: "10px", padding: "1px 6px", borderRadius: "10px",
            background: "rgba(200,75,49,0.2)", border: "1px solid rgba(200,75,49,0.5)",
            color: "#C84B31", fontWeight: 700, whiteSpace: "nowrap",
            display: "inline-flex", alignItems: "center", gap: "3px"
          }}>
            <Flame size={10} /> Trending Now
          </span>
        )}
      </div>

      {/* Direction badge */}
      <span style={{
        display: "inline-flex", alignItems: "center", gap: "4px",
        padding: "2px 8px", borderRadius: "12px",
        background: cfg.bg, border: `1px solid ${cfg.border}`,
        color: cfg.color, fontSize: "11px", fontWeight: 600, whiteSpace: "nowrap"
      }}>
        {cfg.icon} {cfg.label}
      </span>

      {/* 90d Sparkline */}
      <Smooth90dSparkline data={attr.timeSeries90d} direction={attr.direction} />

      {/* Score */}
      <ScoreBar score={attr.score} direction={attr.direction} />
    </div>
  );
}

// ─── Category Block Component ──────────────────────────────────────────────────

function CategoryCard({ category }: { category: TrendCategory }) {
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [filterDirection, setFilterDirection] = useState<string>("all");

  const topDefaultCount = 6; // Show top 6 by default

  const sortedAll = useMemo(() => {
    return [...category.attributes].sort((a, b) => b.score - a.score);
  }, [category.attributes]);

  const defaultTop = useMemo(() => {
    return sortedAll.slice(0, topDefaultCount);
  }, [sortedAll]);

  const filteredExpanded = useMemo(() => {
    let list = sortedAll;
    if (filterDirection !== "all") {
      list = list.filter(a => a.direction === filterDirection);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(a => a.name.toLowerCase().includes(q));
    }
    return list;
  }, [sortedAll, filterDirection, search]);

  return (
    <div style={{
      background: "#364430",
      border: "1px solid #4F5E44",
      borderRadius: "12px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    }}>
      {/* Category Title Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "20px", fontWeight: 700, color: "#F0EAD6",
            display: "flex", alignItems: "center", gap: "8px"
          }}>
            <span style={{ color: "#D4A853", display: "flex", alignItems: "center" }}>{CATEGORY_ICON_MAP[category.id] ?? <Star size={18} />}</span>
            {category.label}
          </h2>
          <p style={{ fontSize: "12px", color: "#A8B89A" }}>{category.description}</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{
            fontSize: "11px", padding: "3px 10px", borderRadius: "12px",
            background: "rgba(79,94,68,0.4)", border: "1px solid #4F5E44", color: "#D4A853", fontWeight: 600
          }}>
            {category.attributes.length} Attributes Total
          </span>
        </div>
      </div>

      {/* Expanded Search & Filters */}
      {expanded && (
        <div style={{
          display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center",
          padding: "12px", background: "#2E3B27", borderRadius: "8px", border: "1px solid #4F5E44"
        }}>
          <div style={{ position: "relative", flex: "1 1 200px" }}>
            <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#A8B89A" }} />
            <input
              type="text"
              placeholder={`Search in ${category.label}…`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", paddingLeft: "32px", paddingRight: search ? "28px" : "12px",
                paddingTop: "6px", paddingBottom: "6px",
                background: "#1E2B1A", border: "1px solid #4F5E44",
                borderRadius: "6px", color: "#F0EAD6", fontSize: "12px", outline: "none"
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#A8B89A", cursor: "pointer" }}>
                <X size={12} />
              </button>
            )}
          </div>

          <div style={{ display: "flex", gap: "4px" }}>
            {["all", "Rising", "Peaking", "Flat", "Declining"].map(d => (
              <button
                key={d}
                onClick={() => setFilterDirection(d)}
                style={{
                  padding: "4px 9px", borderRadius: "12px", fontSize: "11px", fontWeight: 600,
                  cursor: "pointer", border: "none",
                  background: filterDirection === d ? "#C84B31" : "rgba(79,94,68,0.4)",
                  color: filterDirection === d ? "#F0EAD6" : "#A8B89A",
                }}
              >
                {d === "all" ? "All" : d}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* List of attributes */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {!expanded ? (
          defaultTop.map((attr, idx) => (
            <AttributeRow key={attr.name} attr={attr} isTop3={idx < 3} />
          ))
        ) : (
          filteredExpanded.length > 0 ? (
            filteredExpanded.map((attr) => (
              <AttributeRow key={attr.name} attr={attr} isTop3={attr.rank <= 3} />
            ))
          ) : (
            <div style={{ padding: "16px", textTransform: "none", textAlign: "center", color: "#A8B89A", fontSize: "12px" }}>
              No attributes found matching &quot;{search}&quot;.
            </div>
          )
        )}
      </div>

      {/* Expand / Collapse Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%", padding: "9px", borderRadius: "8px",
          background: expanded ? "rgba(79,94,68,0.3)" : "rgba(200,75,49,0.15)",
          border: expanded ? "1px solid #4F5E44" : "1px solid rgba(200,75,49,0.4)",
          color: expanded ? "#F0EAD6" : "#D4A853",
          fontSize: "12px", fontWeight: 600, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          transition: "all 0.2s"
        }}
      >
        {expanded ? (
          <>Collapse Category List <ChevronUp size={14} /></>
        ) : (
          <>View All {category.attributes.length} {category.label} Attributes <ChevronDown size={14} /></>
        )}
      </button>
    </div>
  );
}

// ─── Google Trends Mini Sparkline ───────────────────────────────────────────────────────────────

function TrendSparkline({ data, color }: { data: number[]; color: string }) {
  const W = 120, H = 36;
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / range) * (H - 6) - 3,
  }));
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const cx = (pts[i].x + pts[i + 1].x) / 2;
    d += ` C ${cx},${pts[i].y} ${cx},${pts[i + 1].y} ${pts[i + 1].x},${pts[i + 1].y}`;
  }
  // Area fill path
  const areaD = d + ` L ${pts[pts.length-1].x},${H} L ${pts[0].x},${H} Z`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${color.replace('#','')})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Metric Stat Card ────────────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub, color = "#D4A853" }: { icon: React.ReactNode; label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{
      background: "rgba(46,59,39,0.7)", border: "1px solid rgba(79,94,68,0.5)",
      borderRadius: "10px", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "6px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#A8B89A", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 700, color }}>{value}</div>
      {sub && <div style={{ fontSize: "11px", color: "#A8B89A" }}>{sub}</div>}
    </div>
  );
}

// ─── Signal Badge ────────────────────────────────────────────────────────────────────────

const SIGNAL_STYLES: Record<string, { bg: string; border: string; color: string }> = {
  "Strong Buy": { bg: "rgba(74,222,128,0.15)", border: "rgba(74,222,128,0.5)", color: "#4ade80" },
  "Rising":     { bg: "rgba(212,168,83,0.15)",  border: "rgba(212,168,83,0.5)",  color: "#D4A853" },
  "Watch":      { bg: "rgba(168,184,154,0.12)", border: "rgba(168,184,154,0.4)", color: "#A8B89A" },
  "Cooling":    { bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.4)", color: "#f87171" },
};

// ─── Bangalore Metrics Modal ──────────────────────────────────────────────────────────────

function BangaloreMetricsModal({ product, onClose }: { product: WellGoingProduct; onClose: () => void }) {
  const m = product.bangaloreMetrics;
  const sig = SIGNAL_STYLES[m.overallSignal] ?? SIGNAL_STYLES["Watch"];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const modal = (
    // Backdrop
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(10,18,8,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.18s ease",
      }}
    >
      {/* Panel */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#2A3824",
          border: "1px solid #4F5E44",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "760px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          animation: "slideUp 0.2s ease",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
              <span style={{
                fontSize: "10px", padding: "2px 10px", borderRadius: "10px", fontWeight: 700,
                background: sig.bg, border: `1px solid ${sig.border}`, color: sig.color,
                display: "inline-flex", alignItems: "center", gap: "4px"
              }}>
                <Zap size={10} /> {m.overallSignal}
              </span>
              <span style={{ fontSize: "11px", color: "#A8B89A", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={11} style={{ color: "#C84B31" }} /> Bangalore · {m.bangaloreHotspot}
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 700, color: "#F0EAD6", lineHeight: 1.2 }}>
              {product.name}
            </h2>
            <p style={{ fontSize: "12px", color: "#A8B89A", marginTop: "4px" }}>{product.category}</p>
          </div>
          <button
            onClick={onClose}
            style={{ background: "rgba(79,94,68,0.4)", border: "1px solid #4F5E44", borderRadius: "8px", padding: "6px", cursor: "pointer", color: "#A8B89A", display: "flex" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Insight Summary */}
        <div style={{ background: "rgba(200,75,49,0.08)", border: "1px solid rgba(200,75,49,0.25)", borderRadius: "10px", padding: "14px 16px", display: "flex", gap: "10px" }}>
          <Info size={16} style={{ color: "#D4A853", flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontSize: "13px", color: "#F0EAD6", lineHeight: 1.6 }}>{m.insightSummary}</p>
        </div>

        {/* Instagram */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "13px" }}>📸</span>
            </div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#F0EAD6" }}>Instagram · Bangalore Geo</h3>
            <span style={{ fontSize: "10px", color: "#A8B89A", marginLeft: "auto" }}>Last 30 days</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px", marginBottom: "12px" }}>
            <StatCard icon={<Eye size={13} />} label="Views" value={m.instagram.views.toLocaleString("en-IN")} color="#c084fc" />
            <StatCard icon={<Heart size={13} />} label="Likes" value={m.instagram.likes.toLocaleString("en-IN")} color="#f87171" />
            <StatCard icon={<ArrowUpRight size={13} />} label="Reel Mentions" value={m.instagram.reelMentions.toLocaleString()} color="#fb923c" />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {m.instagram.topHashtags.map(tag => (
              <span key={tag} style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "6px", background: "rgba(192,132,252,0.12)", border: "1px solid rgba(192,132,252,0.3)", color: "#c084fc", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                <Hash size={9} />{tag.replace('#','')}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(79,94,68,0.4)" }} />

        {/* Google Trends */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(66,133,244,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BarChart2 size={14} style={{ color: "#4285f4" }} />
            </div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#F0EAD6" }}>Google Trends · Bangalore</h3>
            <span style={{ fontSize: "10px", color: "#A8B89A", marginLeft: "auto" }}>8-week index</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
            <StatCard icon={<Search size={13} />} label="Monthly Searches" value={m.googleTrends.searchVolume.toLocaleString("en-IN")} sub="Bangalore geo" color="#4285f4" />
            <StatCard icon={<Zap size={13} />} label="Peak Day" value={m.googleTrends.peakDay} sub="Highest search activity" color="#4285f4" />
          </div>
          <div style={{ background: "rgba(66,133,244,0.06)", border: "1px solid rgba(66,133,244,0.2)", borderRadius: "10px", padding: "12px 16px", marginBottom: "10px" }}>
            <p style={{ fontSize: "11px", color: "#A8B89A", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>8-Week Search Index</p>
            <TrendSparkline data={m.googleTrends.weeklySparkline} color="#4285f4" />
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "#A8B89A", marginBottom: "6px" }}>Related Queries</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {m.googleTrends.relatedQueries.map(q => (
                <span key={q} style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "6px", background: "rgba(66,133,244,0.1)", border: "1px solid rgba(66,133,244,0.25)", color: "#93c5fd" }}>{q}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(79,94,68,0.4)" }} />

        {/* Myntra + Ajio side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>

          {/* Myntra */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,63,108,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShoppingBag size={14} style={{ color: "#ff3f6c" }} />
              </div>
              <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#F0EAD6" }}>Myntra</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <StatCard icon={<Search size={12} />} label="Searches / mo" value={m.myntra.searches.toLocaleString("en-IN")} color="#ff3f6c" />
              <StatCard icon={<Heart size={12} />} label="Wishlist Adds" value={m.myntra.wishlistAdds.toLocaleString("en-IN")} color="#ff3f6c" />
              <StatCard icon={<ArrowUpRight size={12} />} label="Conversion" value={`${m.myntra.conversionRate}%`} color="#ff3f6c" />
              <StatCard icon={<ShoppingCart size={12} />} label="Avg Order" value={`₹${m.myntra.avgOrderValue.toLocaleString("en-IN")}`} color="#ff3f6c" />
            </div>
          </div>

          {/* Ajio */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShoppingBag size={14} style={{ color: "#818cf8" }} />
              </div>
              <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#F0EAD6" }}>Ajio</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <StatCard icon={<Eye size={12} />} label="Page Views" value={m.ajio.pageViews.toLocaleString("en-IN")} color="#818cf8" />
              <StatCard icon={<ShoppingCart size={12} />} label="Add to Cart" value={m.ajio.addToCart.toLocaleString("en-IN")} color="#818cf8" />
              <StatCard icon={<ArrowUpRight size={12} />} label="Conversion" value={`${m.ajio.conversionRate}%`} color="#818cf8" />
              <StatCard icon={<BarChart2 size={12} />} label="Return Rate" value={`${m.ajio.returnRate}%`} color={m.ajio.returnRate > 11 ? "#f87171" : "#818cf8"} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(79,94,68,0.4)", paddingTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontSize: "11px", color: "#4F5E44" }}>Data scope: Bangalore metro only · Simulated signals · Last 30 days</span>
          <button onClick={onClose} style={{ padding: "6px 16px", borderRadius: "8px", background: "rgba(79,94,68,0.4)", border: "1px solid #4F5E44", color: "#A8B89A", fontSize: "12px", cursor: "pointer" }}>Close</button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(24px) scale(0.98); opacity:0 } to { transform:translateY(0) scale(1); opacity:1 } }
      `}</style>
    </div>
  );

  if (typeof window === "undefined") return null;
  return ReactDOM.createPortal(modal, document.body);
}

// ─── Well-Going Products Section ──────────────────────────────────────────────────────────────────

function WellGoingProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<WellGoingProduct | null>(null);
  return (
    <section style={{ marginTop: "0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <ShoppingBag size={20} style={{ color: "#D4A853" }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 700, color: "#F0EAD6" }}>
              Well-Going Products
            </h2>
          </div>
          <p style={{ fontSize: "13px", color: "#A8B89A" }}>
            Top performing inventory linked to high-velocity trend attributes. <span style={{ color: "#C84B31" }}>Click any card</span> to see Bangalore market signals.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <MapPin size={13} style={{ color: "#C84B31" }} />
          <span style={{ fontSize: "12px", color: "#A8B89A", fontWeight: 600 }}>Bangalore · Sorted by Sales Volume ↓</span>
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
        gap: "18px",
      }}>
        {WELL_GOING_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            onClick={() => setSelectedProduct(prod)}
            style={{
              background: "#364430",
              border: "1px solid #4F5E44",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              transition: "transform 0.15s, border-color 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#C84B31";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 24px rgba(200,75,49,0.2)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#4F5E44";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            <div>
              {/* Badge & Category */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{
                  fontSize: "10px", padding: "2px 8px", borderRadius: "10px",
                  background: "rgba(212,168,83,0.18)", border: "1px solid rgba(212,168,83,0.4)",
                  color: "#D4A853", fontWeight: 700
                }}>
                  {prod.badgeText}
                </span>
                <span style={{ fontSize: "11px", color: "#A8B89A" }}>{prod.category}</span>
              </div>

              {/* Product Header */}
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#F0EAD6", marginBottom: "12px", lineHeight: 1.3 }}>
                {prod.name}
              </h3>

              {/* Units & Revenue */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 12px", background: "#2E3B27", borderRadius: "8px",
                border: "1px solid rgba(79,94,68,0.4)", marginBottom: "12px"
              }}>
                <div>
                  <p style={{ fontSize: "10px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.05em" }}>Units Sold</p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "18px", fontWeight: 700, color: "#4ade80" }}>
                    {prod.unitsSold}
                  </p>
                </div>

                {/* Upward Sales Trend Sparkline */}
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "10px", color: "#A8B89A", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>Trend</p>
                  <svg width={50} height={20} viewBox="0 0 50 20">
                    <polyline
                      points="0,18 8,14 16,15 24,10 32,11 40,5 50,2"
                      fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Matched Attribute Tags */}
            <div>
              <p style={{ fontSize: "11px", color: "#A8B89A", marginBottom: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                <Tag size={11} /> Matched Trends:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
                {prod.matchedAttributeTags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "10px", padding: "2px 7px", borderRadius: "6px",
                      background: "rgba(200,75,49,0.15)", border: "1px solid rgba(200,75,49,0.3)",
                      color: "#F0EAD6", textTransform: "capitalize"
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal portal */}
      {selectedProduct && (
        <BangaloreMetricsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function TrendsPage() {
  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", paddingBottom: "40px" }}>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <Activity size={22} style={{ color: "#C84B31" }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: "#F0EAD6" }}>
            Trend Engine
          </h1>
        </div>
        <p style={{ fontSize: "13px", color: "#A8B89A" }}>
          Automated demand trajectory tracking across 1,000+ DeepFashion attributes & top boutique inventory.
        </p>
      </div>

      {/* Navratri Festival Context Banner */}
      <div style={{
        background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.3)",
        borderRadius: "10px", padding: "14px 18px",
        display: "flex", alignItems: "center", gap: "12px",
        marginBottom: "28px",
      }}>
        <Sparkles size={20} style={{ color: "#D4A853", flexShrink: 0 }} />
        <div>
          <p style={{ fontWeight: 700, color: "#D4A853", fontSize: "14px", marginBottom: "2px" }}>
            Navratri & Festival Season Approaching (~89 days)
          </p>
          <p style={{ fontSize: "12px", color: "#A8B89A" }}>
            Ethnic wear attributes like <strong style={{ color: "#F0EAD6" }}>Ikat Print</strong>, <strong style={{ color: "#F0EAD6" }}>Organza</strong>, and <strong style={{ color: "#F0EAD6" }}>Midi Silhouettes</strong> are experiencing strong upward momentum.
          </p>
        </div>
      </div>

      {/* SECTION 1: WELL-GOING PRODUCTS */}
      <WellGoingProductsSection />

      {/* SECTION 2: TRENDING ATTRIBUTES (5 CATEGORIES) */}
      <section style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 700, color: "#F0EAD6" }}>
            Category Trend Trajectories
          </h2>
          <span style={{ fontSize: "12px", color: "#A8B89A" }}>5 Categories · Top Trends Preview</span>
        </div>

        {TREND_CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </section>

    </div>
  );
}
