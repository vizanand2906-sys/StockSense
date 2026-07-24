"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { GeoJsonObject, Feature, Geometry } from "geojson";
import type { Layer, PathOptions, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

// ─── Area data ─────────────────────────────────────────────────────────────

const AREAS = [
  {
    id: "malleshwaram",
    name: "Malleshwaram",
    color: "#c084fc",
    description: "Heritage area · Traditional buyers",
    coords: [
      [77.5640, 13.0045], [77.5720, 13.0070], [77.5800, 13.0060],
      [77.5840, 13.0030], [77.5850, 12.9980], [77.5820, 12.9940],
      [77.5770, 12.9920], [77.5700, 12.9930], [77.5640, 12.9970],
      [77.5620, 13.0010], [77.5640, 13.0045],
    ],
    trends: [
      { item: "Silk Sarees", signal: "SURGE", change: "+480%", icon: "🥻" },
      { item: "Cotton Kurtas", signal: "RISING", change: "+188%", icon: "🌿" },
      { item: "Traditional Lehengas", signal: "RISING", change: "+124%", icon: "👗" },
      { item: "Phulkari Embroidery", signal: "RISING", change: "+78%", icon: "🌺" },
      { item: "Indo-Western Fusion", signal: "DECLINING", change: "−18%", icon: "📉" },
    ],
  },
  {
    id: "cbd",
    name: "Central Business District",
    color: "#6B9EFF",
    description: "MG Road / Cubbon Park · Office buyers",
    coords: [
      [77.5920, 12.9850], [77.6000, 12.9860], [77.6080, 12.9840],
      [77.6120, 12.9800], [77.6110, 12.9730], [77.6060, 12.9680],
      [77.5980, 12.9660], [77.5910, 12.9690], [77.5880, 12.9750],
      [77.5890, 12.9810], [77.5920, 12.9850],
    ],
    trends: [
      { item: "Office-wear Kurtas", signal: "SURGE", change: "+340%", icon: "👔" },
      { item: "Silk Sarees", signal: "RISING", change: "+145%", icon: "🥻" },
      { item: "Mirror-work Anarkali", signal: "RISING", change: "+112%", icon: "🪞" },
      { item: "Chanderi Sets", signal: "RISING", change: "+79%", icon: "🎀" },
      { item: "Casual Kurtas", signal: "DECLINING", change: "−22%", icon: "📉" },
    ],
  },
  {
    id: "indiranagar",
    name: "Indiranagar",
    color: "#C84B31",
    description: "Trendy east Bengaluru · Early adopters",
    coords: [
      [77.6340, 12.9820], [77.6420, 12.9830], [77.6510, 12.9810],
      [77.6570, 12.9760], [77.6560, 12.9680], [77.6490, 12.9630],
      [77.6400, 12.9610], [77.6310, 12.9640], [77.6270, 12.9710],
      [77.6290, 12.9780], [77.6340, 12.9820],
    ],
    trends: [
      { item: "Mirror-work Anarkali", signal: "SURGE", change: "+430%" },
      { item: "Pastel Co-ord Sets", signal: "RISING", change: "+218%" },
      { item: "Linen Kurtas", signal: "RISING", change: "+94%" },
      { item: "Indo-Western Fusion", signal: "RISING", change: "+67%" },
      { item: "Heavy Georgette", signal: "DECLINING", change: "−38%" },
    ],
  },
  {
    id: "jayanagar",
    name: "Jayanagar",
    color: "#4ade80",
    description: "South Bengaluru · High-spend boutique shoppers",
    coords: [
      [77.5720, 12.9430], [77.5810, 12.9450], [77.5910, 12.9440],
      [77.6000, 12.9420], [77.6030, 12.9360], [77.6010, 12.9280],
      [77.5930, 12.9230], [77.5830, 12.9210], [77.5730, 12.9240],
      [77.5680, 12.9310], [77.5690, 12.9390], [77.5720, 12.9430],
    ],
    trends: [
      { item: "Phulkari Embroidery", signal: "SURGE", change: "+510%" },
      { item: "Mirror-work Anarkali", signal: "SURGE", change: "+295%" },
      { item: "Cotton Kurtas", signal: "RISING", change: "+132%" },
      { item: "Pastel Co-ord Sets", signal: "RISING", change: "+89%" },
      { item: "Heavy Lehengas", signal: "DECLINING", change: "−44%" },
    ],
  },
  {
    id: "koramangala",
    name: "Koramangala",
    color: "#D4A853",
    description: "Southeast startup belt · Young professionals",
    coords: [
      [77.6180, 12.9380], [77.6260, 12.9400], [77.6360, 12.9390],
      [77.6440, 12.9350], [77.6470, 12.9270], [77.6430, 12.9190],
      [77.6340, 12.9140], [77.6230, 12.9130], [77.6140, 12.9170],
      [77.6110, 12.9250], [77.6130, 12.9330], [77.6180, 12.9380],
    ],
    trends: [
      { item: "Pastel Co-ord Sets", signal: "SURGE", change: "+312%" },
      { item: "Indo-Western Fusion", signal: "SURGE", change: "+280%" },
      { item: "Mirror-work Anarkali", signal: "RISING", change: "+178%" },
      { item: "Denim Co-ords", signal: "RISING", change: "+88%" },
      { item: "Neon Prints", signal: "DECLINING", change: "−52%" },
    ],
  },
];

// ─── Cross-area analysis ────────────────────────────────────────────────────

function getCrossAreaSignals(selectedIds: string[]) {
  if (selectedIds.length < 2) return [];
  const sel = AREAS.filter(a => selectedIds.includes(a.id));
  const map: Record<string, { areas: string[]; color: string }> = {};
  sel.forEach(area => {
    area.trends.forEach(t => {
      if (t.signal === "DECLINING") return;
      if (!map[t.item]) map[t.item] = { areas: [], color: area.color };
      map[t.item].areas.push(area.name);
    });
  });
  return Object.entries(map)
    .filter(([_, v]) => v.areas.length >= 2)
    .sort((a, b) => b[1].areas.length - a[1].areas.length)
    .map(([item, v]) => ({ item, ...v }));
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function BangaloreMapClient() {
  const [selected, setSelected] = useState<string[]>([]);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  // Build GeoJSON FeatureCollection
  const geojson: GeoJsonObject = {
    type: "FeatureCollection",
    features: AREAS.map(area => ({
      type: "Feature",
      properties: { id: area.id, name: area.name, color: area.color },
      geometry: {
        type: "Polygon",
        coordinates: [area.coords],
      },
    })) as Feature<Geometry>[],
  };

  const style = (feature?: Feature): PathOptions => {
    const id = feature?.properties?.id;
    const area = AREAS.find(a => a.id === id);
    const isSelected = selected.includes(id);
    const isHovered = hoveredArea === id;
    return {
      fillColor: area?.color || "#888",
      fillOpacity: isSelected ? 0.38 : isHovered ? 0.22 : 0.08,
      color: area?.color || "#888",
      weight: isSelected ? 3 : isHovered ? 2 : 1.5,
      dashArray: isSelected ? undefined : "6,5",
    };
  };

  // We need a ref trick to re-render GeoJSON when selection changes
  const [geoKey, setGeoKey] = useState(0);
  useEffect(() => { setGeoKey(k => k + 1); }, [selected, hoveredArea]);

  const onEachFeature = (feature: Feature, layer: Layer) => {
    const id = feature.properties?.id;
    const area = AREAS.find(a => a.id === id);
    if (!area) return;
    layer.on({
      click: () => toggle(id),
      mouseover: (e: LeafletMouseEvent) => {
        setHoveredArea(id);
        (e.target as any).setStyle({ fillOpacity: 0.28, weight: 2 });
      },
      mouseout: (e: LeafletMouseEvent) => {
        setHoveredArea(null);
      },
    });
  };

  const selectedAreas = AREAS.filter(a => selected.includes(a.id));
  const crossSignals = getCrossAreaSignals(selected);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Instructions */}
      <div style={{ padding: "12px 18px", background: "#364430", border: "1px solid #4F5E44", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <p style={{ color: "#A8B89A", fontSize: "13px", margin: 0 }}>
          Click any highlighted neighbourhood to see its live trend signals. Select multiple to find items trending <strong style={{ color: "#D4A853" }}>city-wide</strong>.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* MAP */}
        <div style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid #4F5E44", position: "relative" }}>
          {/* Legend strip */}
          <div style={{ position: "absolute", bottom: 12, left: 12, zIndex: 1000, display: "flex", flexWrap: "wrap", gap: "6px", maxWidth: "260px" }}>
            {AREAS.map(a => (
              <button
                key={a.id}
                onClick={() => toggle(a.id)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  padding: "4px 10px", borderRadius: "20px",
                  border: `1px solid ${a.color}`,
                  background: selected.includes(a.id) ? a.color + "33" : "rgba(30,40,28,0.82)",
                  color: selected.includes(a.id) ? a.color : "#ccc",
                  fontSize: "10px", fontWeight: selected.includes(a.id) ? 700 : 400,
                  cursor: "pointer", backdropFilter: "blur(4px)",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: a.color, display: "inline-block" }} />
                {a.name}
              </button>
            ))}
          </div>
          <MapContainer
            center={[12.9716, 77.5946]}
            zoom={13}
            style={{ height: "580px", width: "100%" }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
              key={geoKey}
              data={geojson}
              style={style}
              onEachFeature={onEachFeature}
            />
          </MapContainer>
        </div>

        {/* TREND PANELS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", overflowY: "auto", maxHeight: "580px" }}>
          {selected.length === 0 ? (
            <div style={{ background: "#364430", border: "1px solid #4F5E44", borderRadius: "12px", padding: "48px 24px", textAlign: "center" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4F5E44" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px" }}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <p style={{ color: "#F0EAD6", fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", marginBottom: "8px" }}>Click a neighbourhood</p>
              <p style={{ color: "#A8B89A", fontSize: "13px" }}>The trend signals for that area will appear here.</p>
            </div>
          ) : selectedAreas.map(area => (
            <div key={area.id} style={{ background: "#364430", border: `1px solid ${area.color}44`, borderLeft: `4px solid ${area.color}`, borderRadius: "12px", padding: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "#F0EAD6", fontWeight: 700 }}>{area.name}</p>
                  <p style={{ fontSize: "11px", color: "#A8B89A" }}>{area.description}</p>
                </div>
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: area.color, boxShadow: `0 0 8px ${area.color}`, marginTop: "4px" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {area.trends.map((t, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "7px 11px", borderRadius: "8px",
                    background: t.signal === "DECLINING" ? "rgba(248,113,113,0.06)" : t.signal === "SURGE" ? `${area.color}11` : "#2E3B2766",
                    border: t.signal === "SURGE" ? `1px solid ${area.color}44` : "1px solid transparent",
                  }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0, background: t.signal === "SURGE" ? area.color : t.signal === "RISING" ? "#4ade80" : "#f87171", display: "inline-block" }} />
                      <span style={{ color: t.signal === "DECLINING" ? "#A8B89A" : "#F0EAD6", fontSize: "12px", fontWeight: t.signal === "SURGE" ? 700 : 400 }}>{t.item}</span>
                    </span>
                    <span style={{ display: "flex", gap: "7px", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: t.signal === "SURGE" ? area.color : t.signal === "RISING" ? "#4ade80" : "#f87171" }}>{t.change}</span>
                      <span style={{ fontSize: "9px", fontWeight: 800, padding: "2px 6px", borderRadius: "10px", background: t.signal === "SURGE" ? `${area.color}22` : t.signal === "RISING" ? "#4ade8022" : "#f8717122", color: t.signal === "SURGE" ? area.color : t.signal === "RISING" ? "#4ade80" : "#f87171" }}>{t.signal}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CROSS-AREA SIGNALS */}
      {crossSignals.length > 0 && (
        <div style={{ background: "#364430", border: "1px solid #D4A85366", borderRadius: "14px", padding: "22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C84B31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#F0EAD6", margin: 0 }}>City-Wide Signals — Buy with Confidence</h2>
              <p style={{ color: "#A8B89A", fontSize: "12px", margin: 0 }}>Trending across multiple neighbourhoods — your strongest buy signal.</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
            {crossSignals.map((s, i) => {
              const strength = s.areas.length >= 4 ? "VERY STRONG" : s.areas.length === 3 ? "STRONG" : "CONFIRMED";
              const sc = s.areas.length >= 4 ? "#C84B31" : s.areas.length === 3 ? "#D4A853" : "#4ade80";
              return (
                <div key={i} style={{ padding: "14px", background: "#2E3B27", borderRadius: "10px", border: `1px solid ${sc}44`, borderTop: `3px solid ${sc}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.color, display: "inline-block", flexShrink: 0 }} />
                      <span style={{ color: "#F0EAD6", fontWeight: 700, fontSize: "13px" }}>{s.item}</span>
                    </span>
                    <span style={{ fontSize: "9px", fontWeight: 800, padding: "2px 7px", borderRadius: "10px", background: `${sc}22`, color: sc, border: `1px solid ${sc}55`, whiteSpace: "nowrap" }}>{strength}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "8px" }}>
                    {s.areas.map((name, j) => {
                      const a = AREAS.find(x => x.name === name);
                      return <span key={j} style={{ fontSize: "10px", padding: "2px 7px", borderRadius: "10px", background: `${a?.color || "#888"}22`, color: a?.color || "#888", border: `1px solid ${a?.color || "#888"}44`, display: "inline-flex", alignItems: "center", gap: "3px" }}><span style={{ width: "5px", height: "5px", borderRadius: "50%", background: a?.color || "#888", display: "inline-block" }} /> {name}</span>;
                    })}
                  </div>
                  <p style={{ color: "#A8B89A", fontSize: "11px", margin: 0 }}>
                    Trending in <strong style={{ color: sc }}>{s.areas.length} of {selected.length} areas</strong>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
