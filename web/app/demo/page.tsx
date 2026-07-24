"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Colour tokens (match Phulkari brand) ────────────────────────────────────
const C = {
  bg: "#0f1a0c",
  card: "#1E2B1A",
  border: "#4F5E44",
  red: "#C84B31",
  gold: "#D4A853",
  sage: "#A8B89A",
  cream: "#F0EAD6",
  green: "#4ade80",
};

// ─── Demo "chapters" — each maps to a dashboard page or stand-alone scene ────
const CHAPTERS = [
  { id: "welcome",    label: "Welcome" },
  { id: "problem",   label: "The Problem" },
  { id: "trends",    label: "Trend Intelligence" },
  { id: "guide",     label: "Buying Guide" },
  { id: "analytics", label: "Analytics" },
  { id: "customers", label: "Customer CRM" },
  { id: "close",     label: "The Mission" },
];

// ─── Tiny helper ─────────────────────────────────────────────────────────────
function Tag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.06em",
      background: color + "22", color, border: `1px solid ${color}55`,
    }}>
      {children}
    </span>
  );
}

function DemoButton({
  href, children, primary, external
}: { href: string; children: React.ReactNode; primary?: boolean; external?: boolean }) {
  const style: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: primary ? "14px 32px" : "12px 24px",
    borderRadius: 10, fontWeight: 700,
    fontSize: primary ? 15 : 13,
    textDecoration: "none",
    transition: "all 0.2s ease",
    background: primary ? C.red : "transparent",
    color: primary ? C.cream : C.sage,
    border: primary ? `2px solid ${C.red}` : `1px solid ${C.border}`,
    cursor: "pointer",
    letterSpacing: "0.02em",
  };
  if (external) {
    return <a href={href} target="_blank" rel="noreferrer" style={style}>{children}</a>;
  }
  return <Link href={href} style={style}>{children}</Link>;
}

// ─── Progress dots ────────────────────────────────────────────────────────────
function ProgressBar({ active }: { active: number }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", gap: 4, padding: "12px 24px",
      background: "linear-gradient(to bottom, #0f1a0cee, transparent)",
    }}>
      {CHAPTERS.map((c, i) => (
        <div key={c.id} style={{
          flex: 1, height: 3, borderRadius: 2,
          background: i === active ? C.red : i < active ? C.gold : C.border,
          transition: "background 0.4s ease",
        }} />
      ))}
    </div>
  );
}

// ─── Chapter labels ───────────────────────────────────────────────────────────
function ChapterLabel({ active }: { active: number }) {
  return (
    <div style={{
      position: "fixed", top: 18, left: 0, right: 0, zIndex: 101,
      display: "flex", justifyContent: "center", pointerEvents: "none",
    }}>
      <span style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
        textTransform: "uppercase", color: C.sage, opacity: 0.6,
      }}>
        {CHAPTERS[active]?.label}
      </span>
    </div>
  );
}

// ─── Nav arrows ──────────────────────────────────────────────────────────────
function NavArrow({ dir, onClick, disabled }: { dir: "prev" | "next"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "next" ? "Next section" : "Previous section"}
      style={{
        position: "fixed",
        [dir === "next" ? "right" : "left"]: 28,
        bottom: 36,
        zIndex: 100,
        width: 48, height: 48, borderRadius: "50%",
        background: disabled ? C.border + "22" : C.card,
        border: `1px solid ${disabled ? C.border + "44" : C.border}`,
        color: disabled ? C.border : C.cream,
        fontSize: 20, cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
        opacity: disabled ? 0.3 : 1,
      }}
    >
      {dir === "next" ? "›" : "‹"}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 0 — WELCOME / BRAND
// ═══════════════════════════════════════════════════════════════════════════════
function SceneWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "40px 24px",
      textAlign: "center", position: "relative",
    }}>
      {/* Background texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "repeating-linear-gradient(45deg, #D4A853 0px, #D4A853 1px, transparent 1px, transparent 12px)",
        pointerEvents: "none",
      }} />

      {/* Phulkari brand badge */}
      <div style={{
        padding: "6px 18px", borderRadius: 30,
        background: C.gold + "18", border: `1px solid ${C.gold}44`,
        color: C.gold, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em",
        textTransform: "uppercase", marginBottom: 32,
      }}>
        Phulkari by Preeth Design Studios
      </div>

      {/* Main headline */}
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(42px, 7vw, 84px)",
        fontWeight: 700, lineHeight: 1.05,
        color: C.cream, marginBottom: 20, maxWidth: 900,
      }}>
        Your store.<br />
        <span style={{ color: C.gold }}>Your intelligence.</span>
      </h1>

      <p style={{
        fontSize: 18, color: C.sage, maxWidth: 560, lineHeight: 1.7, marginBottom: 48,
      }}>
        For the first time, an independent boutique has access to the same demand intelligence 
        that the big chains have had for years.
      </p>

      {/* StockSense pill */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12, marginBottom: 56,
        padding: "12px 24px", borderRadius: 40,
        background: C.card, border: `1px solid ${C.border}`,
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%", background: C.green,
          boxShadow: `0 0 8px ${C.green}`,
          animation: "pulse 2s infinite",
        }} />
        <span style={{ color: C.cream, fontSize: 13, fontWeight: 600 }}>
          StockSense — Live Demo
        </span>
        <span style={{ color: C.sage, fontSize: 12 }}>Phulkari · July 2026</span>
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        style={{
          padding: "16px 48px", borderRadius: 12, fontSize: 16, fontWeight: 700,
          background: C.red, color: C.cream, border: "none", cursor: "pointer",
          letterSpacing: "0.04em", transition: "all 0.2s",
          boxShadow: `0 4px 32px ${C.red}44`,
        }}
      >
        Start the Story →
      </button>

      <p style={{ marginTop: 16, fontSize: 12, color: C.border }}>
        Use arrow keys or the buttons below to navigate
      </p>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 1 — THE PROBLEM
// ═══════════════════════════════════════════════════════════════════════════════
function SceneProblem() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      left: (
        <div>
          <Tag color={C.gold}>Monday Morning</Tag>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, color: C.cream, marginTop: 16, lineHeight: 1.15 }}>
            A customer walks in.
          </h2>
          <p style={{ color: C.sage, fontSize: 18, marginTop: 16, lineHeight: 1.7 }}>
            She opens Instagram. She shows you a screenshot.
          </p>
          <p style={{ color: C.cream, fontSize: 22, fontWeight: 700, marginTop: 24, fontStyle: "italic" }}>
            "Do you have this?"
          </p>
        </div>
      ),
      right: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ borderRadius: 24, overflow: "hidden", border: `3px solid ${C.border}`, maxWidth: 340 }}>
            <Image src="/demo_instagram.png" alt="Instagram screenshot of pastel anarkali kurta" width={340} height={420} style={{ objectFit: "cover", display: "block" }} />
          </div>
        </div>
      ),
    },
    {
      left: (
        <div>
          <Tag color={C.red}>Sale Lost</Tag>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, color: C.cream, marginTop: 16, lineHeight: 1.15 }}>
            You don't have it.
          </h2>
          <div style={{ marginTop: 24, padding: "20px 24px", background: C.red + "18", border: `1px solid ${C.red}44`, borderRadius: 12 }}>
            <p style={{ color: C.red, fontSize: 16, fontWeight: 600 }}>
              "Give me a week."
            </p>
            <p style={{ color: C.sage, fontSize: 14, marginTop: 8 }}>
              She smiles. She leaves. She orders it online.
            </p>
          </div>
          <p style={{ color: C.sage, fontSize: 16, marginTop: 24, lineHeight: 1.7 }}>
            Tuesday — a different screenshot. Same answer. Another lost sale.<br /><br />
            Thursday — wholesale market day. One question:<br />
            <span style={{ color: C.gold, fontWeight: 700 }}>What should I buy?</span>
          </p>
        </div>
      ),
      right: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Mon", event: "Customer shows Instagram screenshot", outcome: "❌ No stock", color: C.red },
            { label: "Tue", event: "Another screenshot. Another trend.", outcome: "❌ No stock", color: C.red },
            { label: "Thu", event: "Wholesale market. You guess.", outcome: "⚠️ ₹2L at risk", color: C.gold },
            { label: "Day 14–21", event: "Stock finally arrives.", outcome: "💨 Trend gone", color: C.border },
          ].map((row, i) => (
            <div key={i} style={{
              padding: "14px 18px", borderRadius: 10,
              background: C.card, border: `1px solid ${C.border}`,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                minWidth: 50, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", color: C.sage,
              }}>{row.label}</div>
              <div style={{ flex: 1, fontSize: 13, color: C.cream }}>{row.event}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: row.color, whiteSpace: "nowrap" }}>{row.outcome}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      left: (
        <div>
          <Tag color={C.sage}>Meanwhile…</Tag>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, color: C.cream, marginTop: 16, lineHeight: 1.15 }}>
            The game was<br />never fair.
          </h2>
          <p style={{ color: C.sage, fontSize: 16, marginTop: 20, lineHeight: 1.7 }}>
            Manyavar. Reliance Trends. Shopper's Stop.<br /><br />
            Before their buyers visit a single supplier, they already know — 
            <span style={{ color: C.gold }}> which styles, which city, which sizes, which colours.</span>
          </p>
          <p style={{ color: C.cream, fontSize: 16, marginTop: 20, lineHeight: 1.7 }}>
            That infrastructure costs crores. A single boutique can never build it.
          </p>
          <div style={{ marginTop: 28, padding: "18px 22px", background: C.gold + "12", border: `1px solid ${C.gold}33`, borderRadius: 12 }}>
            <p style={{ color: C.gold, fontWeight: 700, fontSize: 15 }}>
              Big retailers compete with intelligence.<br />
              Independent boutiques compete with instinct.
            </p>
          </div>
        </div>
      ),
      right: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ padding: "20px 24px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: C.gold, textTransform: "uppercase", marginBottom: 12 }}>
              What organised retail already knows
            </p>
            {[
              "What's trending this week ✓",
              "Which city, which pin code ✓",
              "Which silhouettes are peaking ✓",
              "Which colours are surging ✓",
              "Exact size-curve demand ✓",
            ].map((item, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: i < 4 ? `1px solid ${C.border}44` : "none", color: C.cream, fontSize: 14 }}>
                {item}
              </div>
            ))}
          </div>
          <div style={{ padding: "20px 24px", borderRadius: 12, background: C.red + "10", border: `1px solid ${C.red}33` }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: C.red, textTransform: "uppercase", marginBottom: 12 }}>
              What an independent boutique has
            </p>
            {["Instinct", "Experience", "Guesswork"].map((item, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: i < 2 ? `1px solid ${C.border}44` : "none", color: C.sage, fontSize: 14 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "80px 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Step indicator */}
      <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
        {steps.map((_, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            width: 32, height: 4, borderRadius: 2, border: "none", cursor: "pointer",
            background: i === step ? C.red : i < step ? C.gold : C.border,
            transition: "background 0.3s",
          }} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>{steps[step].left}</div>
        <div>{steps[step].right}</div>
      </div>

      {/* Sub-nav */}
      <div style={{ display: "flex", gap: 12, marginTop: 48 }}>
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} style={{
            padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 600,
            background: "transparent", border: `1px solid ${C.border}`, color: C.sage, cursor: "pointer",
          }}>← Back</button>
        )}
        {step < steps.length - 1 && (
          <button onClick={() => setStep(s => s + 1)} style={{
            padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 600,
            background: C.card, border: `1px solid ${C.border}`, color: C.cream, cursor: "pointer",
          }}>Continue →</button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 2 — TREND INTELLIGENCE
// ═══════════════════════════════════════════════════════════════════════════════
function SceneTrends() {
  return (
    <div style={{ minHeight: "100vh", padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 40 }}>
        <Tag color={C.green}>Live Feature</Tag>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: C.cream, marginTop: 14, lineHeight: 1.1 }}>
          Your head buyer.<br />
          <span style={{ color: C.gold }}>Always on.</span>
        </h2>
        <p style={{ color: C.sage, fontSize: 17, marginTop: 16, maxWidth: 640, lineHeight: 1.7 }}>
          Before you leave for Chickpet tomorrow, StockSense sends you this.
          Not what sold last month — what customers will ask for next week.
        </p>
      </div>

      {/* Signal cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
        {[
          {
            name: "Mirror-work Anarkalis", signal: "↑ Surging", status: "BUY NOW",
            statusColor: C.green, why: "Instagram mentions +430% · Bollywood film released 4 days ago · 14 Bengaluru micro-influencers",
            demand: "Next 2 weeks", stock: "2 units in stock",
          },
          {
            name: "Pastel Festive Co-ords", signal: "↑ Rising", status: "BUY",
            statusColor: C.green, why: "Google searches up 180% · Reels trending in Jayanagar feed · Pre-Navratri demand",
            demand: "Next 3 weeks", stock: "0 units in stock",
          },
          {
            name: "Phulkari Dupatta", signal: "↑ Rising", status: "BUY",
            statusColor: C.green, why: "Pinterest boards up 240% · Search volume 240/day · Regional craft revival",
            demand: "Ongoing", stock: "6 units in stock",
          },
          {
            name: "Wine Kurtas", signal: "↓ Declining", status: "WAIT",
            statusColor: C.gold, why: "Engagement drop 3 weeks straight · Weather: 32°C forecast next 6 weeks",
            demand: "Hold", stock: "18 units — monitor",
          },
          {
            name: "Heavy Velvet Blouses", signal: "↓ Fading", status: "SKIP",
            statusColor: C.red, why: "Post-wedding season slump · Searches down 55% · Warm weather continues",
            demand: "Avoid", stock: "45 units — overstocked",
          },
          {
            name: "Indo-Western Fusion", signal: "↗ Accelerating", status: "WATCH",
            statusColor: C.gold, why: "Meesho category up 38% · OTT costume influence · College season begins",
            demand: "2–4 weeks", stock: "4 units",
          },
        ].map((item, i) => (
          <div key={i} style={{
            padding: "18px 20px", borderRadius: 12,
            background: C.card, border: `1px solid ${C.border}`,
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h3 style={{ color: C.cream, fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>{item.name}</h3>
              <span style={{
                fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20,
                background: item.statusColor + "22", color: item.statusColor,
                border: `1px solid ${item.statusColor}44`, whiteSpace: "nowrap", marginLeft: 8,
              }}>
                {item.status}
              </span>
            </div>
            <div style={{ fontSize: 12, color: item.statusColor, fontWeight: 700 }}>{item.signal}</div>
            <p style={{ fontSize: 11, color: C.sage, lineHeight: 1.6 }}>{item.why}</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.border, marginTop: 4 }}>
              <span>⏱ {item.demand}</span>
              <span>📦 {item.stock}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA to real trends page */}
      <div style={{
        padding: "20px 28px", borderRadius: 12, background: C.red + "12",
        border: `1px solid ${C.red}44`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <p style={{ color: C.cream, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
            Open the live Trends dashboard →
          </p>
          <p style={{ color: C.sage, fontSize: 13 }}>
            Click any trend to see the full social signal breakdown, sparkline, and stock alert.
          </p>
        </div>
        <DemoButton href="/dashboard/trends" primary>Open Trends →</DemoButton>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 3 — BUYING GUIDE
// ═══════════════════════════════════════════════════════════════════════════════
function SceneBuyingGuide() {
  return (
    <div style={{ minHeight: "100vh", padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <Tag color={C.gold}>The Magic Moment</Tag>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: C.cream, marginTop: 14, lineHeight: 1.1, marginBottom: 8 }}>
        One click.<br />
        <span style={{ color: C.gold }}>Your entire buying list.</span>
      </h2>
      <p style={{ color: C.sage, fontSize: 16, marginBottom: 40, maxWidth: 640, lineHeight: 1.7 }}>
        Set tomorrow's market date. Click Generate. StockSense analyses 90 days of your sales,
        current Bengaluru trends, inventory levels, and size patterns — and tells you exactly what to buy.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        {/* What to buy */}
        <div style={{ padding: "24px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.green}` }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: C.green, textTransform: "uppercase", marginBottom: 16 }}>✓ BUY THIS WEEK</p>
          {[
            { name: "Pastel Anarkalis — Festive", qty: "12 units", sellThru: "85%", size: "S10% M40% L35% XL15%", conf: "High Confidence" },
            { name: "Linen Co-ords — Casual", qty: "8 units", sellThru: "72%", size: "S15% M40% L30% XL15%", conf: "Med Confidence" },
            { name: "Mirror-work Dupatta", qty: "15 units", sellThru: "90%", size: "Free size", conf: "High Confidence" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "14px 0", borderBottom: i < 2 ? `1px solid ${C.border}44` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ color: C.cream, fontWeight: 600, fontSize: 14 }}>{item.name}</span>
                <span style={{ color: C.green, fontSize: 13, fontWeight: 700 }}>{item.qty}</span>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 11, color: C.sage }}>Sell-through: {item.sellThru}</span>
                <span style={{ fontSize: 11, color: C.border }}>|</span>
                <span style={{ fontSize: 11, color: C.sage }}>{item.size}</span>
              </div>
            </div>
          ))}
        </div>

        {/* What to avoid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ padding: "24px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.red}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: C.red, textTransform: "uppercase", marginBottom: 16 }}>✕ SKIP THIS WEEK</p>
            {[
              { name: "Neon prints", reason: "Trend velocity declining 3 weeks" },
              { name: "Heavy georgette", reason: "32°C forecast · Wrong season" },
              { name: "Premium western", reason: "9 weeks overstock remaining" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: i < 2 ? `1px solid ${C.border}44` : "none" }}>
                <span style={{ color: C.cream, fontSize: 13, fontWeight: 600 }}>{item.name}</span>
                <p style={{ color: C.sage, fontSize: 11, marginTop: 3 }}>{item.reason}</p>
              </div>
            ))}
          </div>

          {/* Size correction highlight */}
          <div style={{ padding: "18px 20px", borderRadius: 12, background: C.gold + "10", border: `1px solid ${C.gold}33` }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: C.gold, textTransform: "uppercase", marginBottom: 10 }}>
              ⚠️ Size Curve Correction
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <p style={{ fontSize: 10, color: C.sage, marginBottom: 4 }}>What you've been buying</p>
                <p style={{ fontSize: 13, color: C.cream }}>S 20% · M 40% · L 40%</p>
              </div>
              <div>
                <p style={{ fontSize: 10, color: C.green, marginBottom: 4 }}>What actually sold</p>
                <p style={{ fontSize: 13, color: C.cream, fontWeight: 700 }}>S 10% · M 55% · L 35%</p>
              </div>
            </div>
            <div style={{ marginTop: 12, padding: "8px 12px", borderRadius: 8, background: C.green + "12", border: `1px solid ${C.green}33` }}>
              <p style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>
                → Buy 30% more Medium. Reduce Small. Save est. ₹12,400/cycle.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding: "20px 28px", borderRadius: 12,
        background: C.card, border: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <p style={{ color: C.cream, fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
            Open the live Buyer Guide →
          </p>
          <p style={{ color: C.sage, fontSize: 13 }}>
            Set a market date and click "Generate Guide" to see the full buying recommendation with budget allocation.
          </p>
        </div>
        <DemoButton href="/dashboard/buyer-guide" primary>Open Buying Guide →</DemoButton>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 4 — ANALYTICS
// ═══════════════════════════════════════════════════════════════════════════════
function SceneAnalytics() {
  return (
    <div style={{ minHeight: "100vh", padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <Tag color={C.sage}>Business Intelligence</Tag>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: C.cream, marginTop: 14, lineHeight: 1.1, marginBottom: 8 }}>
        Every sale.<br />
        <span style={{ color: C.gold }}>A lesson.</span>
      </h2>
      <p style={{ color: C.sage, fontSize: 16, marginBottom: 40, maxWidth: 640, lineHeight: 1.7 }}>
        Finally understand your business — not just see numbers. Why does Medium always sell out first?
        Which category actually makes money? Which styles slow down every August?
      </p>

      {/* Quick insight cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { icon: "📈", q: "Why does Medium sell out first?", a: "55% of actual demand is Medium. You've been buying only 40%.", link: "/dashboard/sales", label: "Sales Dashboard" },
          { icon: "💰", q: "Which category makes the most margin?", a: "Sarees: 42% gross margin. Lehengas: 46%. Blouses: 28% — reconsider.", link: "/dashboard/financials", label: "Financials" },
          { icon: "📦", q: "What's sitting unsold for 90+ days?", a: "Monsoon Chic Kurta · 18 units · ₹1.2L locked. Time to markdown.", link: "/dashboard/inventory", label: "Inventory" },
          { icon: "📅", q: "Which styles slow down in August?", a: "Heavy georgette drops 38% in July–Aug every year. Weather pattern.", link: "/dashboard/seasonal", label: "Seasonal" },
          { icon: "🏆", q: "What was your best performing collection?", a: "Diwali Festive 2025: ₹18.6L revenue · 89% sell-through · 42% margin.", link: "/dashboard/executive", label: "Executive" },
          { icon: "💳", q: "Are promos actually working?", a: "Diwali Sale (15%): ₹4.2L uplift. Birthday offers: only 14% uplift — review.", link: "/dashboard/pricing", label: "Pricing" },
        ].map((card, i) => (
          <Link key={i} href={card.link} style={{ textDecoration: "none" }}>
            <div style={{
              padding: "20px", borderRadius: 12, height: "100%",
              background: C.card, border: `1px solid ${C.border}`,
              cursor: "pointer", transition: "border-color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = C.gold)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <p style={{ color: C.sage, fontSize: 12, marginBottom: 8, lineHeight: 1.4 }}>{card.q}</p>
              <p style={{ color: C.cream, fontSize: 13, fontWeight: 600, lineHeight: 1.5, marginBottom: 12 }}>{card.a}</p>
              <span style={{ fontSize: 10, color: C.gold, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                → {card.label}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <DemoButton href="/dashboard/executive" primary>Executive Overview →</DemoButton>
        <DemoButton href="/dashboard/sales">Sales Dashboard →</DemoButton>
        <DemoButton href="/dashboard/inventory">Inventory →</DemoButton>
        <DemoButton href="/dashboard/financials">Financials →</DemoButton>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 5 — CUSTOMER CRM
// ═══════════════════════════════════════════════════════════════════════════════
function SceneCustomers() {
  return (
    <div style={{ minHeight: "100vh", padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
      <Tag color={C.red}>Customer Intelligence</Tag>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: C.cream, marginTop: 14, lineHeight: 1.1, marginBottom: 8 }}>
        Stop waiting.<br />
        <span style={{ color: C.gold }}>Start reaching.</span>
      </h2>
      <p style={{ color: C.sage, fontSize: 16, marginBottom: 40, maxWidth: 640, lineHeight: 1.7 }}>
        When new inventory lands, StockSense tells you exactly which customers want it —
        based on their purchase history. Then lets you reach them on WhatsApp. Personally.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
        {/* Customer list */}
        <div style={{ padding: "24px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: C.gold, textTransform: "uppercase", marginBottom: 16 }}>
            👑 VIP Customers — Phulkari
          </p>
          {[
            { name: "Mrs. Priya Sharma", spend: "₹2,84,000", visits: 12, tag: "Mirror-work fan", lastSeen: "8 days ago" },
            { name: "Ms. Anita Kapoor", spend: "₹1,96,000", visits: 9, tag: "Festive buyer", lastSeen: "22 days ago" },
            { name: "Mrs. Deepa Menon", spend: "₹1,68,000", visits: 8, tag: "Silk & Chanderi", lastSeen: "45 days ago — Alert!" },
          ].map((c, i) => (
            <div key={i} style={{
              padding: "14px 0", borderBottom: i < 2 ? `1px solid ${C.border}44` : "none",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: "50%", background: C.red,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.cream, fontWeight: 700, fontSize: 14, flexShrink: 0,
              }}>
                {c.name.split(" ")[1][0]}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: C.cream, fontWeight: 600, fontSize: 13 }}>{c.name}</p>
                <p style={{ color: C.sage, fontSize: 11 }}>{c.tag} · {c.lastSeen}</p>
              </div>
              <span style={{ color: C.gold, fontWeight: 700, fontFamily: "monospace", fontSize: 13 }}>{c.spend}</span>
            </div>
          ))}
        </div>

        {/* WhatsApp outreach */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ padding: "22px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: C.green, textTransform: "uppercase", marginBottom: 14 }}>
              📱 Smart WhatsApp Outreach
            </p>
            <div style={{ padding: "14px 16px", borderRadius: 10, background: "#128C7E18", border: "1px solid #128C7E44", marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: "#25D366", fontWeight: 700, marginBottom: 6 }}>Message Preview</p>
              <p style={{ fontSize: 13, color: C.cream, lineHeight: 1.6 }}>
                "Hi Priya 🌸 We just received the Mirror-work Anarkali you loved last Diwali.
                Come see it this weekend — we've kept one aside for you."
              </p>
            </div>
            <p style={{ fontSize: 12, color: C.sage, marginBottom: 16 }}>
              Targeted to 3 customers who bought mirror-work last Diwali and haven't visited in 30+ days.
            </p>
            <a
              href="https://wa.me/?text=Hi%20there!%20We%20just%20got%20the%20Mirror-work%20Anarkali%20you%20loved%20at%20Phulkari%20%F0%9F%8C%B8%20Come%20see%20it%20this%20weekend!"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                background: "#25D366", color: "#fff", textDecoration: "none",
                border: "none", cursor: "pointer",
              }}
            >
              💬 Send WhatsApp Message
            </a>
          </div>

          <div style={{ padding: "20px 22px", borderRadius: 12, background: C.card, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: C.red, textTransform: "uppercase", marginBottom: 12 }}>
              🎂 Birthday Rewards This Week
            </p>
            {["Mrs. Lakshmi R.", "Ms. Sonal Gupta", "Mrs. Neha Verma"].map((n, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between",
                padding: "8px 0", borderBottom: i < 2 ? `1px solid ${C.border}33` : "none",
              }}>
                <span style={{ color: C.cream, fontSize: 13 }}>🎂 {n}</span>
                <span style={{ color: C.gold, fontSize: 12 }}>15% Birthday Offer</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DemoButton href="/dashboard/customers" primary>Open Customer Dashboard →</DemoButton>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SCENE 6 — CLOSING
// ═══════════════════════════════════════════════════════════════════════════════
function SceneClose() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "60px 40px", textAlign: "center", position: "relative",
    }}>
      {/* Background texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "repeating-linear-gradient(135deg, #C84B31 0px, #C84B31 1px, transparent 1px, transparent 12px)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 720, position: "relative" }}>
        {/* Quote */}
        <div style={{
          padding: "24px 32px", borderRadius: 16, marginBottom: 48,
          background: C.card, border: `1px solid ${C.border}`,
          borderLeft: `4px solid ${C.gold}`,
        }}>
          <p style={{ color: C.gold, fontSize: 15, fontStyle: "italic", lineHeight: 1.7 }}>
            "If an app could give me a one-week warning on trends, I would gladly pay ₹4,000 a month
            to avoid making bad bulk commitments."
          </p>
          <p style={{ color: C.sage, fontSize: 12, marginTop: 12 }}>— Boutique owner, Jayanagar, Bengaluru</p>
        </div>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(36px, 5vw, 62px)",
          color: C.cream, lineHeight: 1.1, marginBottom: 24,
        }}>
          Nothing about Phulkari changed.
        </h2>
        <p style={{ fontSize: 18, color: C.sage, lineHeight: 1.7, marginBottom: 16 }}>
          The boutique is the same. The experience is the same. The customers are the same.
        </p>
        <p style={{ fontSize: 18, color: C.cream, lineHeight: 1.7, marginBottom: 48 }}>
          She simply received the same intelligence that organised retail has had for years.
        </p>

        <div style={{
          padding: "32px", borderRadius: 20, marginBottom: 48,
          background: "linear-gradient(135deg, #C84B3115, #D4A85315)",
          border: `1px solid ${C.gold}44`,
        }}>
          <p style={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, marginBottom: 16 }}>
            StockSense
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px, 4vw, 42px)",
            color: C.cream, lineHeight: 1.2,
          }}>
            We're not building better boutiques.
          </p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px, 4vw, 42px)",
            color: C.gold, lineHeight: 1.2, marginTop: 8,
          }}>
            We're building a fairer industry.
          </p>
        </div>

        {/* All dashboards */}
        <p style={{ color: C.sage, fontSize: 13, marginBottom: 20 }}>Explore the full platform →</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          {[
            { label: "Executive Overview", href: "/dashboard/executive" },
            { label: "Sales Dashboard", href: "/dashboard/sales" },
            { label: "Trends", href: "/dashboard/trends" },
            { label: "Buying Guide", href: "/dashboard/buyer-guide" },
            { label: "Inventory", href: "/dashboard/inventory" },
            { label: "Customers & CRM", href: "/dashboard/customers" },
            { label: "Seasonal", href: "/dashboard/seasonal" },
            { label: "Financials", href: "/dashboard/financials" },
            { label: "Operations", href: "/dashboard/operations" },
            { label: "Marketing", href: "/dashboard/marketing" },
            { label: "Online Store", href: "/dashboard/online-store" },
            { label: "AI Insights", href: "/dashboard/ai-insights" },
          ].map((d, i) => (
            <Link key={i} href={d.href} style={{
              padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: C.card, border: `1px solid ${C.border}`,
              color: C.sage, textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = C.cream; e.currentTarget.style.borderColor = C.gold; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.sage; e.currentTarget.style.borderColor = C.border; }}
            >
              {d.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT PAGE — Scene controller
// ═══════════════════════════════════════════════════════════════════════════════
const SCENES = [
  SceneWelcome,
  SceneProblem,
  SceneTrends,
  SceneBuyingGuide,
  SceneAnalytics,
  SceneCustomers,
  SceneClose,
];

export default function DemoPage() {
  const [active, setActive] = useState(0);

  const goNext = useCallback(() => setActive(a => Math.min(a + 1, SCENES.length - 1)), []);
  const goPrev = useCallback(() => setActive(a => Math.max(a - 1, 0)), []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const SceneComponent = SCENES[active];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.cream, position: "relative" }}>
      <ProgressBar active={active} />
      <ChapterLabel active={active} />

      {/* Scene */}
      <div key={active} style={{ animation: "fadeSlide 0.35s ease forwards" }}>
        {active === 0
          ? <SceneComponent onNext={goNext} />
          : <SceneComponent />
        }
      </div>

      {/* Nav arrows (hidden on first scene — handled by the big CTA button) */}
      {active > 0 && <NavArrow dir="prev" onClick={goPrev} disabled={active === 0} />}
      {active > 0 && active < SCENES.length - 1 && <NavArrow dir="next" onClick={goNext} disabled={active === SCENES.length - 1} />}

      {/* Bottom chapter dots */}
      <div style={{
        position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 8, zIndex: 100,
      }}>
        {CHAPTERS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActive(i)}
            title={c.label}
            style={{
              width: i === active ? 24 : 8, height: 8, borderRadius: 4,
              border: "none", cursor: "pointer",
              background: i === active ? C.red : i < active ? C.gold + "88" : C.border,
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
