import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/settings`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Backend'den ayarlar alınamadı");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ayarlar alınamadı" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");

    const response = await fetch(`${API_URL}/api/settings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      return NextResponse.json(
        { error: error.error || "Ayarlar kaydedilemedi" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error("Settings POST error:", e);
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Ayar kaydedilemedi: ${msg}` }, { status: 500 });
  }
}
