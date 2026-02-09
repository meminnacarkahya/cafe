import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    
    const url = new URL(`${API_URL}/api/images`);
    if (type) url.searchParams.set("type", type);

    const response = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Backend'den görseller alınamadı");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Görseller yüklenemedi" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const token = request.headers.get("authorization");

    if (contentType.includes("multipart/form-data")) {
      // File upload - proxy multipart to backend
      const formData = await request.formData();
      
      const response = await fetch(`${API_URL}/api/images`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: token } : {}),
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Görsel yüklenemedi");
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    // URL-based image - proxy JSON to backend
    const body = await request.json();
    
    const response = await fetch(`${API_URL}/api/images/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Görsel eklenemedi");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Görsel eklenemedi" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const token = request.headers.get("authorization");

    if (!id) {
      return NextResponse.json({ error: "id gerekli" }, { status: 400 });
    }

    const url = new URL(`${API_URL}/api/images`);
    url.searchParams.set("id", id);

    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: token } : {}),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Görsel silinemedi");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Görsel silinemedi" }, { status: 500 });
  }
}
