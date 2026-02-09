import { readFile, writeFile } from "fs/promises";
import path from "path";
import {
  menuCategories as staticCategories,
  mainMenuGroups as staticGroups,
} from "@/data/menu";
import type { MenuData } from "./menu-types";
import { kv, KV_KEYS } from "./kv";

export type { MenuData } from "./menu-types";
export { getCategoriesByIds, getCategoryById } from "./menu-types";

const menuJsonPath = () => path.join(process.cwd(), "data", "menu.json");

/** Dinamik menü: önce KV (Redis), sonra menu.json, yoksa kod içi varsayılan (sadece server) */
export async function getMenuData(): Promise<MenuData> {
  // 1. Önce KV'den dene (Vercel'de kalıcı)
  if (kv) {
    try {
      const data = await kv.get<MenuData>(KV_KEYS.MENU);
      if (data && Array.isArray(data.menuCategories) && Array.isArray(data.mainMenuGroups)) {
        return data;
      }
    } catch (err) {
      console.warn("KV read failed, falling back to file:", err);
    }
  }

  // 2. KV yoksa JSON dosyasından oku
  try {
    const content = await readFile(menuJsonPath(), "utf-8");
    const parsed = JSON.parse(content) as MenuData;
    if (parsed && Array.isArray(parsed.menuCategories) && Array.isArray(parsed.mainMenuGroups)) {
      return parsed;
    }
    throw new Error("Invalid menu data structure");
  } catch {
    // JSON dosyası yoksa varsayılan veriyi döndür
    return {
      menuCategories: staticCategories,
      mainMenuGroups: staticGroups,
    };
  }
}

/** Menüyü KV (Redis) ve/veya JSON dosyasına yazar */
export async function saveMenuData(data: MenuData): Promise<{ saved: boolean; readOnly?: boolean }> {
  let kvSaved = false;
  let fileSaved = false;

  // 1. Önce KV'ye yaz (Vercel'de kalıcı)
  if (kv) {
    try {
      await kv.set(KV_KEYS.MENU, data);
      kvSaved = true;
      console.log("[saveMenuData] Successfully saved to Redis");
    } catch (err) {
      console.error("[saveMenuData] KV save failed:", err);
    }
  } else {
    console.warn("[saveMenuData] Redis not available, skipping KV save");
  }

  // 2. JSON dosyasına da yazmayı dene (local dev için)
  try {
    await writeFile(menuJsonPath(), JSON.stringify(data, null, 2), "utf-8");
    fileSaved = true;
  } catch (err) {
    const anyErr = err as NodeJS.ErrnoException;
    if (anyErr?.code === "EROFS" || anyErr?.message?.includes("read-only file system")) {
      console.warn("File save skipped (read-only filesystem)");
    } else {
      console.error("File save error:", err);
    }
  }

  // KV başarılıysa başarılı say, yoksa read-only uyar
  if (kvSaved) {
    return { saved: true };
  } else if (fileSaved) {
    return { saved: true };
  } else {
    return { saved: false, readOnly: true };
  }
}
