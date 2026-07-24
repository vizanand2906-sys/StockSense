import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getFastApiUrl } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    let store_id = "demo-store-id";
    let market_trip_date = new Date().toISOString().split("T")[0];

    try {
      const body = await request.json();
      if (body.store_id) store_id = body.store_id;
      if (body.market_trip_date) market_trip_date = body.market_trip_date;
    } catch {
      // Use defaults
    }

    let guideData: any = null;
    const fastApiUrl = getFastApiUrl();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(`${fastApiUrl}/guide/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ store_id, market_trip_date }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const resJson = await response.json();
        guideData = resJson.guide;
      }
    } catch (mlErr) {
      console.warn("ML microservice offline, fallback to standalone guide generator:", mlErr);
    }

    // Fallback standalone guide if ML service is offline
    if (!guideData) {
      guideData = {
        mode: "standalone",
        market_trip_date,
        budget: [
          { name: "Ethnic Festive", value: 35, color: "#C84B31" },
          { name: "Casual Daily", value: 25, color: "#D4A853" },
          { name: "Party & Evening", value: 20, color: "#4ade80" },
          { name: "Accessories", value: 20, color: "#818cf8" }
        ],
        buyItems: [
          { name: "Ikat Silk Anarkali Co-Ord", category: "Ethnic", units: 14, sellThrough: 88, confidence: "High" },
          { name: "Organza Floral Flutter Set", category: "Ethnic", units: 10, sellThrough: 78, confidence: "High" }
        ],
        avoidItems: [
          { name: "Neon Printed Tops", reason: "Trend velocity declining", type: "declining" },
          { name: "Heavy Georgette Suits", reason: "High monsoon moisture / heat", type: "weather" }
        ]
      };
    }

    try {
      await supabase.from('buyer_guides').insert({
        store_id,
        market_trip_date,
        recommendations: guideData,
        acted_on: false
      });
    } catch (dbError) {
      console.warn("Supabase record insert skipped or failed:", dbError);
    }

    return NextResponse.json({ success: true, guide: guideData });

  } catch (error: any) {
    console.error("Buyer guide route error:", error);
    return NextResponse.json({ error: "Failed to generate buyer guide" }, { status: 500 });
  }
}
