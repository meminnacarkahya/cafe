import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { MenuData } from "./menu-types";

const DB_DIR = path.join(process.cwd(), "data");
const IMAGES_PATH = path.join(DB_DIR, "images.json");
const SETTINGS_PATH = path.join(DB_DIR, "settings.json");

export async function getMenuDataFromDb(): Promise<MenuData | null> {
  // SQLite katmanında yaşanan sql.js / exports hatalarını
  // tamamen devre dışı bırakıyoruz. Menü verisini zaten
  // `menu-loader.ts` içindeki JSON / statik veriden okuyoruz.
  return null;
}

export async function saveMenuDataToDb(data: MenuData): Promise<void> {
  // Menü kaydını şu an için yalnızca `data/menu.json`
  // üzerinden yapıyoruz; burada ekstra bir işlem yok.
  // Bu fonksiyon artık no-op ama Promise<void> döndürmesi gerekiyor.
  await Promise.resolve();
  void data; // unused parameter
}

export interface ImageRow {
  id: number;
  url: string;
  alt: string | null;
  type: string;
  created_at: string;
}

interface ImagesFile {
  lastId: number;
  items: ImageRow[];
}

async function ensureDir() {
  try {
    await mkdir(DB_DIR, { recursive: true });
  } catch {
    // ignore
  }
}

async function readImagesFile(): Promise<ImagesFile> {
  await ensureDir();
  try {
    const txt = await readFile(IMAGES_PATH, "utf-8");
    const parsed = JSON.parse(txt) as ImagesFile;
    if (!parsed || !Array.isArray(parsed.items)) {
      throw new Error("invalid images file");
    }
    return {
      lastId: parsed.lastId ?? 0,
      items: parsed.items.map((it) => ({
        ...it,
        id: Number(it.id),
        url: String(it.url),
        alt: it.alt ?? null,
        type: it.type ?? "general",
        created_at: it.created_at ?? new Date().toISOString(),
      })),
    };
  } catch {
    return { lastId: 0, items: [] };
  }
}

async function writeImagesFile(data: ImagesFile): Promise<void> {
  await ensureDir();
  await writeFile(IMAGES_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function getImagesFromDb(type?: string): Promise<ImageRow[]> {
  const data = await readImagesFile();
  const list = type ? data.items.filter((it) => it.type === type) : data.items;
  // en yeni üste gelecek şekilde sırala
  return [...list].sort((a, b) => b.id - a.id);
}

export async function addImageToDb(url: string, alt?: string, type = "general"): Promise<number> {
  const data = await readImagesFile();
  const id = (data.lastId ?? 0) + 1;
  const row: ImageRow = {
    id,
    url,
    alt: alt ?? null,
    type,
    created_at: new Date().toISOString(),
  };
  data.lastId = id;
  data.items.push(row);
  await writeImagesFile(data);
  return id;
}

export async function deleteImageFromDb(id: number): Promise<void> {
  const data = await readImagesFile();
  data.items = data.items.filter((it) => it.id !== id);
  await writeImagesFile(data);
}

export async function initDbIfNeeded(): Promise<void> {
  // Artık SQLite kullanmadığımız için tek yaptığımız
  // data klasörünün varlığını garanti etmek.
  await ensureDir();
}

export async function getSettingsFromDb(): Promise<Record<string, string>> {
  await ensureDir();
  try {
    const txt = await readFile(SETTINGS_PATH, "utf-8");
    const parsed = JSON.parse(txt) as Record<string, string>;
    return parsed || {};
  } catch {
    return {};
  }
}

export async function setSettingsToDb(settings: Record<string, string>): Promise<void> {
  await ensureDir();
  // mevcut ayarları okuyup yeni gelenlerle birleştirelim
  const current = await getSettingsFromDb();
  const merged: Record<string, string> = { ...current };
  for (const k of Object.keys(settings)) {
    merged[k] = String(settings[k]);
  }
  await writeFile(SETTINGS_PATH, JSON.stringify(merged, null, 2), "utf-8");
}
