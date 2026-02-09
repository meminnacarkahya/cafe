/** Client ve server tarafında ortak kullanılan menü tipi ve yardımcılar (fs yok). */

export interface MenuData {
  menuCategories: Array<{
    id: string;
    name: string;
    image?: string;
    items: Array<{ name: string; price: string; description?: string; image?: string }>;
    note?: string;
  }>;
  mainMenuGroups: Array<{
    id: string;
    name: string;
    categoryIds: string[];
  }>;
}

export function getCategoriesByIds(
  ids: string[],
  menuCategories: MenuData["menuCategories"]
): MenuData["menuCategories"] {
  return ids
    .map((id) => menuCategories.find((c) => c.id === id))
    .filter((c): c is MenuData["menuCategories"][number] => Boolean(c));
}

export function getCategoryById(
  id: string,
  menuCategories: MenuData["menuCategories"]
): MenuData["menuCategories"][number] | undefined {
  return menuCategories.find((c) => c.id === id);
}
