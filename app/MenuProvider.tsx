"use client";

import { createContext, useContext, useMemo } from "react";
import type { MenuData } from "@/lib/menu-types";

const MenuContext = createContext<MenuData | null>(null);

export function MenuProvider({
  initialData,
  children,
}: {
  initialData: MenuData;
  children: React.ReactNode;
}) {
  const value = useMemo(() => initialData, [initialData]);
  return (
    <MenuContext.Provider value={value}>{children}</MenuContext.Provider>
  );
}

export function useMenuData(): MenuData {
  const data = useContext(MenuContext);
  if (!data) throw new Error("useMenuData must be used within MenuProvider");
  return data;
}
