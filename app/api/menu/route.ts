import { NextResponse } from "next/server";
import { getMenuData, saveMenuData, type MenuData } from "@/lib/menu-loader";

// sql.js ve dosya sistemi kullandığımız için bu route'u
// edge yerine Node.js runtime'ında çalışmaya zorlayalım.
export const runtime = "nodejs";

export async function GET() {
  try {
    const data = await getMenuData();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Menü yüklenemedi" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MenuData;
    if (
      !Array.isArray(body.menuCategories) ||
      !Array.isArray(body.mainMenuGroups)
    ) {
      return NextResponse.json(
        { error: "Geçersiz veri: menuCategories ve mainMenuGroups gerekli" },
        { status: 400 }
      );
    }
    await saveMenuData(body);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `Menü kaydedilemedi: ${msg}` },
      { status: 500 }
    );
  }
}
