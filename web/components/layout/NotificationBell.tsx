"use client";

import { useState } from "react";
import { Bell, X } from "lucide-react";

const ALERTS = [
  { id: 1, type: "warning", icon: "⚠️", text: "Low stock: Silk Banarasi Saree (M, L) — 2 units left", time: "2 min ago" },
  { id: 2, type: "success", icon: "🎯", text: "Diwali Collection: Sales target achieved (₹4.2L)", time: "1 hr ago" },
  { id: 3, type: "info", icon: "🌟", text: "High-value customer visit: Mrs. Sharma (VIP)", time: "3 hr ago" },
  { id: 4, type: "danger", icon: "📦", text: "Slow-moving: Chanderi Kurti Set — 95+ days in stock", time: "Today" },
  { id: 5, type: "warning", icon: "↩️", text: "Return spike: Organza Lehenga — 4 returns this week", time: "Today" },
  { id: 6, type: "info", icon: "🔥", text: "Peak demand detected: Red & Mustard this weekend", time: "Yesterday" },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState<number[]>([]);

  const active = ALERTS.filter(a => !dismissed.includes(a.id));

  return (
    <div style={{ position: "relative" }}>
      <button
        id="notification-bell"
        onClick={() => setOpen(!open)}
        style={{
          position: "relative",
          background: "rgba(46,59,39,0.8)",
          border: "1px solid #4F5E44",
          borderRadius: "50%",
          width: "40px", height: "40px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          color: "#F0EAD6",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "#C84B31")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "#4F5E44")}
      >
        <Bell size={18} />
        {active.length > 0 && (
          <span style={{
            position: "absolute", top: "-4px", right: "-4px",
            background: "#C84B31", color: "#F0EAD6",
            borderRadius: "50%", width: "18px", height: "18px",
            fontSize: "10px", fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #2E3B27"
          }}>
            {active.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 40 }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: "absolute", right: 0, top: "48px",
            width: "360px",
            background: "#364430", border: "1px solid #4F5E44",
            borderRadius: "12px", zIndex: 50,
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            overflow: "hidden",
            animation: "fade-in 0.2s ease-out"
          }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: "1px solid #4F5E44",
              display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#F0EAD6", fontWeight: 600 }}>
                Alerts & Notifications
              </h3>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#A8B89A", cursor: "pointer" }}>
                <X size={16} />
              </button>
            </div>

            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {active.length === 0 ? (
                <div style={{ padding: "40px 20px", textAlign: "center", color: "#A8B89A" }}>
                  <Bell size={32} style={{ margin: "0 auto 12px" }} />
                  <p>All caught up!</p>
                </div>
              ) : (
                active.map(alert => (
                  <div key={alert.id} style={{
                    padding: "12px 20px",
                    borderBottom: "1px solid rgba(79,94,68,0.4)",
                    display: "flex", gap: "12px", alignItems: "flex-start",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(79,94,68,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ fontSize: "18px", flexShrink: 0, marginTop: "1px" }}>{alert.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: "#F0EAD6", fontSize: "13px", lineHeight: 1.5 }}>{alert.text}</p>
                      <p style={{ color: "#A8B89A", fontSize: "11px", marginTop: "4px" }}>{alert.time}</p>
                    </div>
                    <button
                      onClick={() => setDismissed(d => [...d, alert.id])}
                      style={{ background: "none", border: "none", color: "#4F5E44", cursor: "pointer", flexShrink: 0 }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div style={{ padding: "12px 20px" }}>
              <button
                onClick={() => setDismissed(ALERTS.map(a => a.id))}
                style={{
                  width: "100%", padding: "8px",
                  background: "transparent", border: "1px solid #4F5E44",
                  borderRadius: "6px", color: "#A8B89A", fontSize: "12px",
                  cursor: "pointer"
                }}
              >
                Dismiss All
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
