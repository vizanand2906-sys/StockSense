import { NextResponse } from "next/server";
import { getFastApiUrl } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fastApiUrl = getFastApiUrl();

    // Forward the file directly to FastAPI via a new FormData
    const apiFormData = new FormData();
    apiFormData.append("file", file);

    const response = await fetch(`${fastApiUrl}/ingest/csv`, {
      method: "POST",
      body: apiFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `FastAPI error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("CSV Upload proxy error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
