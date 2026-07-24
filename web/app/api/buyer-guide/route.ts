import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getFastApiUrl } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    // In demo mode or if skipping strict auth for now, we simulate success
    const body = await request.json();
    const store_id = body.store_id || "demo-store-id";
    const market_trip_date = body.market_trip_date;

    if (!market_trip_date) {
      return NextResponse.json({ error: "Market trip date is required" }, { status: 400 });
    }

    const fastApiUrl = getFastApiUrl();

    // Call FastAPI microservice
    const response = await fetch(`${fastApiUrl}/guide/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ store_id, market_trip_date }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `FastAPI error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    
    const { error: dbError } = await supabase.from('buyer_guides').insert({
      store_id: store_id,
      market_trip_date: market_trip_date,
      recommendations: data.guide,
      acted_on: false
    });

    if (dbError) {
      console.error("Error saving guide to DB:", dbError);
    }

    return NextResponse.json({ success: true, guide: data.guide });

  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
