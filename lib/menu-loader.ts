import {
  menuCategories as staticCategories,
  mainMenuGroups as staticGroups,
} from "@/data/menu";
import type { MenuData } from "./menu-types";

export type { MenuData } from "./menu-types";
export { getCategoriesByIds, getCategoryById } from "./menu-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/** Dinamik menü: Backend'den çek, hata varsa statik veri döndür */
export async function getMenuData(): Promise<MenuData> {
  try {
    const response = await fetch(`${API_URL}/api/menu`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Backend'den menü alınamadı");
    }

    const data = await response.json();
    
    if (data && Array.isArray(data.menuCategories) && Array.isArray(data.mainMenuGroups)) {
      return data;
    }
    
    throw new Error("Invalid menu data structure");
  } catch (error) {
    console.warn("Backend'den menü yüklenemedi, statik veri kullanılıyor:", error);
    
    // Backend yoksa statik veriyi döndür
    return {
      menuCategories: staticCategories,
      mainMenuGroups: staticGroups,
    };
  }
}

/** Menüyü backend'e kaydet */
export async function saveMenuData(data: MenuData): Promise<{ saved: boolean; readOnly?: boolean }> {
  try {
    const response = await fetch(`${API_URL}/api/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Backend'e kayıt başarısız");
    }

    return { saved: true };
  } catch (error) {
    console.error("saveMenuData error:", error);
    return { saved: false, readOnly: true };
  }
}
