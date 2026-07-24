"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, TrendingUp, Package, Palette, Scissors,
  Sparkles, BookOpen, Users, Store, RefreshCcw, Sun,
  DollarSign, Megaphone, Globe, Brain, ShoppingBag,
  Layers, Settings, ChevronDown, ChevronRight, Target, BarChart3, Zap, Map, Activity, MapPin
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  {
    label: "Intelligence",
    items: [
      { name: "Trend Engine", path: "/dashboard/trends", icon: Activity },
      { name: "Buyer Guide", path: "/dashboard/buyer-guide", icon: Map },
      { name: "Neighbourhood Map", path: "/dashboard/geo-trends", icon: MapPin },
      { name: "AI Insights", path: "/dashboard/ai-insights", icon: Brain },
    ]
  },
  {
    label: "Overview",
    items: [
      { name: "Executive Dashboard", path: "/dashboard/executive", icon: LayoutDashboard },
    ]
  },
  {
    label: "Sales & Revenue",
    items: [
      { name: "Sales Dashboard", path: "/dashboard/sales", icon: TrendingUp },
      { name: "Pricing Dashboard", path: "/dashboard/pricing", icon: DollarSign },
      { name: "Seasonal Dashboard", path: "/dashboard/seasonal", icon: Sun },
    ]
  },
  {
    label: "Products",
    items: [
      { name: "Product Dashboard", path: "/dashboard/products", icon: ShoppingBag },
      { name: "Design Performance", path: "/dashboard/designs", icon: Sparkles },
      { name: "Collection Dashboard", path: "/dashboard/collections", icon: BookOpen },
    ]
  },
  {
    label: "Inventory",
    items: [
      { name: "Inventory Dashboard", path: "/dashboard/inventory", icon: Package },
      { name: "Colour Dashboard", path: "/dashboard/colours", icon: Palette },
      { name: "Fabric Dashboard", path: "/dashboard/fabrics", icon: Scissors },
    ]
  },
  {
    label: "Customers",
    items: [
      { name: "Customer Dashboard", path: "/dashboard/customers", icon: Users },
    ]
  },
  {
    label: "Operations",
    items: [
      { name: "Boutique Operations", path: "/dashboard/operations", icon: Store },
      { name: "Trial Room", path: "/dashboard/trial-room", icon: Layers },
      { name: "Returns Dashboard", path: "/dashboard/returns", icon: RefreshCcw },
    ]
  },
  {
    label: "Growth",
    items: [
      { name: "Marketing Dashboard", path: "/dashboard/marketing", icon: Megaphone },
      { name: "Online Store", path: "/dashboard/online-store", icon: Globe },
    ]
  },
  {
    label: "Venture",
    items: [
      { name: "Market Opportunity", path: "/dashboard/market", icon: Target },
      { name: "Business Model", path: "/dashboard/business-model", icon: BarChart3 },
      { name: "Traction & Validation", path: "/dashboard/traction", icon: Zap },
    ]
  },
];

export function PhulkariSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<string[]>([]);

  const toggleSection = (label: string) => {
    setCollapsed(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  return (
    <aside
      style={{
        width: "280px",
        flexShrink: 0,
        height: "100%",
        overflowY: "auto",
        background: "#1E2B1A",
        borderRight: "1px solid #4F5E44",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <nav style={{ flex: 1, padding: "20px 0", overflowY: "auto" }}>
        {NAV_SECTIONS.map((section) => {
          const isCollapsed = collapsed.includes(section.label);
          return (
            <div key={section.label} style={{ marginBottom: "8px" }}>
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.label)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 20px 6px",
                  background: "none", border: "none", cursor: "pointer",
                }}
              >
                <span style={{
                  fontSize: "13px", fontWeight: 800,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#D4A853",
                }}>
                  {section.label}
                </span>
                {isCollapsed
                  ? <ChevronRight size={13} color="#A8B89A" />
                  : <ChevronDown size={13} color="#A8B89A" />}
              </button>

              {/* Nav items */}
              {!isCollapsed && section.items.map((item) => {
                const isActive = pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    style={{
                      display: "flex", alignItems: "center", gap: "13px",
                      padding: "11px 20px",
                      fontSize: "17px", fontWeight: isActive ? 700 : 400,
                      color: isActive ? "#F0EAD6" : "#A8B89A",
                      background: isActive ? "rgba(200,75,49,0.22)" : "transparent",
                      borderLeft: isActive ? "4px solid #C84B31" : "4px solid transparent",
                      textDecoration: "none",
                      transition: "all 0.15s ease",
                      borderRadius: "0 8px 8px 0",
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#F0EAD6";
                        e.currentTarget.style.background = "rgba(79,94,68,0.35)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#A8B89A";
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <item.icon
                      size={21}
                      style={{ color: isActive ? "#C84B31" : "#A8B89A", flexShrink: 0 }}
                    />
                    <span style={{ lineHeight: 1.3 }}>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Bottom: Settings */}
      <div style={{ borderTop: "1px solid #4F5E44", padding: "14px 0" }}>
        <Link
          href="/dashboard/settings"
          style={{
            display: "flex", alignItems: "center", gap: "13px",
            padding: "11px 20px", fontSize: "17px",
            color: pathname.startsWith("/dashboard/settings") ? "#F0EAD6" : "#A8B89A",
            background: pathname.startsWith("/dashboard/settings") ? "rgba(200,75,49,0.22)" : "transparent",
            borderLeft: pathname.startsWith("/dashboard/settings") ? "4px solid #C84B31" : "4px solid transparent",
            textDecoration: "none", transition: "all 0.15s",
            borderRadius: "0 8px 8px 0",
          }}
        >
          <Settings size={19} />
          Settings
        </Link>
        <div style={{ padding: "10px 20px" }}>
          <p style={{ fontSize: "12px", color: "#4F5E44", margin: 0 }}>Phulkari · StockSense v2.0</p>
        </div>
      </div>
    </aside>
  );
}
