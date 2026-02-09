import { readFile, writeFile } from "fs/promises";
import path from "path";
import {
  menuCategories as staticCategories,
  mainMenuGroups as staticGroups,
} from "@/data/menu";
import type { MenuData } from "./menu-types";

export type { MenuData } from "./menu-types";
export { getCategoriesByIds, getCategoryById } from "./menu-types";

const menuJsonPath = () => path.join(process.cwd(), "data", "menu.json");

/** Dinamik menü: önce menu.json, yoksa kod içi varsayılan (sadece server) */
export async function getMenuData(): Promise<MenuData> {
  try {
    const content = await readFile(menuJsonPath(), "utf-8");
    const parsed = JSON.parse(content) as MenuData;
    // Veri yapısını doğrula
    if (parsed && Array.isArray(parsed.menuCategories) && Array.isArray(parsed.mainMenuGroups)) {
      return parsed;
    }
    throw new Error("Invalid menu data structure");
  } catch {
    // JSON dosyası yoksa veya hatalıysa varsayılan veriyi döndür
    return {
      menuCategories: staticCategories,
      mainMenuGroups: staticGroups,
    };
  }
}

/** Menüyü JSON dosyasına yazar (sadece server) */
export async function saveMenuData(data: MenuData): Promise<void> {
  try {
    await writeFile(menuJsonPath(), JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    // Hata durumunda detaylı log ekleyelim
    console.error("saveMenuData error:", err);
    throw err;
  }
}
