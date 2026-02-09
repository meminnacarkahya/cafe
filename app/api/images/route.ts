import { NextResponse } from "next/server";
import { getImagesFromDb, addImageToDb, deleteImageFromDb } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") ?? undefined;
    const list = await getImagesFromDb(type);
    return NextResponse.json(list);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Görseller yüklenemedi" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const file = form.get("file") as File | null;
      const alt = form.get("alt")?.toString();
      const type = form.get("type")?.toString() || "general";
      if (!file) return NextResponse.json({ error: "file gerekli" }, { status: 400 });

      const arr = await file.arrayBuffer();
      const buf = Buffer.from(arr);
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      try {
        await mkdir(uploadsDir, { recursive: true });
      } catch {}
      // try to preserve extension
  const originalName = ((file as unknown) as { name?: string }).name || "upload";
      const ext = path.extname(originalName);
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
      const savePath = path.join(uploadsDir, filename);
      await writeFile(savePath, buf);
      const url = `/uploads/${filename}`;
      const id = await addImageToDb(url, alt, type);
      return NextResponse.json({ id, url });
    }

    const body = (await request.json()) as { url: string; alt?: string; type?: string };
    if (!body.url || typeof body.url !== "string") {
      return NextResponse.json({ error: "url gerekli" }, { status: 400 });
    }
    const id = await addImageToDb(body.url, body.alt, body.type || "general");
    return NextResponse.json({ id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Görsel eklenemedi" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 });
    await deleteImageFromDb(Number(id));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Görsel silinemedi" }, { status: 500 });
  }
}
